collectionName='purchases'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var productItemSchema = mongoose.Schema({
	productId: {
		type: ObjectId,
		ref: 'Product',
		required: [ true, 'ProductId required' ]
	},
	count: {
		type: Number,
		required: [ true, 'Product Count required']
		}
});

var purchaseSchema = mongoose.Schema({
	shopid: {
		type: ObjectId,
		ref: 'Shop',
		required: [ true, 'ShopId required' ]
	},

	cassierid: {
		type: ObjectId,
		ref: 'Employee',
		required: [ true, 'CassierId required' ]
	},

	purchasedate: {
		type: Date,
		required: [ true, 'Purchase Date required' ]
	},

	items: [ productItemSchema ]
});

// var ProductItem = mongoose.model('ProductItem', productItemSchema, 'productItems');
var Purchase = module.exports = mongoose.model('Purchase', purchaseSchema, collectionName);

// module.exports.push

// module.exports.addPurchase = function(shopid, cassierid, items, callback){
module.exports.addPurchase = function(purchases, callback){
	// var query = {
		// shopid       : shopid,
		// cassierid    : cassierid,
		// purchasedate : new Date,
		// items        : items
	// }
	Purchase.create(purchases, callback);
}

module.exports.getPurchases = function(callback, short, populate){
	var projection = new Object();

	var pop = [{
		path: 'shopid',
		select: '_id name'
	},
	{
		path: 'cassierid',
		select: '_id firstname lastname'
	}
	]

	if (short){
		projection.items = 0;
	}

	var p =Purchase.find({}, projection);
	if( populate ) p=p.populate(pop);
	p.exec(callback)
}

module.exports.findPurchaseById = function(id, callback, populate){
	var pop = [{
		path: 'shopid',
		select: '_id name'
	},
	{
		path: 'cassierid',
		select: '_id firstname lastname'
	},
	{
		path: 'items.productId',
		// model: 'Product',
		select: '_id name'
	}]

	var p = Purchase.findById(id);
	if( populate ) p = p.populate(pop)
	p.exec(callback);

}

module.exports.findPurchases = function(cond, options, callback){
	Purchase.find(cond, options, callback);
}