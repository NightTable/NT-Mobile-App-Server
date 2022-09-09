const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const EmailValidationToken = require('../models/EmailValidationToken');


router.get('/', async (req, res) => {

    try {

        let emailValidationTokenResults = await EmailValidationToken.find({});
        res.json(emailValidationTokenResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});



module.exports = router;
