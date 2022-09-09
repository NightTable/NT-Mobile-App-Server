const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const Club = require('../../models/Club');
const ObjectId = require('mongodb').ObjectId;

describe('Testing the DELETE /api/clubs/club/:clubid endpoint', () => {

    let sampleClubOne;
    let sampleClubTwo;

    beforeAll( async () => {

        await Club.deleteMany({ name: "SampleClubNameDeleteClubByClub1" });
        await Club.deleteMany({ name: "SampleClubNameDeleteClubByClub2" });

        sampleClubOne = await Club.create({
            name: "SampleClubNameDeleteClubByClub1",
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
            name: "SampleClubNameDeleteClubByClub2",
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
    })


    it('Should return a 400 error if an invalid id parameter is put into the query string', async () => {

        const response = await request(app)
            .delete(`/api/clubs/club/notarealclubid`)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request - The club was not able to be deleted from the database");

    });

    it('Should delete a club object from the database such that the club object is not present anymore', async() => {


        const response = await request(app)
            .delete(`/api/clubs/club/${sampleClubOne.id}`)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);

        let queriedClubResultOne = await Club.find({ _id: sampleClubOne.id });
        expect(queriedClubResultOne.length).toEqual(0);

        let queriedClubResultTwo = await Club.find({ _id: sampleClubTwo.id });
        expect(queriedClubResultTwo.length).toEqual(1);

    
    })


    afterAll( async () => {

        await Club.deleteOne({ _id: new ObjectId(sampleClubOne.id)});
        await Club.deleteOne({ _id: new ObjectId(sampleClubTwo.id)});

        mongoose.connection.close();
    });


});