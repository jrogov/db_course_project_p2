collectionName='suppliers'

var mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name required']
	},

	address: {
		type: String,
		required: [true, 'Address required']
	},

	phone: {
		type: String,
		required: [true, 'Phone number required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			validator: v => /^8[0-9]{10}$/.test(v),
			message: 'Invalid phone number' }
	},


	email: {
		type: String,
		required: [true, 'E-mail required'],
		unique: [true, 'Duplicate phone number found'],
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

module.exports.updateSupplier = function(id, supplier, callback){
	update = {
		name    : supplier.name,
		address : supplier.address,
		phone   : supplier.phone,
		email   : supplier.email
	};
	Supplier.findByIdAndUpdate(id, update, callback);
}

module.exports.deleteSupplier = function(id, callback){
	Supplier.findByIdAndRemove(id, callback);
}