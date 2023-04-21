  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Region = require('../models/Region');


router.get('/', async (req, res) => {

    try {

        let regionResults = await Region.find({});
        res.json(regionResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
