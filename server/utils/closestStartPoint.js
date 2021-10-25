const median = require('./geoDesicMedian')

// finds the closest startPoint to the given lat/long (meetingPoint in this casd)
module.exports = (meetingPoint, startPoints) => {
  if (Boolean(meetingPoint)) {
    // const { distanceArray } = meetingPoint;
    const x = []
    for(let i = 0; i < startPoints.length; i++) {
      x.push(startPoints[i].airport.coordinates)
    }

    console.log(meetingPoint.coordinates)

    const distanceArray = median.geoDist(x, meetingPoint.coordinates)

    console.log(distanceArray)

    // index of the closest startPoint
    const minDistIndex = distanceArray.indexOf(Math.min(...distanceArray));

    const closestStartPoint = startPoints[minDistIndex];

    return closestStartPoint.airport;
  }
};