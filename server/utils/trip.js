const emissions = require('../public/emissions.json')

// distances emission data is available for
const distArr = [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];

// find the closest integer from distArr to the distance -> to be able to calculate the emsisions more accurately
export const closestNumber = (array, input) => {
  const value = array.reduce((prev, curr) => {
    return Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev;
	});
  
	return value;
};

// get the co2 emissions for each trip i.e. berlin to meetingpoint, london to meetingpoint, etc.
export const getCO2Array = (array) => {
  const co2Array = [];
	array.map((trip) => {
    // convert distance to Nautical Miles
		const tripDistInNauticalMiles = trip * 0.539957;
    
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
  // let coordinateArray = [];

    // for (let i = 0; i < startPoints.length; i++) {
    //   coordinateArray.push(startPoints[i].airport.coordinates);
    // }

    // // distance array to closest airport
    // const distanceArrayNew = geoDist(coordinateArray, startPoints[minDistIndex]?.coordinates);

    // const co2CCDArr1 = getCO2Array(distanceArray);
    // const co2CCDArr2 = getCO2Array(distanceArrayNew);

    // const co2Old = co2CCDArr1.reduce((a, b) => a + b, 0);
    // const co2New = co2CCDArr2.reduce((a, b) => a + b, 0);

    // const newPoint = {
    //   coordinates: startPoints[minDistIndex].coordinates,
    //   distance: Math.round(distanceArrayNew.reduce((a, b) => a + b, 0)),
    //   distanceArray: distanceArrayNew,
    //   co2CCDArray: co2CCDArr2,
    //   co2: co2New,
    // };
    // if (co2Old >= co2New) {
    //   dispatch(setClosestAirport(newPoint));
    // } else {
    //   dispatch(removeClosestAirport());
    // }
    // setTotalCO2(co2Old >= co2New ? co2New : co2Old);
}

module.exports = trip;