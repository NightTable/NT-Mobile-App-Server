// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const TableConfiguration = require('../../models/TableConfiguration');
const ObjectId = require('mongodb').ObjectId;

describe('Testing the POST /api/tableconfigurations/club/:clubId endpoint', () => {



    let cid = new ObjectId();

    beforeAll( async() => {
        await TableConfiguration.deleteOne(
            {
                type: "dj",
                minPrice: 10000,
                recommendedCapacity: 4,
                availabilityCount: 2,
                clubId: cid
            }
        );

        validTC = await TableConfiguration.create({
            type: "dj",
            minPrice: 10000,
            recommendedCapacity: 4,
            availabilityCount: 2,
            clubId: cid
        })
        await validTC.save();
    });

    it(`returns a 400 error with the message “Invalid Request — User input does not conform to table configuration object`, async () => {
        const truncatedTCInputObject = {
            type: "dj",
            minPrice: 10000,
        }
        const response = await request(app)
            .post(`/api/tableconfigurations/club/${cid}`)
            .send(truncatedTCInputObject)
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The specific configuration was not able to be added");
    });

    it(`Should return a successful 200 status code message stating
        that the table configuration was successfully created`, async () => {

        const requestTCInputObject = {
            type: "Owner",
            minPrice: 100000,
            recommendedCapacity: 4,
            availabilityCount: 1,
            clubId: cid
        }

        const response = await request(app)
            .post(`/api/tableconfigurations/club/${cid}`)
            .send(requestTCInputObject)
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200); 
        expect(response.body.message).toEqual("The new table configuration was successfully added");
    });

    it('Should return a 400 status if a duplicate table configuration is entered into the database', async () => {

        const requestTCInputObject = {
            type: "dj",
            minPrice: 10000,
            recommendedCapacity: 4,
            availabilityCount: 2,
            clubId: cid
        }

        const response = await request(app)
            .post(`/api/tableconfigurations/club/${cid}`)
            .send(requestTCInputObject)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The specific configuration was not able to be added");
    });

    it('Should appear that the table configuration object is represented and added into the database', async () => {
        const addedTCObject = await TableConfiguration.find({type: "dj", minPrice: 10000, recommendedCapacity: 4,});
        expect(addedTCObject[0].type).toEqual("dj");
        expect(addedTCObject[0].minPrice).toEqual(10000);
        expect(addedTCObject[0].recommendedCapacity).toEqual(4);
        expect(addedTCObject[0]).toBeDefined();

    });

    it('Should return a 400 if an invalid clubid is entered into the parameter', async () => {

        const requestTCInputObject = {
            type: "dj",
            minPrice: 100000,
            recommendedCapacity: 4,
            availabilityCount: 2,
            clubId: new ObjectId()
        }
        const response = await request(app)
            .post(`/api/tableconfigurations/club/invalidclubid`)
            .send(requestTCInputObject)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The specific configuration was not able to be added");

    });




    afterAll( async () => {
        await TableConfiguration.deleteOne(
            {
                type: "dj",
                minPrice: 10000,
                recommendedCapacity: 4,
                availabilityCount: 2,
                clubId: cid
            }
        );
        await TableConfiguration.deleteOne({type: "Owner",});        
        mongoose.connection.close();
    });


}); 