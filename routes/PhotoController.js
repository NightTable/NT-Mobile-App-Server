const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Photo = require('../models/Photo');

router.get('/club/:clubid', async (req, res) => {


    let clubIdParam = req.params.clubid;

    try {

        const clubPhotoResults = await Photo.find({ clubId: new ObjectId(clubIdParam)});
        res.json(clubPhotoResults);

    } catch (err) {

        res.status(400).send({ message: "Invalid input - The requested club photos could not be retrieved"});
    }

});


module.exports = router;
