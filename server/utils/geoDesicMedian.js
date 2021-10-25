const mathjs = require('mathjs');
const haversineFormula = require('./haversineFormula.js')
const {mean, distance} = mathjs;


const geoDist = (x, geoMean) => {
  // console.log('x',x)
  // console.log('m',geoMean)
	let distanceToGeoMean = [];
	for (let i = 0; i < x.length; i++) {
		distanceToGeoMean.push(haversineFormula(x[i][0], x[i][1], geoMean[0], geoMean[1]) / 1000);
	}
	return distanceToGeoMean;
};


// find geometric mean
// find distance from all X points to geometric mean
// find weight of each point/distance => weight is inverse of distance (1/distance)
// multiply weight with X (W * x and W * y) point => new point 
// Sum of all x and y values of the new points => Array with [x+x1...+xn, y+y1...+yn]
// Divide array of sums by sum of weights => [x/w, y/w]
// new geoMean
// if distance from new geoMean to old geoMean is below eps => return geoMean 
// else repeat
const geoDesicMedian = (x, eps = 1e-6) => {
  let geoMean = mean(x, 0);
	while (true) {
    for (let i = 0; i < x.length; i++) {
      var dist = Math.sqrt(Math.pow(x[i][0] - geoMean[0], 2) + Math.pow(x[i][1] - geoMean[1], 2));
			if (dist === 0) {
        geoMean = geoMean.map((float) => (float * 1000 + 10) / 1000);
			}
		}

		const distanceArray = geoDist(x, geoMean);
		const W = distanceArray.map((dist) => 1 / dist);

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
			return {coordinates: geoMean2, distance: Math.round(totalDist), distanceArray: distanceArray};
		}
		geoMean = geoMean2;
	}
};

module.exports = {
  geoDesicMedian,
  geoDist
}

