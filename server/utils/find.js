const mediumhaulEmissions = require("../public/average_emissions/mediumhaul_emissions.json");
const haversineFormula = require("./haversineFormula.js");
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
    //

    if (tripDistInNauticalMiles >= 2000) {
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

const geoDist = (x, geoMean) => {
  console.log("x", x);
  // console.log('m',geoMean)
  let distanceToGeoMean = [];
  for (let i = 0; i < x.length; i++) {
    distanceToGeoMean.push(
      haversineFormula(x[i][0], x[i][1], geoMean[0], geoMean[1]) / 1000
    );
  }
  return distanceToGeoMean;
};

const find = () => {
  const x = [
    ["60.121", "11.0502"],
    ["40.64094", "-73.77948"],
    ["52.380001", "13.5225"],
  ];

  let geoMean = [48.827, -27.981];


  let median = {}


  let min = 0
  while(true){

  const W = 1;

  const north = [geoMean[0] + W, geoMean[1]];
  const south = [geoMean[0] - W, geoMean[1]];
  const west = [geoMean[0], geoMean[1] + W];
  const east = [geoMean[0], geoMean[1] - W];

  const array = [north, south, west, east];

  let arr2 = [];

  array.map((item) => {
    const distanceArray = geoDist(x, item);

    const totalCO2 = getCO2Array(distanceArray).reduce((a, b) => a + b, 0);


    arr2.push(totalCO2);
  });

  const minVal = Math.min(...arr2)


  const index = arr2.indexOf(minVal)
  
  console.log({arr2})
  console.log({minVal})
  console.log({index})
  console.log({geoMean})

  if(min === 0){
    min = minVal
  }

  if(min < minVal){
    return geoMean
  }else{
    min = minVal
  }

  geoMean = array[index]
  }
};

find();


module.exports = find
