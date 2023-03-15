  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Transaction = require('../models/Transaction');


router.get('/', async (req, res) => {

    try {

        let transactionResults = await Transaction.find({});
        res.json(transactionResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
