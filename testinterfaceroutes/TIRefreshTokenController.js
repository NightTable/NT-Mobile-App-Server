const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const RefreshToken = require('../models/RefreshToken');


router.get('/', async (req, res) => {

    try {

        let refreshTokenResults = await RefreshToken.find({});
        res.json(refreshTokenResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
