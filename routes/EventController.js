const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Event = require('../models/Event');


router.delete('/club/:eventId', async (req, res) => {
    try {
        let eventId = req.params.eventId;
        const eventResults = await Event.findOneAndUpdate({ _id: eventId, isDeleted: false},{isDeleted:true}, {new : true});
        if(!eventResults) return res.status(400).send({status: false, message: "No events found"});
        return res.status(200).send({status: true, message: "successfull deleted"});
    } catch (err) {
        return res.status(500).send({ message:err.message});
    }

});

router.get('/club/:clubid', async (req, res) => {
    try {
        let clubId = req.params.clubid;
        const eventResults = await Event.find({ clubId: clubId, isDeleted: false});
        if(!eventResults.length) return res.status(400).send({status: false, message: "No events found for the club"});
        return res.status(200).send({status: true, message: "success", data: eventResults});
    } catch (err) {
        return res.status(500).send({ message: "Invalid request - were not able to retreive event information from the given club"});
    }
});


// router.post('/club/:clubid', async (req, res) => {
//     const clubIdParam = req.params.clubid;

//     let nameParam = null;
//     let picParam = null;
//     let dateParam = null;
//     let timeParam = null;
//     let ticketLinkParam = null;

//     try {

//         nameParam = req.body.name;
//         picParam = req.body.picture;
//         dateParam = req.body.eventDate;
//         timeParam = req.body.eventTime;
//         ticketLinkParam = req.body.ticketLink;

//     } catch (err) {
//         res.status(400).send({ message: `Invalid request -- We were unable to create a new event`});
//         return;

//     }


//     let newEvent = null;

//     try {

//         newEvent = await Event.create({
//             name: nameParam,
//             picture: picParam,
//             eventDate: dateParam,
//             eventTime: timeParam,
//             ticketLink: ticketLinkParam,
//             clubId: clubIdParam
//         });
    
//         await newEvent.save();
//         res.json({ message: "The event was successfully added"});
//         return;

//     } catch (err) {
//         res.status(400).send({ message: `Invalid request -- We were unable to create a new event`});
//         return;
//     }
// });

module.exports = router;
