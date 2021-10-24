const express = require('express');
const geoDesicMedian = require('../utils/geoDesicMedian')
const closestStartPoint = require('../utils/closestStartPoint')

const router = express.Router();

router.post('/', (req, res) => {
  const startPoints = req.body

  console.log(startPoints)

  let coordinateArray = []

  startPoints.map(point => {
    coordinateArray.push(point.airport.coordinates)
  })

  const meetingpointMedian  = geoDesicMedian.geoDesicMedian(coordinateArray) 

  const meetingpointAirport = closestStartPoint(meetingpointMedian, startPoints)

  res.json({meetingpointMedian, meetingpointAirport})

})

module.exports = router