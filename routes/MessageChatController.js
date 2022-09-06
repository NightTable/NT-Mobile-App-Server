// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const MessageChat = require('../models/MessageChat');
const Room = require('../models/Room');

router.get('/:generaluserid', async (req, res) => {

    const generalUserIdParam = req.params.generaluserid;

    try {

        let messageChatResultList = [];

        const messageChatResultFromSource = await MessageChat.find({ sourceUserId: new ObjectId(generalUserIdParam) }).populate('targetUserId').limit(30);
        messageChatResultList = messageChatResultList.concat(messageChatResultFromSource);

        const messageChatResultFromTarget = await MessageChat.find({ targetUserId: new ObjectId(generalUserIdParam) }).populate('sourceUserId').limit(30);
        messageChatResultList = messageChatResultList.concat(messageChatResultFromTarget);

        res.json(messageChatResultList);

    } catch (err) {

        res.status(400).send({ message: "Invalid request - were not able to retrieve message chats"});
    }
});

router.delete('/:messagechatid', async (req, res) => {

    const messageChatId = req.params.messagechatid;

    try {

        await MessageChat.deleteOne({ id: new ObjectId(messageChatId)});
        res.send({ message: "The message chat object was successfully deleted"});


    } catch (err) {

        res.status(400).send({ message: "Invalid request -- The message chat object could not be deleted"});
    }


});



router.post('/', async (req, res) => {


    let sourceUserIdParam = req.body.sourceUserId;
    let targetUserIdParam = req.body.targetUserId;

    try {

        const newMessageChatObj = await MessageChat.create({
            sourceUserId: new ObjectId(sourceUserIdParam),
            targetUserId: new ObjectId(targetUserIdParam),
            isUnRead: false,
            lastMessage: null,
            isSourceDeleted: false,
            isTargetDeleted: false
        });
    
        await newMessageChatObj.save();

        const associatedRoom = await Room.create({
            tableReqId: null,
            messageChatId: newMessageChatObj.id
        });

        await associatedRoom.save();
        
        res.json(newMessageChatObj);

    } catch (err) {

        console.log(err);

        res.status(400).send({ message: "Invalid request - The message chat object could not be created" }); 
    }

});



module.exports = router;
