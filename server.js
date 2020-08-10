require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//CORS enabled
app.use(cors());
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Origin', [
		'https://marius1388.github.io/',
		'http://localhost:3000',
	]);
	// res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	// res.setHeader(
	// 	'Access-Control-Allow-Methods',
	// 	'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	// );

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,Content-Type,Authorization'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// Bodyparser Middleware
app.use(express.json());

mongoose
	.connect(process.env.DATABASEURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to Db!!!');
	})
	.catch((err) => {
		console.log('ERROR', err.message);
	});

app.use('/api/products', require('./routes/api/products'));
app.use('/api', require('./routes/api/orders'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets(the build folder) if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
