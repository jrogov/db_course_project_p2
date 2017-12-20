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
		type: String
		required: [true, 'Phone number required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			{ validator: v => /^8[0-9]{10}$/.test(v); },
			message: 'Invalid phone number' }
	}
});

var Shop  = module.exports = mongoose.model('Shop', shopSchema, collectionName);

module.exports.addShop = function(shop, callback){
	Shop.create(shop, callback);
};

module.exports.updateShop = function(id, product, option, callback){
	var query = {_id: id};
	var update = {};
	if(product.name    !== null) update.name    = product.name
	if(product.address !== null) update.address = product.address
	if(product.phone   !== null) update.phone   = product.phone
	Shop.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteShop = function(id, callback){
	var query = {_id: id}
	Shop.remove(query, callback)
};