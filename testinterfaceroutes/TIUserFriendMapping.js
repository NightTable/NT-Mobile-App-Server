  


const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const UserFriendMapping = require('../models/UserFriendMapping');


router.get('/', async (req, res) => {

    try {

        let userFriendMappingResults = await UserFriendMapping.find({});
        res.json(userFriendMappingResults);

    } catch (err) {

        res.status(400).send({ message: "Test interface didn't like the response"});
    }

});


module.exports = router;
