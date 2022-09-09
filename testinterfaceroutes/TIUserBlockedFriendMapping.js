const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const UserBlockedFriendMapping = require('../models/UserBlockedFriendMapping');


router.get('/', async (req, res) => {

    try {

        let userBlockedFriendMappingResults = await UserBlockedFriendMapping.find({});
        res.json(userBlockedFriendMappingResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
