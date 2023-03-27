  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const TableConfiguration = require('../models/TableConfiguration');


router.get('/', async (req, res) => {

    try {

        let tableConfigurationResults = await TableConfiguration.find({});
        res.json(tableConfigurationResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
