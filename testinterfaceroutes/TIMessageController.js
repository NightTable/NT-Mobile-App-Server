const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Message = require('../models/Message');


router.get('/', async (req, res) => {

    try {

        let messageResults = await Message.find({});
        res.json(messageResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
