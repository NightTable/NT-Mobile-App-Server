const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Message = require('../models/Message');


router.get('/:messageChatId/', async (req, res) => {
    let messageChatIdParam = req.params.messageChatId;


    try {
        let messages = await Message.find({"messageChatId": new ObjectId(messageChatIdParam)}).sort({"createdAt": 1});
        res.json(messages);
        return;
    } catch (error) {
        res.status(400).send({ message: "Invalid request - the messages could not be retrieved"});
        return;
    }
})

module.exports = router;