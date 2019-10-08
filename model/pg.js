const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;


// User Schema
var PGSchema = mongoose.Schema({
	numberOfBed: {
		type: Number,
		required: true
	},
	isACAvailable: {
		type: Boolean,
		required: true
	},
	isGyeserAvailable: {
		type: Boolean,
		required: true
	},
	isWifiAvailable: {
		type: Boolean,
		required: true
	},
	isTVAvailable: {
		type: Boolean,
		required: true
	},
	address: {
			 type: Schema.Types.ObjectId, 
			ref: 'Address'
	},
	posterImagePath: {
		type: String,
		required: true
	},
	ownerName: {
		type: String,
		required: true
	},
	ownerContactNumber: {
		type: String,
		required: true
	},
	
	// lastName: {
	// 	type: String,
	// 	required: true
	// },
	// dateOfBirth: {
	// 	type: String,
	// 	required: true,
	// },
	// sex: {
	// 	// true = male
	// 	// false = female
	// 	type: Boolean,
	// 	required: true,
	// 	default: true
	// },
	// hospitalNumber: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
	// diseases: {
    //     type: Array,
    //     default: []
    //  },
    //  score: {
    //     type: Number,
	//    required: true,
	//    default: 0
    //  },
	// room: {
	// 	type: String,
	// 	required: true,
	// 	default: 'noroom'
	// },
	lastUpdate: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('PG', PGSchema);
