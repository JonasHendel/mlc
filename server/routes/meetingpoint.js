const express = require("express");
const geoDesicMedian = require("../utils/geoDesicMedian");
const closestStartPoint = require("../utils/closestStartPoint");
const closestAirports = require("../utils/airport/closestAirport");
const getTripData = require("../utils/trip");

const router = express.Router();

const getWeights = (medianPoint, tripToMedianPoint) => {
  let weights = [];

  medianPoint.distanceArray.map((distance, index) => {
    // average distance
    let tempDistanceArray = medianPoint.distanceArray;

    const filteredDistanceArray = tempDistanceArray.filter(
      (value) => value !== distance
    );

    const averageFilteredDistance =
      filteredDistanceArray.reduce((a, b) => a + b, 0) /
      filteredDistanceArray.length;

    // average emissions
    let tempCO2Array = tripToMedianPoint.co2Array;

    const filteredCO2Array = tempCO2Array.filter(
      (val) => val !== tempCO2Array[index]
    );

    const averageFilteredCO2 =
      filteredCO2Array.reduce((a, b) => a + b, 0) / filteredCO2Array.length;

    // co2 consumptions per km
    const averageCO2PerKm = averageFilteredCO2 / averageFilteredDistance;

    const co2PerKm = distance === 0 ? 0 : tempCO2Array[index] / distance;

    // calculate weights
    const weight = co2PerKm / averageCO2PerKm;
    weights.push(weight);
  });
  return weights;
};

router.post("/", (req, res) => {
  const maxMediumHaulDistance = 2000; // in Nautical Miles

  const startPoints = req.body;

  if (startPoints.length <= 1) {
    return res
      .status(500)
      .json({ error: "Please provide at least 2 starting points." });
  }

  let coordinateArray = [];

  startPoints.map((point) => {
    coordinateArray.push(point.airport.coordinates);
  });

  const medianPoint = geoDesicMedian.geoDesicMedian(coordinateArray, 0.001); //the smaller the second argument, the more accurate the medianPoint is

  const tripToMedianPoint = getTripData(startPoints, medianPoint);

  const longestDistance = Math.max(...medianPoint.distanceArray) / 1.852; // divide by 1.852 to convert to Nautical Miles

  let weightedGeoMedian = {}
  let closestAirportsWGM = [] 
  // run if there is a longhaul flight
  if (longestDistance > maxMediumHaulDistance) {
    const weights = getWeights(medianPoint, tripToMedianPoint);

    weightedGeoMedian = geoDesicMedian.weightedGeoMedian(
      coordinateArray,
      weights,
      0.0001,
      medianPoint
    );

    closestAirportsWGM = closestAirports(
      weightedGeoMedian.coordinates[0],
      weightedGeoMedian.coordinates[1]
    );
  }

  const median = {
    ap: {
      name: "Median",
      iata_code: "MED",
      municipality: "Unknown",
      latitude_deg: weightedGeoMedian.coordinates[0],
      longitude_deg: weightedGeoMedian.coordinates[1]
    }

  }


  closestAirportsWGM.push(median)

  let airports = []
  
  closestAirportsWGM.map((item)=>{
    const airport = {
      name: item.ap.name,
      iata_code: item.ap.iata_code,
      city: item.ap.municipality,
      coordinates: [
        Number(item.ap.latitude_deg),
        Number(item.ap.longitude_deg)
      ]
    }
    const tripToAirport = getTripData(startPoints, airport)

    airports.push({
      airport,
      tripToAirport
    })

  }) 



  airports.sort((a,b)=>a.tripToAirport.totalCO2 - b.tripToAirport.totalCO2)

  res.send({
    meetingPoint: airports[0],
    airports
  });
});

module.exports = router;
