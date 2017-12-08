'use strict';
const mongoose = require('mongoose');
module.exports = function() {
	const dbUser = process.env.DB_USER || '';
	const dbPassword = process.env.DB_PASSWORD || '';
	const dbHost = process.env.DB_HOST || 'localhost';
	const dbPort = process.env.DB_PORT || '';
	const dbName = process.env.DB_NAME || 'urls';
	const uri = `mongodb://jimmyc:tulipOne@ds125906.mlab.com:25906/urls`;
	mongoose.connect(uri);
	mongoose.connection.on('connected', () => {
		console.log(`Database connected to: ${uri}`);
	});
	mongoose.connection.on('disconnected', () => {
		console.log(`Database disconnected from: ${uri}`);
	});
	mongoose.connection.on('error', err => {
		console.log(`Database error on connection: ${err}`);
	});
	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Database disconnected due the end of application');
			process.exit(0);
		});
	});
};