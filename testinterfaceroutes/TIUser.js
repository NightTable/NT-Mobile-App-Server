const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {

    try {

        let userResults = await User.find({});
        res.json(userResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
