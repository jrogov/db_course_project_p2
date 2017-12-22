collectionName='shops'

var mongoose = require('mongoose');

var shopSchema = mongoose.Schema({
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
		// unique: [true, 'Duplicate phone number found'],
		validate: {
			validator: v => /^8[0-9]{10}$/.test(v),
			message: 'Invalid phone number' }
	}
});

var Shop  = module.exports = mongoose.model('Shop', shopSchema, collectionName);

// =============================================================================
// =                             METHODS                                       =
// =============================================================================


module.exports.addShop = function(shop, callback){
	Shop.create(shop, callback);
};

module.exports.getShops = function(callback){
	Shop.find(callback);
}

module.exports.updateShop = function(id, shop, option, callback){
	var update = {
		name    : shop.name,
		address : shop.address,
		phone   : shop.phone
	};
	Shop.findByIdAndUpdate(id, shop, options, callback);
};

module.exports.deleteShop = function(id, callback){
	var query = {_id: id}
	Shop.remove(query, callback)
};