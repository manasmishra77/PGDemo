const mongoose = require('mongoose');
const _ = require('lodash');

// User Schema
var AddressSchema = mongoose.Schema({
    street: {
		type: String,
		required: true
    },
    plotNumber: {
		type: String,
		required: true
    },
    sector: {
		type: String,
		required: true
    },
    landmark: {
		type: String,
		required: true
    },
    pin: {
		type: String,
		required: true
    },
    contactNumber: {
		type: String,
		required: true
    },
    houseNumber: {
		type: String,
		required: true
	},
	locality: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	lastUpdate: {
		type: Number,
		required: true
	}
});

/*
	function to update the diseases and the score of a patient
	*Requires the patient to have the diseases already saved in the databases
*/
module.exports = mongoose.model('Address', AddressSchema);
