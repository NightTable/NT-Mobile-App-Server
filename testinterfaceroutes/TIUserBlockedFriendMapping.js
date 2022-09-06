// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


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
