collectionName='products'

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
{
	name: {
		type: String,
		required: [ true, 'Name required' ]
	},

	supplierid: {
		type: Number, /*REF???*/
		required: [ true, 'SupplierId required' ]
	},

	price: {
		type: Number,
		required: [ true, 'Price required' ]
	},

	shelfLife: {
		type: Number, // in milliseconds
		required: [ true, 'ShelfLife required' ]
	},

	type: {
		type: String,
		required: [ true, 'Type required' ]
	}
});

var Product  = module.exports = mongoose.model('Product', productSchema, collectionName);