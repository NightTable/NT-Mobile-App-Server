
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
const Region = require('../../models/Region');
const User = require('../../models/User');
const Representative = require('../../models/Representative');

describe('Testing the POST /api/clubs/user/:userid endpoint', () => {


    let sampleRegion;
    let sampleUser;
    let sampleRepresentative; 
    let sampleClub;


    beforeAll( async() => {

        await Club.deleteOne({ name: "the wisher" });
        await Region.deleteOne({ cityArea: "FakeMiamiPostClubsByUser" });
        await User.deleteOne({ userName: "dummyPostUserClubNamePostClubsByUser" });
        await Representative.deleteOne({firstName: "PostSample"});

        sampleUser = await User.create({
            firstName: "PostUserClubFirstName",
            lastName: "PostUserClubLastName",
            userName: "dummyPostUserClubNamePostClubsByUser",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: "male",
            email: "dummypostuserclub@gmail.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@sampleclubpostuser",
            phoneNumber: 3933333333,
            password: "password",
        });
        await sampleUser.save();

        sampleRegion = await Region.create({
            cityArea: "PostClubsByUserFakeMiami",
            referenceLat: 39.333,
            referenceLong: 202.33
        });
        await sampleRegion.save();

        sampleRepresentative = await Representative.create({
            firstName: "PostUserClubSample",
            lastName: "PostUserClubManager",
            email: "samplemanager@sampleclub.com",
            phoneNumber: "6173445544",
            password: "sampleManagersPassword",
            username: "sampleManagerUsername",
            isVerified: true,
            clubId: new ObjectId(),
            role: 'management'
        });
        await sampleRepresentative.save()

        sampleClub = await Club.create({
            name: "PostClubByUser Sample Club",
            latitude: 393.33 ,
            longitude: 2.222,
            instaHandle: "@thesampleclub",
            phoneNumber: 4944434444,
            address: "333 Something Else Avenue",
            website: "https://www.thesampleclub.com",
            regionId: sampleRegion.id,
            representativeId: sampleRepresentative._id,
            stripeAccountNumber: "1234567890qwerty"  
        });
        await sampleClub.save();
        sampleRepresentative.clubId = sampleClub._id;
        await sampleRepresentative.save()
    });

    it(`Should return a successful 200 status code message stating
        that the club was successfully created`, async () => {

        const requestClubInputObject = {
            name: "the wisher",
            latitude: 393.33 ,
            longitude: 2.222,
            instaHandle: "@thewisher",
            phoneNumber: 4944434444,
            address: "333 Something Avenue",
            website: "https://www.somethingavnue.com",
            regionId: sampleRegion.id,
            representativeId: new ObjectId(),
            stripeAccountNumber: "1234567890zxcvbn"  
        }

        const response = await request(app)
            .post(`/api/clubs/user/${sampleUser.id}`)
            .send(requestClubInputObject)
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("The club was successfully added to the database");
    });

    it('Should return a 400 status if a duplicate club is entered into the database', async () => {

        const requestClubInputObject = {
            name: "the wisher",
            latitude: 393.33 ,
            longitude: 2.222,
            instaHandle: "@thewisher",
            phoneNumber: 4944434444,
            address: "333 Something Avenue",
            website: "https://www.somethingavnue.com",
            regionId: sampleRegion.id
        }

        const response = await request(app)
            .post(`/api/clubs/user/${sampleUser.id}`)
            .send(requestClubInputObject)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The club was not able to be added to the database");

    });

    it('Should appear that the club object is represented and added into the database', async () => {


        const addedClubObject = await Club.find({name: "the wisher"});

        expect(addedClubObject).toBeDefined();

    });

    it('Should return a 400 if an invalid userid is entered into the parameter', async () => {

        const requestClubInputObject = {
            name: "the wisher",
            latitude: 393.33 ,
            longitude: 2.222,
            instaHandle: "@thewisher",
            phoneNumber: 4944434444,
            address: "333 Something Avenue",
            website: "https://www.somethingavnue.com",
            regionId: sampleRegion.id
        }

        const response = await request(app)
            .post(`/api/clubs/user/notavaliduserinput`)
            .send(requestClubInputObject)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The club was not able to be added to the database");

    });

    it('Should return a 400 if not all the required information is present in the request', async () => {


        const truncatedClubInputObject = {
            name: "the wisher",
            latitude: 393.33 ,
            longitude: 2.222,
            instaHandle: "@thewisher",
            phoneNumber: 4944434444
        }

        const response = await request(app)
            .post(`/api/clubs/user/${sampleUser.id}`)
            .send(truncatedClubInputObject)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The club was not able to be added to the database");

    });


    afterAll( async () => {

        await Club.deleteOne({ _id: new Object(sampleClub.id) });
        await Region.deleteOne({ _id: new ObjectId(sampleRegion.id)});
        await User.deleteOne({ _id: new ObjectId(sampleUser.id)});
        await Representative.deleteOne({_id: new ObjectId(sampleRepresentative.id)})

        mongoose.connection.close();
    });


});