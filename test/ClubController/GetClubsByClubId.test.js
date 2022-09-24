// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated. 

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const Club = require('../../models/Club');
const ObjectId = require('mongodb').ObjectId;

describe('Testing the GET /api/clubs/:clubid endpoint', () => {

    let sampleClubOne;
    let sampleClubTwo;

    beforeAll( async () => {

        await Club.deleteOne({ name: "SampleClubNameGetClubsByClub1" });
        await Club.deleteOne({ name: "SampleClubNameGetClubsByClub2" });

        sampleClubOne = await Club.create({
            name: "SampleClubNameGetClubsByClub1",
            latitude: 938.4,
            longitude: 3093.2,
            instaHandle: "@sampleclubname1",
            phoneNumber: 393443333,
            address: "28 Gorska Street",
            website: "www.sampleclubname1.com",
            regionId: new ObjectId(),
            representativeId: new ObjectId(),
            stripeAccountNumber: "1234567890zxcvbn"  
        });

        await sampleClubOne.save();

        sampleClubTwo = await Club.create({
            name: "SampleClubNameGetClubsByClub2",
            latitude: 938.4,
            longitude: 3093.2,
            instaHandle: "@sampleclubname2",
            phoneNumber: 393443333,
            address: "32 Gorska Street",
            website: "www.sampleclubname2.com",
            regionId: new ObjectId(),
            representativeId: new ObjectId(),
            stripeAccountNumber: "1234567890asdfgh" 
        });

        await sampleClubTwo.save();
    })




    it('Should return a json object which represents the corresponding club', async () => {

        const response = await request(app)
            .get(`/api/clubs/${sampleClubOne.id}`)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual(sampleClubOne.id);
        expect(response.body.name).toEqual('SampleClubNameGetClubsByClub1');


    });

    it('Should return a 400 bad request error if the club id entered in the parameter is not valid', async () => {

        const response = await request(app)
            .get(`/api/clubs/303idudyr48ie4jf`)
            .set('Accept', 'application/json');

        
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('Invalid request - We could not retrieve that specific club');

    });


    it('Should return a valid json object which conforms correctly to the Club model', async () => {
        
        const response = await request(app)
            .get(`/api/clubs/${sampleClubOne.id}`)
            .set('Accept', 'application/json');

        expect(response.body.hasOwnProperty('name')).toEqual(true);
        expect(response.body.hasOwnProperty('latitude')).toEqual(true);
        expect(response.body.hasOwnProperty('longitude')).toEqual(true);
        expect(response.body.hasOwnProperty('instaHandle')).toEqual(true);
        expect(response.body.hasOwnProperty('phoneNumber')).toEqual(true);
        expect(response.body.hasOwnProperty('address')).toEqual(true);
        expect(response.body.hasOwnProperty('website')).toEqual(true);
        expect(response.body.hasOwnProperty('regionId')).toEqual(true);
        expect(response.body.hasOwnProperty('stripeAccountNumber')).toEqual(true);
        expect(response.body.hasOwnProperty('representativeId')).toEqual(true);


    });


    afterAll( async () => {

        await Club.deleteOne({ _id: new ObjectId(sampleClubOne.id)});
        await Club.deleteOne({ _id: new ObjectId(sampleClubTwo.id)});

        mongoose.connection.close();
    });


});