const express = require('express');
const axios = require('axios');
const qs =require('qs')

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/search', (req, res) => {
  console.log(req.query)
	var data = qs.stringify({
		action: 'SEARCH',
		apid: '',
		city: req.query.city,
		code: '',
		country: 'ALL',
		db: 'airports',
		dst: 'U',
		elevation: '',
		iata: '',
		iatafilter: 'true',
		icao: '',
		name: '',
		offset: '0',
		timezone: '',
		x: '',
		y: '',
	});
	var config = {
		method: 'post',
		url: 'https://openflights.org/php/apsearch.php',
		headers: {
			'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
			'sec-ch-ua-mobile': '?0',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
			'sec-ch-ua-platform': '"macOS"',
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: '*/*',
			Cookie: 'PHPSESSID=n90espddc8ero1akapp0bqa1j0',
			'Access-Control-Allow-Origin': '*',
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
      const data = response.data.airports
      data.filter((item) => item.source = "OurAirports")
      res.send(data)
		})
		.catch(function (error) {
			console.log(error);
		});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
