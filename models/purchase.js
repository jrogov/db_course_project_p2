collectionName='purchases'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var productItem = mongoose.Schema({
	productId: {
		type: Number,
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

	items: [ productItem ]
});

var Purchase = module.exports = mongoose.model('Purchase', purchaseSchema, collectionName);

module.exports.addPurchase = function(shopid, cassierid, items, callback){
	var query = {
		shopid       : shopid,
		cassierid    : cassierid,
		purchasedate : new Date,
		items        : items
	}
	Purchase.create(query, callback);
}

module.exports.getPurchases = function(callback){
	Purchase.find(callback);
}

module.exports.findPurchaseById = function(id, callback){
	Purchase.findById(id, callback);
}

module.exports.findPurchases = function(cond, options, callback){
	Purchase.find(cond, options, callback);
}