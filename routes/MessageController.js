// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


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