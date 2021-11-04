const { axios } = require('axios');
const express = require('express');
const largeairports = require('../public/largeairports.json');
const closestAirport = require('../utils/airport/closestAirport');

const router = express.Router();

router.get('/all', (req, res) => {
	res.send(largeairports);
});

const getLatLng = async (city) => {
	try {
		return await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${city}`).then((response) => {
			return { success: response.data.results[0].locations[0].latLng };
		});
	} catch (err) {
		return { error: err.message };
	}
};

router.get('/coordinates', async (req, res) => {
  try{

    const { lat, lng } = req.query;
    // if (!city) {
      // 	res.status(400).json({ error: 'Please provide a city' });
      // }
      const closestAp = closestAirport(lat, lng);
      
      return  res.status(200).json(closestAp);
    }catch(err){
      return res.status(500).json({ error: err.message });
    }
});

router.get('/city', async (req, res) => {
  try{
    const { city } = req.query;
    if (!city) {
      res.status(400).json({ error: 'Please provide a city' });
    }
    // const latLng = await getLatLng(city);
    
    // const {lat, lng} = latLng.success;
    
    const closestAp = closestAirport(lat, lng);
    
    return res.status(200).json(closestAp);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
