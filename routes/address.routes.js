
const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
//const User = require('./../server/models/user.js');

const address = require('../controllers/address.controller.js');


/*
    GET / -> get to the login page
*/

    router.post('/address', address.create);

    // Retrieve all address
    router.get('/address', address.findAll);

    // Retrieve a single Note with noteId
    router.get('/address/:addressId', address.findOne);

    // Update a Note with noteId
    router.put('/address/:addressId', address.update);

    // Delete a Note with noteId
    router.delete('/address/:addressId', address.delete);
    module.exports = router;