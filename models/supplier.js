collectionName='suppliers'

var mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
supplier =
{
	name: {
		type: String,
		required: [true, 'Name required']
	},

	address: {
		type: String,
		required: [true, 'Address required']
	},

	phone: {
		type: String
		required: [true, 'Phone number required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			{ validator: v => /^8[0-9]{10}$/.test(v); },
			message: 'Invalid phone number' }
	},


	email: {
		type: String,
		required: [true, 'E-mail required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			{ validator: v => /.+@.+\..+/.test(v) },
			message: 'Invalid email'
		}
	}
}

var Supplier = module.exports = mongoose.model('Supplier', supplierSchema, collectionName);
