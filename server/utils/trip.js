const { distance } = require('mathjs');
const emissions = require('../public/emissions.json');
const {geoDist} = require('../utils/geoDesicMedian');

// distances emission data is available for
const distArr = [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];

// find the closest integer from distArr to the distance -> to be able to calculate the emsisions more accurately
const closestNumber = (array, input) => {
	const value = array.reduce((prev, curr) => {
		return Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev;
	});

	return value;
};

// get the co2 emissions for each trip i.e. berlin to meetingpoint, london to meetingpoint, etc.
const getCO2Array = (array) => {
	const co2Array = [];
	array.map((trip) => {
		// convert distance to Nautical Miles
		const tripDistInNauticalMiles = trip / 1.852;

    //console.log('moinsdfa',tripDistInNauticalMiles);

		// find the closest integer from distArr to the distance -> to be able to calculate the emsisions more accurately
		const distVal = closestNumber(distArr, tripDistInNauticalMiles);

		const co2for1NM = emissions.CCD.SMR[distVal].CO2 / distVal;

		let co2ForCCD = co2for1NM * tripDistInNauticalMiles;

		if (tripDistInNauticalMiles > 1) co2ForCCD = co2ForCCD + 3153.59;

		co2Array.push(co2ForCCD);
	});
	return co2Array;
};

const trip = (startPoints, meetingPoint) => {
	let coordinateArray = [];

	for (let i = 0; i < startPoints.length; i++) {
		coordinateArray.push(startPoints[i].airport.coordinates);
	}

	// distance array to closest airport
	const distanceArray = geoDist(coordinateArray, meetingPoint.coordinates);

	const co2Arr = getCO2Array(distanceArray);

  //console.log(co2Arr);

	const totalCO2 = co2Arr.reduce((a, b) => a + b, 0);

	const totalDist = distanceArray.reduce((a, b) => a + b, 0);

  // console.log(startPoints)
  // startPoints.map((startPoint, i) => {
  //   startPoint.co2 = co2Arr[i];
  //   startPoint.distance = distanceArray[i];
  // })
  // console.log(startPoints)

  return {totalCO2, totalDist, co2Arr, distanceArray }
};

module.exports = trip;
