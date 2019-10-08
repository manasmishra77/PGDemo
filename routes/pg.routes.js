const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;

const pgController = require('../controllers/pg.controller.js');

router.post('/pg', pgController.create);

    // Retrieve all address
    // router.get('/address', address.findAll);

    // // Retrieve a single Note with noteId
    // router.get('/address/:addressId', address.findOne);

    // // Update a Note with noteId
    // router.put('/address/:addressId', address.update);

    // // Delete a Note with noteId
    // router.delete('/address/:addressId', address.delete);
    module.exports = router;