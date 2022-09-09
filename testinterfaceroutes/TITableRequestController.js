const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const TableRequest = require('../models/TableRequest');


router.get('/', async (req, res) => {

    try {

        let tableRequestResults = await TableRequest.find({});
        res.json(tableRequestResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
