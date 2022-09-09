const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Room = require('../models/Room');


router.get('/', async (req, res) => {

    try {

        let roomResults = await Room.find({});
        res.json(roomResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
