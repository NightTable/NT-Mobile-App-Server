// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


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
