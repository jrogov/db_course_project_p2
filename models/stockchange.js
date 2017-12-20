collectionName='stockchanges'

var mongoose = require('mongoose');

var stockChangeSchema = mongoose.Schema({

	shopid: {
		type: Number,
		required: [ true, 'ShopId required' ]
	},
	arrivaldate: {
		type: Number,
		required: [ true, 'Arrival Date required' ]
	},
	items: {
		{
			productid: {
				type: Number,
				required: [true, 'ProductId required' ]
			},
			count: {
				type: Number,
				required: [true, 'Product Count required' ]
			},
			manufactureDate: {
				type: Date,
				required: [true, 'manufactureDate' ]
			},
			required: true
		}
	}
});

var StockChanges = module.exports = mongoose.model('StockChanges', stockChangeSchema, collectionName);

