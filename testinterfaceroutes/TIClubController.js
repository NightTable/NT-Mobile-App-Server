  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Club = require('../models/Club');

router.get('/', async (req, res) => {

    try {

        let clubResults = await Club.find({});
        res.json(clubResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});

router.post('/', async (req, res) => {


});

router.put('/:clubid', async (req, res) => {


});

router.delete('/:clubid', async (req, res) => {


});


module.exports = router;
