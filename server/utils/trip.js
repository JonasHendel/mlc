const { distance } = require("mathjs");
const emissions = require("../public/emissions.json");
const { geoDist } = require("../utils/geoDesicMedian");

const mediumhaulEmissions = require("../public/average_emissions/mediumhaul_emissions.json");
const longhaulEmissions = require("../public/average_emissions/longhaul_emissions.json");

// distances emission data is available for
const distArr = [
  125, 200, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 4500, 5000, 5500,
  6000, 6500, 7000, 7500,
];

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

    let co2for1NM = 0;

    //console.log(tripDistInNauticalMiles)
  
    //console.log({distVal})
    //33.11390129461291 }
//{ co2PerKM: 54.8519728689013 }
//{ co2PerKM: 33.818627657871325

    if (distVal >= 1750) {
      co2for1NM = longhaulEmissions.CCD[distVal].CO2 / distVal;
    } else {
      co2for1NM = mediumhaulEmissions.CCD[distVal].CO2 / distVal;
    }

    //console.log({co2for1NM})

    let co2ForTrip = co2for1NM * tripDistInNauticalMiles;

    if (tripDistInNauticalMiles > 1) co2ForTrip = co2ForTrip + 3153.59;

    co2Array.push(co2ForTrip);
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


  const co2Array = getCO2Array(distanceArray);

  //console.log(co2Arr);

  const totalCO2 = co2Array.reduce((a, b) => a + b, 0);

  const totalDistance = distanceArray.reduce((a, b) => a + b, 0);

  // console.log(startPoints)
  // startPoints.map((startPoint, i) => {
  //   startPoint.co2 = co2Arr[i];
  //   startPoint.distance = distanceArray[i];
  // })
  // console.log(startPoints)

  return { totalCO2, totalDistance, co2Array, distanceArray };
};

module.exports = trip;

