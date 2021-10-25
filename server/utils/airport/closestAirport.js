const airports = require('../../public/largeairports.json');


const toRadians = (degrees) => {
	var pi = Math.PI;
	return degrees * (pi / 180);
};

// haversine formula
const distanceToAP = (lat1, lng1, lat, lng) => {
	var radiusEarth = 6371e3; // metres

	var φ1 = toRadians(lat1);

	var φ2 = toRadians(lat);

	var Δφ = toRadians(lat - lat1);

	var Δλ = toRadians(lng - lng1);

	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	var d = radiusEarth * c;

	return d;
};

console.log(distanceToAP(60.121, 11.0502, 54.072, 9.831))

module.exports  = (lat1,lng1) => {
	var d = null;
	var ap = {};
	for (let i = 0; i < airports.airports.length; i++) {
		let newD = distanceToAP(lat1, lng1, airports.airports[i].latitude_deg, airports.airports[i].longitude_deg);

		if (d === null) var d = newD;

		if (newD < d) {
			var d = newD;
			var ap = airports.airports[i];
		}
	}
	console.log(d);
	console.log(ap);
  return ap
};

