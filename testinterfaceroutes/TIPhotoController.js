  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Photo = require('../models/Photo');


router.get('/', async (req, res) => {

    try {

        let photoResults = await Photo.find({});
        res.json(photoResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
