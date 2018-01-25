collectionName='products'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = mongoose.Schema({

	name: {
		type: String,
		required: [ true, 'Name required' ],
		validate: {
			validator: v => /^.+$/.test(v),
			message: 'Name can not be empty'
		}
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
		required: [ true, 'ShelfLife required' ],
	},

	type: {
		type: String,
		required: [ true, 'Type required' ],
		validate: {
			validator: v => /^.+$/.test(v),
			message: 'Type can not be empty'
		}
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


module.exports.findProductById = function(id, callback, populate){
	var populate_data = {
		path: 'supplierid',
		// model: 'Supplier',
		select: 'name _id'
	}

	var p = Product.findById(id)
	if (populate) p = p.populate(populate_data);
	p.exec(callback);
}


module.exports.updateProduct = function(id, product, options, callback){
	var update = {
		$set: {
			name       : product.name,
			supplierid : product.supplierid,
			price      : product.price,
			shelfLife  : product.shelfLife,
			type       : product.type
		}
	}
	Product.findByIdAndUpdate(id, update, options, callback)
}


module.exports.removeProduct = function(id, callback){
	Product.findByIdAndRemove(id, callback);
}


