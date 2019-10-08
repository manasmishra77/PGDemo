const PG = require('../model/pg.js');
const addressController = require('./address.controller.js');

var createPG = (req, res) => {
    // Validate request
var pgReq = req.body;

if ((!pgReq.numberOfBed) ||  (!pgReq.address) || (!pgReq.ownerName) ||
  (!pgReq.ownerContactNumber)) {
    return res.status(400).send({
        message: "address content can not be empty"
    });
  }
// Create an address
const pgModel = new PG({
    numberOfBed: pgReq.numberOfBed, 
    isACAvailable: pgReq.isACAvailable,
    isGyeserAvailable: pgReq.isGyeserAvailable,
    isWifiAvailable: pgReq.isWifiAvailable,
    isTVAvailable: pgReq.isTVAvailable,
    address: addressController.getAddressSchema(pgReq.address),
    posterImagePath: pgReq.posterImagePath,
    ownerName: pgReq.ownerName,
    ownerContactNumber: pgReq.ownerContactNumber,
    lastUpdate: Number(new Date()),
});

// Save PG in the database
pgModel.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the address."
    });
});
};

module.exports.create = createPG;

