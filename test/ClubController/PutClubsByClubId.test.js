const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const Club = require('../../models/Club');
const ObjectId = require('mongodb').ObjectId;

describe('Testing the PUT /api/clubs/club/:clubid endpoint', () => {


    let sampleClubOne;
    let sampleClubTwo;


    beforeAll( async() => {

        await Club.deleteOne({ name: "SampleClubNamePutClubsByClubId1" });
        await Club.deleteOne({ name: "SampleClubNamePutClubsByClubId2" });

        sampleClubOne = await Club.create({
            name: "SampleClubNamePutClubsByClubId1",
            latitude: 938.4,
            longitude: 3093.2,
            instaHandle: "@sampleclubname1",
            phoneNumber: 393443333,
            address: "28 Gorska Street",
            website: "www.sampleclubname1.com",
            userId: new ObjectId(),
            regionId: new ObjectId() 
        });

        await sampleClubOne.save();

        sampleClubTwo = await Club.create({
            name: "SampleClubNamePutClubsByClubId2",
            latitude: 938.4,
            longitude: 3093.2,
            instaHandle: "@sampleclubname2",
            phoneNumber: 393443333,
            address: "32 Gorska Street",
            website: "www.sampleclubname2.com",
            userId: new ObjectId(),
            regionId: new ObjectId() 
        });

        await sampleClubTwo.save();

    });

    it(`Should return a 400 error if an object is sent that doesn’t
     conform to the Club model, in other words — not all properties are present — r
     eturn a 400 error with the message “Invalid Request —
      User input does not conform to club object”`, async () => {

            const requestClubInputObject = {
                name: "the wisher",
                latitude: 393.33 ,
                longitude: 2.222,
                instaHandle: "@thewisher",
                phoneNumber: 4944434444,
                address: "333 Something Avenue",
                website: "https://www.somethingavnue.com",
            };

            const response = await request(app)
                .put(`/api/clubs/club/${sampleClubOne.id}`)
                .send(requestClubInputObject)
                .set('Accept', 'application/json');
            

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("The specified club was successfully updated");


    });

    it(`Should return a 400 error if an invalid club id is sent in the query parameter`, async () => {

           const requestClubInputObject = {
               name: "the wisher",
               latitude: 393.33 ,
               longitude: 2.222,
               instaHandle: "@thewisher",
               phoneNumber: 4944434444,
               address: "333 Something Avenue",
               website: "https://www.somethingavnue.com",
           };

           const response = await request(app)
               .put(`/api/clubs/club/notrealparameter`)
               .send(requestClubInputObject)
               .set('Accept', 'application/json');
           

       expect(response.status).toEqual(400);
       expect(response.body.message).toEqual("Invalid request -- The club could not be updated");


   });

   it(`Should return a 400 error if a payload with an invalid body is sent over`, async () => {

        const requestClubInputObject = {
            name: "the wisher",
            latitude: 393.33 ,
            longitude: 2.222
        };

        const response = await request(app)
            .put(`/api/clubs/club/notrealparameter`)
            .send(requestClubInputObject)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The club could not be updated");

    });



    afterAll( async () => {

        await Club.deleteOne({ _id: new ObjectId(sampleClubOne.id)});
        await Club.deleteOne({ _id: new ObjectId(sampleClubTwo.id)});

        mongoose.connection.close();
    });


});