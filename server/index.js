const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded())

app.use(express.json());


fs.readdir('./routes/', (err, files) => {
	if (err) {
		console.log(err);
	}

	let routeFiles = files.filter((f) => f.split('.').pop() === 'js');

	console.log('Loading routes:');

	routeFiles.forEach((routeFile, index) => {
		let route = require(`./routes/${routeFile}`);
		app.use('/' + routeFile.replace('.js', ''), route);

		console.log(`\t${index + 1} / ${routeFiles.length}: Loaded ${routeFile}`);
	});
});

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => {
	res.send('Server is live');
});
