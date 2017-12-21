var mongoose = require("mongoose");
var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var cache = redis.createClient();
cache.once('ready', function() { console.log("Connected to redis cache."); });

Employee = require('./models/employee');
Product = require('./models/product');
Purchase = require('./models/purchase');
Shop = require('./models/shop');
StockChange = require('./models/stockchange');
Supplier = require('./models/supplier');

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', function() { console.log("Connection error!"); });
db.once('open', function() { console.log("Connected to db."); });

var server = express();

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/api/employee', function(req, res) {
	console.log('sending employees');
	Employee.getEmployees(function (error, emp) {
		if(error) {
			res.status(400).send({ error: 'failed to get employees!' });
		}
		else { 
			res.json(emp);
		}
	})
});

server.get('/api/employee/:_id', function(req, res) {
	var id = req.params._id;

	Employee.findEmployeeById(id, function (error, emp) {
		if(error) {
			res.status(400).send({ error: 'failed to get employee!' });
		}
		else res.json(emp);
	})
});

server.put('/api/employee/:_id', function(req, res) {
	var id = req.params._id;
	var emp = req.body;

	Employee.updateEmployee(id, emp, {}, function(error, emp) {
		if(error) {
			res.status(400).send({ error: 'failed to update employee!' });
		}
		else res.json(emp);
	});
});

server.post('/api/employee', function(req, res) {
	console.log('adding employees: ' + req.body.lastname);
	Employee.addEmployees(req.body, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ error: 'failed to add employees!' });
		}
		else {
			res.json(emp);
		}
	});
});

server.post('/api/hire/:_id', function(req, res) {
	Employee.addHiring(req.params._id, req.body, function(error, emp) {
		if(error) {
			req.status(400).send({ error: 'failed to add hiring!' });
		}
		else {
			res.json(emp);
		}
	});
});

server.delete('/api/hire/:_id', function(req, res) {
	var id = req.params._id;
	Employee.removeEmployee(id, function(error, emp) {
		if(error) res.status(400).send({ error: 'failed to delete employee!' });
		else res.status(200).send({message: 'ok'});
	});
});

server.delete('/api/employee/:_id', function(req, res) {
	var id = req.params._id;
	Employee.removeEmployee(id, function(error, emp) {
		if(error) res.status(400).send({ error: 'failed to delete employee!' });
		else res.status(200).send({message: 'ok'});
	});
});

server.get('/api/employee', function(req, res) {
	Employee.getEmployees(function (error, emp) {
		if(error) {
			res.status(400).send({ error: 'failed to get employees!' });
		}
		else res.json(emp);
	})
});

server.listen(3228);
console.log('Running on port 3228');
module.exports = server;