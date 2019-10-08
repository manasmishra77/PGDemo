const Address = require('../model/address.js');
// Create and Save a new Note
exports.create = (req, res) => {
// Validate request
var address = req.body
if ((!address.street) ||  (!address.plotNumber) || (!address.sector) ||
  (!address.landmark) || (!address.pin) ||  (!address.contactNumber) || 
  (!address.houseNumber) || (!address.locality) ||  (!address.city)) {
    return res.status(400).send({
        message: "address content can not be empty"
    });
  }
// Create an address
const addressModel = getAddressSchema(req.body);
// const addressModel = new Address({
//     street: req.body.street, 
//     plotNumber: req.body.plotNumber,
//     sector: req.body.sector,
//     landmark: req.body.landmark,
//     pin: req.body.pin,
//     contactNumber: req.body.contactNumber,
//     houseNumber: req.body.houseNumber,
//     locality: req.body.locality,
//     city: req.body.city,
//     lastUpdate: Number(new Date()),
// });

// Save Note in the database
addressModel.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the address."
    });
});
};

// Retrieve and return all address from the database.
exports.findAll = (req, res) => {
    Address.find()
    .then(addresses => {
        res.send(addresses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single address with a addressId
exports.findOne = (req, res) => {
    Address.findById(req.params.addressId)
    .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });            
        }
        res.send(address);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.addressId
        });
    });
};

// Update a address identified by the addressId in the request
exports.update = (req, res) => {
// Find address and update it with the request body
let updatedAddress = {
    street: req.body.street, 
    plotNumber: req.body.plotNumber,
    sector: req.body.sector,
    landmark: req.body.landmark,
    pin: req.body.pin,
    contactNumber: req.body.contactNumber,
    houseNumber: req.body.houseNumber,
    locality: req.body.locality,
    city: req.body.city,
    lastUpdate: Number(new Date()),
};
Address.findByIdAndUpdate(req.params.addressId, updatedAddress, {new: true})
.then(address => {
    if(!address) {
        return res.status(404).send({
            message: "address not found with id " + req.params.addressId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "address not found with id " + req.params.addressId
        });                
    }
    return res.status(500).send({
        message: "Error updating address with id " + req.params.addressId
    });
});
};

// Delete a address with the specified addressId in the request
exports.delete = (req, res) => {
    Address.findByIdAndRemove(req.params.addressId)
    .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "address not found with id " + req.params.addressId
            });                
        }
        return res.status(500).send({
            message: "Could not delete address with id " + req.params.addressId
        });
    });
};

function getAddressSchema(addressReq) {
    return new Address({
        street: addressReq.street, 
        plotNumber: addressReq.plotNumber,
        sector: addressReq.sector,
        landmark: addressReq.landmark,
        pin: addressReq.pin,
        contactNumber: addressReq.contactNumber,
        houseNumber: addressReq.houseNumber,
        locality: addressReq.locality,
        city: addressReq.city,
        lastUpdate: Number(new Date()),
    });
}