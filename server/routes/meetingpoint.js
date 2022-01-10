const express = require("express");
const geoDesicMedian = require("../utils/geoDesicMedian");
const closestStartPoint = require("../utils/closestStartPoint");
const closestAirports = require("../utils/airport/closestAirport");
const getTripData = require("../utils/trip");
const getWeights = require("../utils/getWeights");

const router = express.Router();

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

  let medianPoint = geoDesicMedian.geoDesicMedian(coordinateArray, 0.001); //the smaller the second argument, the more accurate the medianPoint is

  const tripToMedianPoint = getTripData(startPoints, medianPoint);

  const longestDistance = Math.max(...medianPoint.distanceArray) / 1.852; // divide by 1.852 to convert to Nautical Miles

  // run if there is a longhaul flight
  if (longestDistance > maxMediumHaulDistance) {
    //if(false){
    const weights = getWeights(medianPoint, tripToMedianPoint);

    medianPoint = geoDesicMedian.weightedGeoMedian(
      coordinateArray,
      weights,
      0.0001,
      medianPoint
    );
  }

  let closestAirportsArray = closestAirports(
    medianPoint.coordinates[0],
    medianPoint.coordinates[1]
  );

  const median = {
    ap: {
      name: "Median",
      iata_code: "MED",
      municipality: "Unknown",
      latitude_deg: medianPoint.coordinates[0],
      longitude_deg: medianPoint.coordinates[1],
    },
  };

  closestAirportsArray.unshift(median)

  let airports = []

  closestAirportsArray.map((item) => {
    const airport = {
      name: item.ap.name,
      iata_code: item.ap.iata_code,
      city: item.ap.municipality,
      coordinates: [
        Number(item.ap.latitude_deg),
        Number(item.ap.longitude_deg),
      ],
    };
    const tripToAirport = getTripData(startPoints, airport);

    airports.push({
      airport,
      tripToAirport,
    });
  });

  console.log(airports)

  console.log(airports[0]);

  let nwse = [
    [
      airports[0].airport.coordinates[0] + 2,
      airports[0].airport.coordinates[1],
    ],
    [
      airports[0].airport.coordinates[0] - 2,
      airports[0].airport.coordinates[1],
    ],
    [
      airports[0].airport.coordinates[0],
      airports[0].airport.coordinates[1] + 2,
    ],
    [
      airports[0].airport.coordinates[0],
      airports[0].airport.coordinates[1] - 2,
    ],
    //[medianPoint.coordinates[0]+2, medianPoint.coordinates[1]],
    //[medianPoint.coordinates[0]-2, medianPoint.coordinates[1]],
    //[medianPoint.coordinates[0], medianPoint.coordinates[1]+2],
    //[medianPoint.coordinates[0], medianPoint.coordinates[1]-2],
  ];
  console.log(nwse);

  let airportsNwse = [];
  nwse.map((item, i) => {
    const airport = {
      name: `nswe${i}`,
      iata_code: `nswe${i}`,
      city: "nwse",
      coordinates: [Number(item[0]), Number(item[1])],
    };
    const tripToAirport = getTripData(startPoints, airport);

    airportsNwse.push({
      airport,
      tripToAirport,
    });
  });

  const addMedian = () => {
    const airport = {
      name: airports[0].airport.name,
      iata_code: airports[0].airport.iata_code,
      city: airports[0].airport.municipality,
      coordinates: airports[0].airport.coordinates,
    };
    const tripToAirport = getTripData(startPoints, airport);

    airportsNwse.unshift({
      airport,
      tripToAirport,
    });
  };

  addMedian();

  //airports.sort((a,b)=>a.tripToAirport.totalCO2 - b.tripToAirport.totalCO2)

  // airports for closest airports and airportsNwse for +1/-1 lat/lng
  res.send({
    meetingPoint: airports[0],
    airports: airports,
  });
});

module.exports = router;
