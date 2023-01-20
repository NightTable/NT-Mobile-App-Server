const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const TableConfiguration = require('../models/TableConfiguration');


router.delete('/:tableconfigid', async (req, res) => {

    let tableConfigIdParam = req.params.tableconfigid;

    try {

        await TableConfiguration.deleteOne({ _id: new ObjectId(tableConfigIdParam)});

        res.json({ message: "The table configuration was successfully deleted"});
        return;

    } catch (err) {

        res.status(400).send({ message: "Invalid request - We were not able to delete the table configuration"});
        return;
    }
});



router.put('/:tableconfigid', async (req, res) => {


    let tableConfigIdParam = req.params.tableconfigid;

    let retrievedTableConfigObject = null;

    let typeParam = null;
    let minPriceParam = null;
    let recommendedCapacityParam = null;

    try {

        typeParam = req.body.type;
        minPriceParam = parseInt(req.body.minPrice);
        recommendedCapacityParam = parseInt(req.body.recommendedCapacity);
        const retrievedTableConfigObjectClubIdTempObject = await TableConfiguration.findById(new ObjectId(tableConfigIdParam));
        const retrievedTableConfigObjectClubId = retrievedTableConfigObjectClubIdTempObject.clubId;
        retrievedTableConfigObject = await TableConfiguration.findOneAndUpdate(
            { _id: new ObjectId(tableConfigIdParam) }, 
            {
                type: typeParam,
                minPrice: minPriceParam,
                recommendedCapacity: recommendedCapacityParam,
                clubId: retrievedTableConfigObjectClubId,
            });

        res.json({ message: "The table configuration was successfully updated"});
        return;


    } catch (err) {
        res.status(400).send({ message: "Invalid request -- the table configuration was not able to be updated"});
        return;

    }
    
});


router.get('/club/:clubid', async (req, res) => {
    let cid = 0;
    try {
        cid = req.params.clubid;
    } catch (err) {
        res.status(400).json({ message: "Invalid club id"}); //unexpected token c at position 3
        return;
    }

    if (!(ObjectId.isValid(cid))) {
        res.status(400).json({ message: "Invalid club id values for endpoint"});
        return;
    }
    let config = []
    try {
        config = await TableConfiguration.find({clubId: new ObjectId(req.params.clubid)})
        if (config.length != 0){
            res.json(config)
            return;
        }
        else{
            res.status(200).json({ message: "Configuration doesn't exist"});
            return;
        }

    } catch (err) {
        res.status(200).json({ message: "Configuration doesn't exist"});
        return;
    }

});



router.post('/club/:clubid', async (req, res) => {

    let clubIdParam = req.params.clubid;
    let typeParam = null;
    let minPriceParam = null;
    let recommendedCapacityParam = null;
    let availabilityCountParam = null;

    try {

        typeParam = req.body.type;
        minPriceParam = parseFloat(req.body.minPrice);
        recommendedCapacityParam = parseInt(req.body.recommendedCapacity);
        availabilityCountParam = parseInt(req.body.availabilityCount);

        let newTableConfiguration = null;

        newTableConfiguration = await TableConfiguration.create({
            type: typeParam,
            minPrice: minPriceParam,
            recommendedCapacity: recommendedCapacityParam,
            availabilityCount: availabilityCountParam,
            clubId: clubIdParam
        });

        await newTableConfiguration.save();
        res.json({ message: "The new table configuration was successfully added"});
        return;

    } catch (err) {

        res.status(400).send({ message: `Invalid request -- The specific configuration was not able to be added`});
         return;
    }
});

module.exports = router;
