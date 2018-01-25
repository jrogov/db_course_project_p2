collectionName='shops'

var mongoose = require('mongoose');

var shopSchema = mongoose.Schema({
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
			validator: v => /^.+$/.test(v),
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
	}
},
{
	minimize: false,
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

module.exports.findShopById = function(id, callback){
	Shop.findById(id, callback);
};

module.exports.updateShop = function(id, shop, options, callback){
	var update = {
		$set: {
			name    : shop.name,
			address : shop.address,
			phone   : shop.phone
		}
	};
	Shop.findByIdAndUpdate(id, shop, options, callback);
};

module.exports.deleteShop = function(id, callback){
	var query = {_id: id}
	Shop.remove(query, callback)
};