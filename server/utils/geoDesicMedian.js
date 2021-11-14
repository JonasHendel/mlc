const mathjs = require("mathjs");
const haversineFormula = require("./haversineFormula.js");
const { mean, distance } = mathjs;

const p1 = [59.9139, 10.7522];
const p2 = [52.52, 13.405];
const p3 = [51.5074, 0.1278];
const p4 = [48.8566, 2.3522];

const X = [p1[0], p2[0], p3[0], p4[0]];
const X2 = [p1[1], p2[1], p3[1], p4[1]];

const x = [p1, p2, p3, p4];

const geoDist = (x, geoMean) => {
  //console.log('x',x)
  // console.log('m',geoMean)
  let distanceToGeoMean = [];
  for (let i = 0; i < x.length; i++) {
    distanceToGeoMean.push(
      haversineFormula(x[i][0], x[i][1], geoMean[0], geoMean[1]) / 1000
    );
  }
  return distanceToGeoMean;
};

function weightedMean(arrValues, arrWeights) {
  var result = arrValues
    .map(function (value, i) {
      var weight = arrWeights[i];
      var sum = value * weight;

      return [sum, weight];
    })
    .reduce(
      function (p, c) {
        return [p[0] + c[0], p[1] + c[1]];
      },
      [0, 0]
    );

  return result[0] / result[1];
}

// find geometric mean
// find distance from all X points to geometric mean
// find weight of each point/distance => weight is inverse of distance (1/distance)
// multiply weight with X (W * x and W * y) point => new point
// Sum of all x and y values of the new points => Array with [x+x1...+xn, y+y1...+yn]
// Divide array of sums by sum of weights => [x/w, y/w]
// new geoMean
// if distance from new geoMean to old geoMean is below eps => return geoMean
// else repeat

const geoDesicMedian = (x, eps) => {
  let geoMean = mean(x, 0);
  while (true) {
    for (let i = 0; i < x.length; i++) {
      var dist = Math.sqrt(
        Math.pow(x[i][0] - geoMean[0], 2) + Math.pow(x[i][1] - geoMean[1], 2)
      );
      if (dist === 0) {
        geoMean = geoMean.map((float) => (float * 1000 + 10) / 1000);
      }
    }

    const distanceArray = geoDist(x, geoMean);
    const W = distanceArray.map((dist) => 1 / dist);
    // console.log(W);

    let sum1 = 0;
    let sum2 = 0;
    let tempArr = [];
    let finalArr = [];
    for (let i = 0; i < W.length; i++) {
      tempArr.push([W[i] * x[i][0], W[i] * x[i][1]]);
    }
    for (let i = 0; i < tempArr.length; i++) {
      sum1 += tempArr[i][0];
      sum2 += tempArr[i][1];
    }
    finalArr.push(sum1, sum2);
    let wSum = W.reduce((a, b) => a + b, 0);
    const geoMean2 = finalArr.map((float) => float / wSum);

    if (distance(geoMean, geoMean2) < eps) {
      const totalDist = distanceArray.reduce((a, b) => a + b, 0);
      return {
        coordinates: geoMean2,
        totalDistance: Math.round(totalDist),
        distanceArray: distanceArray,
      };
    }
    geoMean = geoMean2;
  }
};

const weightedGeoMedian = (x, WX, eps, medianAirport) => {
  //console.log('called wgm')
  let lat = [];
  let long = [];

  for (let i = 0; i < x.length; i++) {
    lat.push(x[i][0]);
    long.push(x[i][1]);
  }

  //let geoMean = [weightedMean(lat, WX), weightedMean(long, WX)];

  let geoMean = medianAirport.coordinates;

  //console.log({geoMean})

  let longhaulArr = [];
  let mediumhaulArr = [];

  const initialDistArr = medianAirport.distanceArray

  //console.log({initialDistArr})

  initialDistArr.map((dist, index) => {
    //console.log(dist);
    if (dist / 1.852 >= 1750) {
      longhaulArr.push(index);
    } else {
      mediumhaulArr.push(index);
    }
  });

  while (true) {
    for (let i = 0; i < x.length; i++) {
      var dist = Math.sqrt(
        Math.pow(x[i][0] - geoMean[0], 2) + Math.pow(x[i][1] - geoMean[1], 2)
      );
      if (dist === 0) {
        geoMean = geoMean.map((float) => (float * 1000 + 10) / 1000);
      }
    }

    //    0.0012702583687056333,
    //  0.0021788488911851835,
    // 0.0020763199141260323,
    //  0.0017577408228106805

    const distanceArray = geoDist(x, geoMean);

    const W = distanceArray.map((dist, i) => WX[i] / dist);
    //console.log(W);
    //console.log(distanceArray)

    let sum1 = 0;
    let sum2 = 0;
    let tempArr = [];
    let finalArr = [];
    for (let i = 0; i < W.length; i++) {
      tempArr.push([W[i] * x[i][0], W[i] * x[i][1]]);
    }
    for (let i = 0; i < tempArr.length; i++) {
      sum1 += tempArr[i][0];
      sum2 += tempArr[i][1];
    }
    finalArr.push(sum1, sum2);
    let wSum = W.reduce((a, b) => a + b, 0);
    const geoMean2 = finalArr.map((float) => float / wSum);

    let abort = false
    //console.log(distanceArray[1])

    longhaulArr.map((indexOfLonghaulFlights) => {
      if (distanceArray[indexOfLonghaulFlights]/1.852 < 2000) {
        //console.log('toLong', distanceArray)
        abort = true
      }
    });

    mediumhaulArr.map((indexOfMediumHaulFlights)=>{
      if(distanceArray[indexOfMediumHaulFlights]/1.852 > 1700){
        abort = true
      }
    })

    if(abort){
      const totalDist = distanceArray.reduce((a, b) => a + b, 0);
      return {
        coordinates: geoMean2,
        distance: Math.round(totalDist),
        distanceArray: distanceArray,
      };

    }

    if (distance(geoMean, geoMean2) < eps) {
      const totalDist = distanceArray.reduce((a, b) => a + b, 0);
      return {
        coordinates: geoMean2,
        totalDistance: Math.round(totalDist),
        distanceArray: distanceArray,
      };
    }
    geoMean = geoMean2;
  }
};

//weightedGeoMedian(x, [1, 1, 1, 1], 0.0001);

//geoDesicMedian(x)

module.exports = {
  geoDesicMedian,
  weightedGeoMedian,
  geoDist,
};
