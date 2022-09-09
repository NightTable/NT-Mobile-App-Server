const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const TableReqCustomPriceAgreementMapping = require('../models/TableReqCustomPriceAgreementMapping');


router.get('/', async (req, res) => {

    try {

        let tableReqCustomPriceAgreementMappingResults = await TableReqCustomPriceAgreementMapping.find({});
        res.json(tableReqCustomPriceAgreementMappingResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
