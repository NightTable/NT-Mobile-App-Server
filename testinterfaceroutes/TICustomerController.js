const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {

    try {

        let customerResults = await Customer.find({});
        res.json(customerResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});

router.post('/', async (req, res) => {


});

router.put('/:customerid', async (req, res) => {


});

router.delete('/:customerid', async (req, res) => {


});


module.exports = router;
