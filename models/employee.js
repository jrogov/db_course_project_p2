collectionName='employees'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var fs = require('fs');
// var nophoto = fs.readFileSync('models/images/nophoto.png').toString('base64');
var nophoto = require('./nophoto_b64')

// Subdocument of hireHistory for Employee
var hireHistorySchema = mongoose.Schema({

	// TODO Index by contractno

	title: {
		type: String, required: true },

	salary: {
		type: Number, required: true },

	shopId: {
		type: ObjectId,
		ref: 'Shop',
		required: true
	},

	hiredate: {
		type: Date, required: true },

	fireDate: {
		type: Date },

	fireReason: {
		type: String  },
	}
);

var employeeSchema = mongoose.Schema({
	lastname: {
		type: String,
		required: [true, 'Last name required'],
		validate: {
			validator : v => /^([A-Z][a-z]* ?)+$/.test(v),
			message: '{VALUE} is not a valid last name'
		}
	},

	firstname: {
		type: String,
		required: [true, 'First name required'],
		validate: {
			validator : v => /^([A-Z][a-z]* ?)+$/.test(v),
			message: '{VALUE} is not a valid first name'
		}
	},

	middlename: {
		type: String,
		validate: {
			validator: v => /^([A-Z][a-z]* ?)+$/.test(v),
			message: '{VALUE} is not a valid middle name'
		}
	},

	birthdate: {
		type: Date,
		required: [true, 'Birthdate required']
	},

	hiredate: {
		type: Date,
		default: Date.now()
	},

	photo: {
		type: String,
		default: nophoto
	},

	phone: {
		type: String,
		required: [true, 'Phone number required'],
		unique: [true, 'This phone is already registered'],
		validate: {
			// validator: v => /^8[0-9]{10}$/.test(v),
			validator: v => /^(\+[0-9]{1,3}|8)-[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(v),
			message: 'Invalid phone number' }
	},

	email: {
		type: String,
		required: [true, 'E-mail required'],
		unique: [true, 'This email is already registered'],
		validate: {
			validator: v => /.+@.+\..+/.test(v),
			message: 'Invalid email'
		}
	},


	hirehistory: [hireHistorySchema],

},
{
	minimize: false,
}
);

// var HireHistory = mongoose.model('HireHistory', hireHistorySchema);
var Employee = module.exports = mongoose.model('Employee', employeeSchema, collectionName);

// =============================================================================
// =                             METHODS                                       =
// =============================================================================


module.exports.getEmployees = function(callback, short){
	var projection = new Object();
	if( short ) {
		projection.hirehistory = 0;
		projection.birthdate = 0;
		projection.phone = 0;
		projection.email = 0;
	}
	Employee.find({}, projection, callback)
};


module.exports.addEmployees = function(employees, callback){
    Employee.create(employees, callback);
};


module.exports.findEmployeeById = function(id, callback, populate){
	var pop = {
		path: 'hirehistory.shopId',
		model: 'Shop',
		select: '_id name',
	}
	var p = Employee.findById(id);
	if( populate )
		p = p.populate(pop)

	p.exec(callback)
};



module.exports.updateEmployee = function(id, people, options, callback){
	var update = {
		$set: {
			lastname   : people.lastname,
			firstname  : people.firstname,
			middlename : people.middlename,
			phone      : people.phone,
			email      : people.email,
			birthdate  : people.birthdate,
			hiredate   : people.hiredate
		}
	};
	Employee.findByIdAndUpdate(id, update, options, callback);
}


module.exports.hireEmployee = function(id, hiring, callback){
	var new_hiring = {
		title    : hiring.title,
		salary   : hiring.salary,
		shopId   : hiring.shopId,
		hiredate : hiring.hiredate
	};

	var update = {
		$push: { hirehistory: new_hiring }
	};

	Employee.findByIdAndUpdate(id, update, callback);
};


module.exports.fireEmployee = function(contractid, fireData, callback){
	var query = {
		hirehistory: {
			$elemMatch: { _id: contractid }
		}
	}
	if( !fireData.date ) fireData['date'] = new Date();
	var update = {
		$set: {
			"hirehistory.$.fireDate"  : fireData.Date,
			"fireReason.$.fireReason" : fireData.fireReason
		}
	}

	// probably BUG: change to .update
	Employee.findOneAndUpdate(query, update, callback);
};


module.exports.removeEmployee = function(id, callback){
    Employee.findByIdAndRemove(id, callback);
};
