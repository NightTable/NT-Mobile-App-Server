const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Room = require('../models/Room');

router.get('/messagechat/:messagechatid', async (req, res) => {


    let messageChatIdParam = req.params.messagechatid;

    try {

        const roomResults = await Room.find({ messageChatId: new ObjectId(messageChatIdParam)});
        res.json(roomResults[0]);

    } catch (err) {

        res.status(400).send({ message: "Invalid input - The requested room assosciated with the message chat id could not be found"});
    }

});

router.get('/tablereq/:tablereqid', async (req, res) => {


    let tableReqIdParam = req.params.tablereqid;

    try {

        const roomResults = await Room.find({ tableReqId: new ObjectId(tableReqIdParam)});
        res.json(roomResults[0]);

    } catch (err) {

        res.status(400).send({ message: "Invalid input - The requested room assosciated with the table request id could not be found"});
    }

});


module.exports = router;
