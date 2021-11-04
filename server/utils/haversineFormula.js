const toRadians = (degrees) => {
	var pi = Math.PI;
	return degrees * (pi / 180);
};

module.exports = (lat1, lng1, lat, lng) => {
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

