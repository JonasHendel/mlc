const express = require("express");
const geoDesicMedian = require("../utils/geoDesicMedian");
const closestStartPoint = require("../utils/closestStartPoint");
const closestAirport = require("../utils/airport/closestAirport");
const tripData = require("../utils/trip");

const router = express.Router();

router.post("/", (req, res) => {
  const startPoints = req.body;
  //console.log(startPoints)

  if (startPoints.length === 0) {
    return res.status(400).json({ error: "No start points provided" });
  }

  //console.log(startPoints);

  let coordinateArray = [];

  startPoints.map((point) => {
    coordinateArray.push(point.airport.coordinates);
  });

  const meetingpointMedian = geoDesicMedian.geoDesicMedian(
    coordinateArray,
    0.0001
  );

  const tempAirportMedian = closestAirport(
    meetingpointMedian.coordinates[0],
    meetingpointMedian.coordinates[1]
  );

  let medianAirport = {
    name: tempAirportMedian[0].ap.name,
    iata_code: tempAirportMedian[0].ap.iata_code,
    city: tempAirportMedian[0].ap.municipality,
    coordinates: [
      Number(tempAirportMedian[0].ap.latitude_deg),
      Number(tempAirportMedian[0].ap.longitude_deg),
    ],
    // latitude: tempAirportMedian.latitude_deg,
    // longitude: tempAirportMedian.longitude_deg,
  };


  const startPointAirport = closestStartPoint(medianAirport, startPoints);

  let tripsToMedianAP = tripData(startPoints, medianAirport);

  let co2ArrMedian = tripsToMedianAP.co2Arr;
  let distanceArrayMedian = tripsToMedianAP.distanceArray;

  medianAirport.totalCO2 = tripsToMedianAP.totalCO2;
  medianAirport.totalDistance = tripsToMedianAP.totalDist;
  medianAirport.distanceArray = distanceArrayMedian;

  console.log({medianAirport});

  let wGMAirport = []
  if (Math.max(...distanceArrayMedian) / 1.852 > 2000) {
    let weights = [];

    distanceArrayMedian.map((dist, i) => {
      let distArr = distanceArrayMedian;

      const filteredDist = distArr.filter((val) => val !== dist);

      const averageFilteredDist =
        filteredDist.reduce((a, b) => a + b, 0) / filteredDist.length;

      let co2Arr = co2ArrMedian;

      const filteredCO2 = co2Arr.filter((val) => val !== co2Arr[i]);

      const averageFilteredCO2 =
        filteredCO2.reduce((a, b) => a + b, 0) / filteredCO2.length;

      const averageCO2perKm = averageFilteredCO2 / averageFilteredDist;

      let co2PerKM = 0;
      if (dist === 0) {
        co2PerKM = 0
      }else{
        co2PerKM = co2Arr[i] / dist;
      }

      console.log(co2PerKM);
      console.log(averageCO2perKm);

      const w = co2PerKM / averageCO2perKm;
      weights.push(Number(w));
    });

    const minVal = Math.min(...weights);

    console.log({ minVal });

    let toOne = 0
    if(minVal === 0){
      toOne = 1
    }else {
     toOne = 1 / Number(minVal);
    }
    console.log({ toOne });

    const scaledWeights = weights.map((weight) => weight * toOne);

    console.log({scaledWeights});

    console.log({weights})


    console.log(coordinateArray);
    const wGM = geoDesicMedian.weightedGeoMedian(
      coordinateArray,
      weights,
      0.0001,
      medianAirport
    );
  wGMAirport = closestAirport(
    wGM.coordinates[0],
    wGM.coordinates[1]
  );
  }
  let otherMeetingPoints = [] 
  wGMAirport.map((item) => {
    const medianAirport = {
      name: item.ap.name,
      iata_code: item.ap.iata_code,
      city: item.ap.municipality,
      coordinates: [
        Number(item.ap.latitude_deg),
        Number(item.ap.longitude_deg),
      ],
    };
    console.log(medianAirport)
    console.log('moins', tripData(startPoints, medianAirport))
    const trip = tripData(startPoints, medianAirport)

    medianAirport.totalDistance = trip.totalDist

    otherMeetingPoints.push({
        ap: medianAirport,
        trip
    })
  });

  otherMeetingPoints.sort((a,b)=>a.trip.totalCO2 - b.trip.totalCO2)

  console.log({otherMeetingPoints})

  medianAirport = {
    name: otherMeetingPoints[0].ap.name,
    iata_code: otherMeetingPoints[0].ap.iata_code,
    city: otherMeetingPoints[0].ap.municipality,
    coordinates: otherMeetingPoints[0].ap.coordinates,
    totalCO2: otherMeetingPoints[0].trip.totalCO2,
    totalDistance: otherMeetingPoints[0].trip.totalDist,
    distanceArray: otherMeetingPoints[0].trip.distanceArray 
    // latitude: tempAirportMedian.latitude_deg,
    // longitude: tempAirportMedian.longitude_deg,
  };
  tripsToMedianAP = tripData(startPoints, medianAirport);

  co2ArrMedian = tripsToMedianAP.co2Arr;
  distanceArrayMedian = tripsToMedianAP.distanceArray;

  medianAirport.totalCO2 = tripsToMedianAP.totalCO2;
  medianAirport.totalDistance = tripsToMedianAP.totalDist;
  medianAirport.distanceArray = distanceArrayMedian;

  //console.log({wGMAirport})
  //console.log({medianAirport})
      


  //console.log(co2ArrMedian)

  //console.log('ma',medianAirport)

  startPoints.map((point, index) => {
    //console.log(co2ArrMedian[index]);
    point.toMedianAirport = {
      name: medianAirport.name,
      iata_code: medianAirport.iata_code,
      co2: co2ArrMedian[index],
      distance: distanceArrayMedian[index],
    };
  });


  const tripsToStartPointAP = tripData(startPoints, startPointAirport);

  const co2ArrStartPoint = tripsToStartPointAP.co2Arr;
  const distanceArrayStartPoint = tripsToStartPointAP.distanceArray;

  startPointAirport.totalCO2 = tripsToStartPointAP.totalCO2;
  startPointAirport.totalDistance = tripsToStartPointAP.totalDist;

  startPoints.map((point, index) => {
    point.toStartPointAirport = {
      name: startPointAirport.name,
      iata_code: startPointAirport.iata_code,
      co2: co2ArrStartPoint[index],
      distance: distanceArrayStartPoint[index],
    };
  });
  console.log((otherMeetingPoints))

  res.json({
    meetingPoint: medianAirport,
    startPoints,
    otherMeetingPoints
  });
});

module.exports = router;
