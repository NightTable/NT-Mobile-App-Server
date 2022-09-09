const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const TableRequestParticipantMapping = require('../models/TableRequestParticipantMapping');


router.get('/', async (req, res) => {

    try {

        let tableRequestParticipantMappingResults = await TableRequestParticipantMapping.find({});
        res.json(tableRequestParticipantMappingResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
