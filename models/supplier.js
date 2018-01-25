collectionName='suppliers'

var mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name required'],
		validate: {
			validator: v => /^.+$/.test(v),
			message: 'Name can not be empty'
		}
	},

	address: {
		type: String,
		required: [true, 'Address required'],
		validate: {
			validator: function(v){ return /^.+$/.test(v)},
			message: 'Address can not be empty'
		}
	},

	phone: {
		type: String,
		required: [true, 'Phone number required'],
		// unique: [true, 'Duplicate phone number found'],
		validate: {
			validator: v => /^(\+[0-9]{1,3}|8)-[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(v),
			message: 'Invalid phone number' }
	},


	email: {
		type: String,
		required: [true, 'E-mail required'],
		// unique: [true, 'Duplicate phone number found'],
		validate: {
			validator: v => /.+@.+\..+/.test(v),
			message: 'Invalid email'
		}
	}
});

var Supplier = module.exports = mongoose.model('Supplier', supplierSchema, collectionName);

// =============================================================================
// =                             METHODS                                       =
// =============================================================================


module.exports.addSupplier = function(supplier, callback){
	Supplier.create(supplier, callback);
}

module.exports.getSuppliers = function(callback){
	Supplier.find(callback);
}

module.exports.findSupplierById = function(id, callback){
	Supplier.findById(id, callback);
}

module.exports.updateSupplier = function(id, supplier, options, callback){
	update = {
		$set: {
			name    : supplier.name,
			address : supplier.address,
			phone   : supplier.phone,
			email   : supplier.email
		}
	};
	Supplier.findByIdAndUpdate(id, update, options, callback);
}

module.exports.deleteSupplier = function(id, callback){
	Supplier.findByIdAndRemove(id, callback);
}