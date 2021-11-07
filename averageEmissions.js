const json = require("./formatData/shorthaul_emissions.json");

const fs = require("fs");

const keys1 = Object.keys(json);

const keys2 = Object.keys(json[keys1[1]]);

const newJson = {
  LTO: {},
  CCD: {},
};

keys2.map((key) => {
  let co2Arr = [];
  let fuelArr = [];
  keys1.map((key1) => {
    if (json[key1][key]) {
      co2Arr.push(Number(json[key1][key].CO2));
      fuelArr.push(Number(json[key1][key].fuel));
    }
  });
  console.log("--------");
  console.log(key);
  console.log(co2Arr);
  const sumCO2 = co2Arr.reduce((a, b) => a + b, 0);
  const avgCO2 = sumCO2 / co2Arr.length;

  const sumFuel = fuelArr.reduce((a, b) => a + b, 0);
  const avgFuel = sumFuel / fuelArr.length;

  console.log(key);

  if (key == 0) {
    newJson.LTO = {
      name: "average",
      fuel: Math.round(avgFuel),
      CO2: Math.round(avgCO2),
    };
  } else {
    newJson.CCD[key] = {
      name: "average",
      fuel: Math.round(avgFuel),
      CO2: Math.round(avgCO2),
    };
  }
});

const data = JSON.stringify(newJson);

//console.log(data);

fs.writeFileSync('server/public/average_emissions/shorthaul_emissions.json', data)

console.log(newJson);
