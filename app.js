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
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get employees
server.get('/api/employee', function(req, res) {
	console.log('sending employees');
	Employee.getEmployees(function (error, emp) {
		if(error) {
			res.status(400).send({ message: 'fail', error: error });
		}
		else { 
			console.log(emp);
			res.json(emp);
		}
	})
});

// get employee by id
server.get('/api/employee/:_id', function(req, res) {
	var id = req.params._id;

	Employee.findEmployeeById(id, function (error, emp) {
		if(error) {
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	})
});

// update employee
server.put('/api/employee/:_id', function(req, res) {
	var id = req.params._id;
	var emp = req.body;

	console.log(JSON.stringify(emp, null, 4));
	console.log('updating ' + id);

	Employee.updateEmployee(id, emp, {}, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			console.log('updated');
			res.json(emp);
		}
	});
});

// add employee
server.post('/api/employee', function(req, res) {
	console.log('adding employees: ' + req.body.lastname);
	Employee.addEmployees(req.body, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			res.json(emp);
		}
	});
});

// hire employee
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

// fire employee
server.delete('/api/hire/:_id', function(req, res) {
	var id = req.params._id;
	Employee.removeEmployee(id, function(error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.status(200).send({message: 'ok'});
	});
});

// delete employee
server.delete('/api/employee/:_id', function(req, res) {
	var id = req.params._id;
	console.log('deleting employee ' + id);
	Employee.removeEmployee(id, function(error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.status(200).send({message: 'ok'});
	});
});


// get products
server.get('/api/product', function(req, res) {
	console.log('sending products');
	Product.getProducts(function (error, emp) {
		if(error) {
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	})
});

// get product by id
server.get('/api/product/:_id', function(req, res) {
	var id = req.params._id;

	Product.findProductById(id, function (error, emp) {
		if(error) {
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	})
});

// add product
server.post('/api/product', function(req, res) {
	console.log('adding product');
	console.log(JSON.stringify(req.body, null, 4));
	Product.addProduct(req.body, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			res.json(emp);
		}
	});
});

// update product
server.put('/api/product/:_id', function(req, res) {
	var id = req.params._id;
	var jc = req.body;

	console.log('updating ' + id);
	console.log(JSON.stringify(jc, null, 4));

	Product.updateProduct(id, jc, {}, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			console.log('updated');
			res.json(emp);
		}
	});
});

// delete product
server.delete('/api/product/:_id', function(req, res) {
	var id = req.params._id;
	console.log('deleting product ' + id);
	Product.removeProduct(id, function(error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.status(200).send({message: 'ok'});
	});
});


// get purchase
server.get('/api/purchase', function(req, res) {
	console.log('sending purchases');
	Purchase.getPurchases(function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// get purchase by id
server.get('/api/purchase/:_id', function(req, res) {
	var id = req.params._id;

	Purchase.findPurchaseById(id, function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// add purchase
server.post('/api/purchase', function(req, res) {
	console.log('adding purchase');
	console.log(JSON.stringify(req.body, null, 4));
	Purchase.addPurchase(req.body, function (error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	});
});


// get shops
server.get('/api/shop', function(req, res) {
	console.log('sending shops');
	Shop.getShops(function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// add shop
server.post('/api/shop', function(req, res) {
	console.log('adding shop');
	console.log(JSON.stringify(req.body, null, 4));
	Shop.addShop(req.body, function (error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	});
});

// delete shop
server.delete('/api/shop/:_id', function(req, res) {
	var id = req.params._id;
	console.log('deleting shop ' + id);
	Shop.deleteShop(id, function(error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.status(200).send({message: 'ok'});
	});
});

// update shop
server.put('/api/shop/:_id', function(req, res) {
	var id = req.params._id;
	var jc = req.body;

	console.log('updating ' + id);
	console.log(JSON.stringify(jc, null, 4));

	Shop.updateShop(id, jc, {}, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			console.log('updated');
			res.json(emp);
		}
	});
});


// get stock changes
server.get('/api/stockchange', function(req, res) {
	console.log('sending stock changes');
	StockChange.getStockChanges(function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// get stock change by id
server.get('/api/stockchange/:_id', function(req, res) {
	var id = req.params._id;

	StockChange.findStockChangeById(id, function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// add stock change
server.post('/api/stockchange', function(req, res) {
	console.log('adding stock change');
	console.log(JSON.stringify(req.body, null, 4));
	StockChange.addStockChange(req.body, function (error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	});
});

// add stock change
server.post('/api/stockchange/:_id/items', function(req, res) {
	var id = req.params._id;
	console.log('adding stock items');
	console.log(JSON.stringify(req.body, null, 4));
	StockChange.addStockItems(id, req.body, function (error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	});
});

// update stock change items
server.put('/api/stockchange/:_id/items', function(req, res) {
	var id = req.params._id;
	var jc = req.body;

	console.log('updating ' + id);
	console.log(JSON.stringify(jc, null, 4));

	StockChange.updateStockItems(id, jc, {}, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			console.log('updated');
			res.json(emp);
		}
	});
});



// get suppliers
server.get('/api/supplier', function(req, res) {
	console.log('sending suppliers');
	Supplier.getSuppliers(function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// get stock change by id
server.get('/api/supplier/:_id', function(req, res) {
	var id = req.params._id;

	Supplier.findSupplierById(id, function (error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.json(emp);
	})
});

// add stock change
server.post('/api/supplier', function(req, res) {
	console.log('adding supplier');
	console.log(JSON.stringify(req.body, null, 4));

	Supplier.addSupplier(req.body, function (error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else res.json(emp);
	});
});

// delete supplier
server.delete('/api/supplier/:_id', function(req, res) {
	var id = req.params._id;
	console.log('deleting supplier ' + id);
	Supplier.deleteSupplier(id, function(error, emp) {
		if(error) res.status(400).send({ message: 'fail', error: error });
		else res.status(200).send({message: 'ok'});
	});
});

// update shop
server.put('/api/supplier/:_id', function(req, res) {
	var id = req.params._id;
	var jc = req.body;

	console.log('updating ' + id);
	console.log(JSON.stringify(jc, null, 4));

	Supplier.updateSupplier(id, jc, {}, function(error, emp) {
		if(error) {
			console.log(error);
			res.status(400).send({ message: 'fail', error: error });
		}
		else {
			console.log('updated');
			res.json(emp);
		}
	});
});


server.listen(3228);
console.log('Running on port 3228');
module.exports = server;