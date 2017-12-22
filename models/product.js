collectionName='products'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = mongoose.Schema({

	name: {
		type: String,
		required: [ true, 'Name required' ]
	},

	supplierid: {
		type: ObjectId,
		ref: 'Supplier',
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

// =============================================================================
// =                             METHODS                                       =
// =============================================================================


module.exports.addProduct = function(product, callback){
	Product.create(product, callback);
}


module.exports.getProducts = function(callback){
	Product.find(callback);
}


module.exports.findProductById = function(id, callback){
	Product.findById(id, callback);
}


module.exports.updateProduct = function(id, product, callback){
	var update = {
		name       : product.name,
		supplierid : product.supplierid,
		price      : product.price,
		shelfLife  : product.shelfLife,
		type       : product.type
	}
	Product.findByIdAndUpdate(id, update, callback)
}


module.exports.removeProduct = function(id, callback){
	Product.findByIdAndRemove(id, callback);
}


