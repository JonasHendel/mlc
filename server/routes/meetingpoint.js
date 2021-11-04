const express = require('express');
const geoDesicMedian = require('../utils/geoDesicMedian');
const closestStartPoint = require('../utils/closestStartPoint');
const closestAirport = require('../utils/airport/closestAirport');
const tripData = require('../utils/trip');

const router = express.Router();

router.post('/', (req, res) => {
	const startPoints = req.body;
  //console.log(startPoints)

  if(startPoints.length === 0) {
    return res.status(400).json({error: 'No start points provided'});
  }

	//console.log(startPoints);

	let coordinateArray = [];

	startPoints.map((point) => {
		coordinateArray.push(point.airport.coordinates);
	});

	const meetingpointMedian = geoDesicMedian.geoDesicMedian(coordinateArray, 0.0001);

	const tempAirportMedian = closestAirport(meetingpointMedian.coordinates[0], meetingpointMedian.coordinates[1]);


	const medianAirport = {
		name: tempAirportMedian.name,
    iata_code: tempAirportMedian.iata_code,
		city: tempAirportMedian.municipality,
		coordinates: [tempAirportMedian.latitude_deg, tempAirportMedian.longitude_deg],
		// latitude: tempAirportMedian.latitude_deg,
		// longitude: tempAirportMedian.longitude_deg,
	};


	const startPointAirport = closestStartPoint(medianAirport, startPoints);

	const tripsToMedianAP = tripData(startPoints, medianAirport);

	const co2ArrMedian = tripsToMedianAP.co2Arr;
	const distanceArrayMedian = tripsToMedianAP.distanceArray;

  medianAirport.totalCO2 = tripsToMedianAP.totalCO2;
  medianAirport.totalDistance = tripsToMedianAP.totalDist;
  medianAirport.distanceArray = distanceArrayMedian

  if(Math.max(...distanceArrayMedian) > 4000){
    const weights = [1,4,1,1,1]
    console.log(coordinateArray)
    const array = [
  [ '60.121', '11.0502' ],
  [ '40.639801', '118.2437' ],
  [ '52.351389', '13.493889' ],
  [ '45.7699', '11.76' ],
  [ '57.7666', '14.08' ],
]
    const wGM = geoDesicMedian.weightedGeoMedian(array, weights, 0.0001)
    console.log(wGM)
  }

  //console.log(medianAirport)


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

	res.json({ meetingPoints: { medianAirport, startPointAirport }, startPoints });
});

module.exports = router;
