collectionName='purchases'

var mongoose = require('mongoose');

var purchaseSchema = mongoose.Schema({
	shopid: {
		type: Number, /*REF???*/
		required: [ true, 'ShopId required' ]
	},

	cassierid: {
		type: Number, /*REF???*/
		required: [ true, 'CassierId required' ]
	},

	purchasedate: {
		type: Date,
		required: [ true, 'Purchase Date required' ]
	},

	items: {
		productId: {
			type: Number,
			required: [ true, 'ProductId required' ]
		},
		count: {
			type: Number,
			required: [ true, 'Product Count required']
		}
	}
});

var Purchase = module.exports = mongoose.model('Purchase', purchaseSchema, collectionName);

module.exports.addPurchase = function(shopid, cassierid, items, callback){
	var query = {
		shopid: shopid,
		cassierid: cassierid,
		purchasedate: new Date,
		items: items
	}
	Purchase.create(query, callback);
}

module.exports.getPurchases = function(callback){
	Purchase.find(callback);
}

module.exports.findPurchaseById = function(id, callback){
	query:
}

create_purchase
create_purchase_item
delete_purchase_item
delete_purchase
finalize_purchase