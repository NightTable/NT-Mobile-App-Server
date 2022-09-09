const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Event = require('../models/Event');


router.get('/', async (req, res) => {

    try {

        let eventResults = await Event.find({});
        res.json(eventResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});



module.exports = router;
