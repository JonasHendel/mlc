const getWeights = (medianPoint, tripToMedianPoint) => {
  let weights = [];

  medianPoint.distanceArray.map((distance, index) => {
    // average distance
    let tempDistanceArray = medianPoint.distanceArray;

    const filteredDistanceArray = tempDistanceArray.filter(
      (value) => value !== distance
    );

    const averageFilteredDistance =
      filteredDistanceArray.reduce((a, b) => a + b, 0) /
      filteredDistanceArray.length;

    // average emissions
    let tempCO2Array = tripToMedianPoint.co2Array;

    const filteredCO2Array = tempCO2Array.filter(
      (val) => val !== tempCO2Array[index]
    );

    const averageFilteredCO2 =
      filteredCO2Array.reduce((a, b) => a + b, 0) / filteredCO2Array.length;

    // co2 consumptions per km
    const averageCO2PerKm = averageFilteredCO2 / averageFilteredDistance;

    const co2PerKm = distance === 0 ? 0 : tempCO2Array[index] / distance;

    // calculate weights
    const weight = co2PerKm / averageCO2PerKm;
    weights.push(weight);
  });
  return weights;
};

module.exports = getWeights
