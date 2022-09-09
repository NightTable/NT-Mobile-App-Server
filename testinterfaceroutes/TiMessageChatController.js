const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const MessageChat = require('../models/MessageChat');


router.get('/', async (req, res) => {

    try {

        let messageChatResults = await MessageChat.find({});
        res.json(messageChatResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
