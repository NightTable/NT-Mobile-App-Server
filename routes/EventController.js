const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Event = require('../models/Event');


router.delete('/club/:eventId', async (req, res) => {

    let eventIdParam = req.params.eventId;

    try {

        await Event.deleteOne({ _id: new ObjectId(eventIdParam)});
        res.json({ message: "Event was successfully removed." });
        return;


    } catch (err) {

        res.status(400).send({ message: "Invalid request - We were not able to remove the event"});
        return;
    }

});

router.get('/club/:clubid', async (req, res) => {

    let clubIdParam = req.params.clubid;

    try {

        const eventResults = await Event.find({ clubId: new ObjectId(clubIdParam) }).limit(30);
        res.json(eventResults);
        return;

    } catch (err) {

        res.status(400).send({ message: "Invalid request - were not able to retreive event information from the given club"});
        return;
    }
});


router.post('/club/:clubid', async (req, res) => {
    const clubIdParam = req.params.clubid;

    let nameParam = null;
    let picParam = null;
    let dateParam = null;
    let timeParam = null;
    let ticketLinkParam = null;

    try {

        nameParam = req.body.name;
        picParam = req.body.picture;
        dateParam = req.body.eventDate;
        timeParam = req.body.eventTime;
        ticketLinkParam = req.body.ticketLink;

    } catch (err) {
        res.status(400).send({ message: `Invalid request -- We were unable to create a new event`});
        return;

    }


    let newEvent = null;

    try {

        newEvent = await Event.create({
            name: nameParam,
            picture: picParam,
            eventDate: dateParam,
            eventTime: timeParam,
            ticketLink: ticketLinkParam,
            clubId: clubIdParam
        });
    
        await newEvent.save();
        res.json({ message: "The event was successfully added"});
        return;

    } catch (err) {
        res.status(400).send({ message: `Invalid request -- We were unable to create a new event`});
        return;
    }
});

module.exports = router;
