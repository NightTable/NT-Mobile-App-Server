// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


const express = require('express');
const Region = require('../models/Region');
const router = express.Router();
const { getDistanceFromLatLonInMi } = require('../distanceAlgorithm');
const Club = require('../models/Club');
const User = require('../models/User');
const {ObjectId} = require('mongodb');


router.put('/club/:clubid', async (req, res) => {

    let clubIdParam = req.params.clubid;

    let nameParam = null;
    let latitudeParam = null;
    let longitudeParam = null;
    let instaHandleParam = null;
    let phoneNumberParam = null;
    let addressParam = null;
    let websiteParam = null;

    try {

        nameParam = req.body.name;
        latitudeParam = parseFloat(req.body.latitude);
        longitudeParam = parseFloat(req.body.longitude);
        instaHandleParam = req.body.instaHandle;
        phoneNumberParam = parseInt(req.body.phoneNumber);
        addressParam = req.body.address;
        websiteParam = req.body.website;

        retrievedClubObject = await Club.findOneAndUpdate(
            { _id: new ObjectId(clubIdParam) },
            {
                name: nameParam,
                latitude: latitudeParam,
                longitude: longitudeParam,
                instaHandle: instaHandleParam,
                phoneNumber: phoneNumberParam,
                address: addressParam,
                website: websiteParam 
            }
        );
        
        res.json({ message: "The specified club was successfully updated"});


    } catch (exception) {

        res.status(400).send({message: "Invalid request -- The club could not be updated"});
        return;
    }

});

router.delete('/club/:clubid', async (req, res) => {

    let clubIdParam = req.params.clubid;

    try {

        await Club.deleteOne({ _id: new ObjectId(clubIdParam)});

        res.json({ message: "The club was successfully deleted from the database"});
        return;

    } catch (err) {

        res.status(400).send({ message: "Invalid request - The club was not able to be deleted from the database"});
        return;
    }

});


router.post('/user/:userid', async (req, res) => {

    const userId = req.params.userid;

    let name = null;
    let latitudeParam = null;
    let longitudeParam = null;
    let instaHandleParam = null;
    let phoneNumberParam = null;
    let addressParam = null;
    let websiteParam = null;
    let regionIdParam = null;
    let representativeIdParam = null;
    let stripeAccountNumberParam = null

    try {

        name = req.body.name;
        latitudeParam = parseFloat(req.body.latitude);
        longitudeParam = parseFloat(req.body.longitude);
        instaHandleParam = req.body.instaHandle;
        phoneNumberParam = parseInt(req.body.phoneNumber);
        addressParam = req.body.address;
        websiteParam = req.body.website;
        regionIdParam = req.body.regionId;
        representativeIdParam = req.body.representativeId;
        stripeAccountNumberParam = req.body.stripeAccountNumber;

        // checkig the case if the user does not put in all the required parameters 

        const allInputsPresent = (
            name !== undefined &&
            latitudeParam !== undefined &&
            longitudeParam !== undefined &&
            instaHandleParam !== undefined &&
            phoneNumberParam !== undefined &&
            addressParam !== undefined &&
            websiteParam !== undefined &&
            regionIdParam !== undefined && 
            representativeIdParam !== undefined &&
            stripeAccountNumberParam !== undefined
        );

        if (!allInputsPresent) {

            res.status(400).send({message: "Invalid request -- The club was not able to be added to the database"});
            return;
    
        } else {
    
    
            // there probably should be a validation check to make sure that the latitude and longitude
            // of the club are indeed within the range constraints/location of the region but that can wait until a little later
            // in development most likely
    
            // this endpoint is used on the web admin panel, so maybe we wnant to do that in browser, we can decide on this later
    
    
            // verifying that the user is of manager role
    
            const userObject = await User.findById(new ObjectId(userId));
    
            const newClubObject = await Club.create({
                name: name,
                latitude: latitudeParam,
                longitude: longitudeParam,
                instaHandle: instaHandleParam,
                phoneNumber: phoneNumberParam,
                address: addressParam,
                website: websiteParam,
                regionId: new ObjectId(regionIdParam),
                representativeId: new ObjectId(representativeIdParam),
                stripeAccountNumber: stripeAccountNumberParam
            });
            
            await newClubObject.save();
    
            res.json({
                message: "The club was successfully added to the database"
            });
            return;
    

        }

    } catch (exception) {
        res.status(400).send({message: "Invalid request -- The club was not able to be added to the database"});
        return;
    }
});


router.get('/:clubid', async (req, res) => {

    let clubId = req.params.clubid;

    let retrievedClubObject = null;
    
    try {

        retrievedClubObject = await Club.findById(new ObjectId(clubId));
        res.json(retrievedClubObject);
        return;

    } catch (err) {

        res.status(400).send({message: "Invalid request - We could not retrieve that specific club"});
        return;

    }

});


router.get('/coordinates/:lat/:long', async (req, res) => {

    // comment to establish commit

    let clientLatitude = 0;
    let clientLongitude = 0;

    try {

        clientLatitude = parseFloat(req.params.lat);
        clientLongitude = parseFloat(req.params.long);

    } catch (err) {

        res.status(400).json({ message: "Invalid latitude and longitude values for endpoint"});
        return;
    }

    if (isNaN(clientLatitude) || isNaN(clientLongitude)) {
        res.status(400).json({ message: "Invalid latitude and longitude values for endpoint"});
        return;
    }

    let regionObjects = await Region.find({});

    let minRegionDistance = 200;
    let minRegionObjectInformation = null;

    for (let i = 0; i < regionObjects.length; i++) {

        let regionObjectLocal = regionObjects[i];

        let regionLatitude = regionObjectLocal.referenceLat;
        let regionLongitude = regionObjectLocal.referenceLong;

        let calculatedDistance = getDistanceFromLatLonInMi(clientLatitude, clientLongitude, regionLatitude, regionLongitude);

        if (calculatedDistance < minRegionDistance) {
            minRegionObjectInformation = {}
            minRegionDistance = calculatedDistance;
            minRegionObjectInformation.cityName = regionObjectLocal.cityArea;
            minRegionObjectInformation.id = regionObjectLocal.id;
        }

    }
    
    if (minRegionObjectInformation === null) {
        res.status(200).json({ message: "There were no clubs found with the specified parametes"});
        return;
    } else {

        let localClubs = await Club.find({ regionId: minRegionObjectInformation.id});

        res.json(localClubs);

    }
});


module.exports = router;
