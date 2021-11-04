const airports = require('./client/public/largeairports.json');
const gm = [52.602408081965116, 12.641580551868893];

const p1 = [59.9139, 10.7522];
const p2 = [52.52, 13.405];
const p3 = [51.5074, 0.1278];
const p4 = [48.8566, 2.3522];

const d1 =haversineFormula(gm[0], gm[1], p1[0], p1[1]);
const d2 =haversineFormula(gm[0], gm[1], p2[0], p2[1]);
const d3 =haversineFormula(gm[0], gm[1], p3[0], p3[1]);
const d4 = haversineFormula(gm[0], gm[1], p4[0], p4[1]);



const lat1 = 54.3233
const lng1 = 10.1228

function toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
let dArr = []

const func = (lat, lng) => {
	var R = 6371e3; // metres

	var φ1 = toRadians(lat1);

	var φ2 = toRadians(lat);

	var Δφ = toRadians(lat - lat1)

	var Δλ = toRadians(lng - lng1)

	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	var d = R * c;

  return d;
};

const func2 = () => {
  var d = 1000000000000
  var ap = {}
  for (let i = 0; i < airports.airports.length; i++) {
    let newD = func(airports.airports[i].latitude_deg, airports.airports[i].longitude_deg,);
    
    if(newD < d){
      var d = newD;
      var ap = airports.airports[i];
    }
  }
  console.log(d)
  console.log(ap)
}

func2()
