// finds the closest startPoint to the given lat/long (geodesicMedian in this casd)
module.exports = (geoDesicMedian, startPoints) => {
  if (Boolean(geoDesicMedian.coordinates)) {
    const { distanceArray } = geoDesicMedian;

    // index of the closest startPoint
    const minDistIndex = distanceArray.indexOf(Math.min(...distanceArray));

    const closestStartPoint = startPoints[minDistIndex];

    return closestStartPoint;
  }
};