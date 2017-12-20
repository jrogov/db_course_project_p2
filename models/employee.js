collectionName='employees'

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var employeeSchema = mongoose.Schema({
	lastname: {
		type: String,
		required: [true, 'Last name required'],
		validate: {
			validator : v => /^[A-Z][a-z]+$/.test(v),
			message: '{VALUE} is not a valid last name'
		}
	},

	firstname: {
		type: String,
		required: [true, 'First name required'],
		validate: {
			validator : v => /^[A-Z][a-z]+$/.test(v),
			message: '{VALUE} is not a valid first name'
		}
	},

	middlename: {
		type: String,
		validate: {
			{ validator : v => /^[A-Z][a-z]+$/.test(v) },
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

	// photo: {
	// 	type: binData //??????
	// },

	phone: {
		type: String
		required: [true, 'Phone number required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			{ validator: v => /^8[0-9]{10}$/.test(v); },
			message: 'Invalid phone number' }
	},

	email: {
		type: String,
		required: [true, 'E-mail required'],
		unique: [true, 'Duplicate phone number found'],
		validate: {
			{ validator: v => /.+@.+\..+/.test(v) },
			message: 'Invalid email'
		}
	},


	hirehistory: {
		title: {
			type: String, required: true },

		salary: {
			type: Number, required: true },

		shopId: {
			// type: Number REF??? },
			type: ObjectId,
			ref},

		hiredate: {
			type: Date, required: true },

		fireDate: {
			type: Date },

		fireReason: { ,
			type: String  },
	},
	{
		minimize: false,

	}
});


var Employee = module.exports = mongoose.model('Employee', employeeSchema, collectionName);

module.exports.getEmployees = function(callback){
    Employee.find(callback);
};

module.exports.addEmployee = function(client, callback){
    Employee.create(client, callback)
};

module.exports.findEmployeeById = function(id, callback){
	Employee.create
};

module.exports.removeEmployee = function(id, callback){
    var query = {_id: id};
    Employee.remove(query, callback);
};

