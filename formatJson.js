const json = require("./rawdata/shorthaul_emission_data.json");

const fs = require("fs");

newJson = {};

const { emissions } = json;

emissions.map((item) => {
  const id = item.aircraft_id.replace("-", "");

  if (!(id in newJson)) {
    newJson[id] = {};
  }
  console.log(item.lto_ccd);

  if (item.lto_ccd === "LTO") {
    console.log("lto", item);
    newJson[id][0] = {
      name: item.aircraft_id,
      fuel: item.fuel,
      CO2: item.CO2,
    };
  } else {
    newJson[id][item.distance] = {
      name: item.aircraft_id,
      fuel: item.fuel,
      CO2: item.CO2,
    };
  }
});

let data = JSON.stringify(newJson);

fs.writeFileSync("formatdata/shorthaul_emissions.json", data);

console.log(newJson);
