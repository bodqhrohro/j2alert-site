import express from 'express';
import fetch from 'node-fetch';

const app = express()

app.get('/api/locations.json', function(req, res) {
	fetch('https://war.ukrzen.in.ua/alerts/locations.json').then(body => body.text()).then(text => res.send(text));
});

app.get('/api/active.mp', function(req, res) {
	fetch('https://war-api.ukrzen.in.ua/alerts/api/v3/alerts/active.mp').then(body => {
		const data = [];

		body.body.on('data', (chunk) => {
			data.push(chunk);
		});

		body.body.on('end', () => {
			res.send(Buffer.concat(data))
		})

		body.body.read();
	});
});
app.get('/', function(req, res) {
	res.sendFile('index.html', { root: '.' });
});
app.get('/favicon.ico', function(req, res) {
	res.sendFile('favicon.ico', { root: '.' });
});

app.use('/img', express.static('img'));
app.use('/dl', express.static('dl'));
app.listen(80);
