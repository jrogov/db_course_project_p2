collectionName='stockchanges'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var stockItem = mongoose.Schema({
	productid: {
		type: ObjectId,
		ref: 'Product',
		required: [true, 'ProductId required' ]
	},
	count: {
		type: Number,
		required: [true, 'Product Count required' ]
	},
	manufactureDate: {
		type: Date,
		required: [true, 'manufactureDate' ]
	}
},
{
	_id: false
});

var stockChangeSchema = mongoose.Schema({

	shopid: {
		type: Number,
		required: [ true, 'ShopId required' ]
	},
	arrivaldate: {
		type: Number,
		required: [ true, 'Arrival Date required' ]
	},
	items: [stockItem]
});

var StockChange = module.exports = mongoose.model('StockChange', stockChangeSchema, collectionName);

// =============================================================================
// =                             METHODS                                       =
// =============================================================================


module.exports.addStockChange = function(stockchange, callback){
	StockChange.create(stockchange, callback);
}


module.exports.getStockChanges = function(callback){
	StockChange.find(callback);
}


// Add array of stockItems to stockChange.items
module.exports.addStockItems = function(id, items, callback){
	var update = {
		$pushAll: {
			items: items
		}
	}
	StockChange.findByIdAndUpdate(id, update, callback);
}

// Update items:
// items_update = [ {productId: '', count: 0, manufactureDate: new Date()} ]

module.exports.updateStockItems = function(id, items_update, callback){

	var docQuery = StockChange.findById(id);
	for( item in items_update ){
		var criteria = {

			items: {
				$elemMatch: item.productId
			}
		}
		var update = {
			count: items_update.count,
			manufactureDate: items_update.manufactureDate
		};

		docQuery = docQuery.update(criteria, update);
	}
	docQuery.exec(callback);
}

module.exports.findStockChangeById = function(id, callback){
	StockChange.findById(id, callback);
}
