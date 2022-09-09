const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Participant = require('../models/Participant');


router.get('/', async (req, res) => {

    try {

        let participantResults = await Participant.find({});
        res.json(participantResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
