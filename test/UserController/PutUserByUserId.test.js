// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const request = require('supertest');
const { app } = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/User');
const { ObjectId } = require('bson');

describe('Testing the PUT /api/users/:userid endpoint', () => {

    let sampleUser;

    beforeAll( async() => {

        sampleUser = await User.create({
            firstName: "SamplePutUserByUserId",
            lastName: "UserPutUserByUserId",
            userName: "sampleusername",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: "male",
            email: "sampleuser@gmail.com",
            isProfileSetup: true,
            isIntermediarySetup: false,
            instaHandle: "@sampleuser",
            phoneNumber: 6175884910,
            password: "password",
            role: "consumer"
        });

        await sampleUser.save();
       
    });

    it(`Should return successful response for request to update specific table configuration object`, async () => {

            const requestUserInputObject = {
                    "firstName": "NewPutUserByUserId",
                    "lastName": "UserPutUserByUserId",
                    "userName": "oldusername",
                    "profilePhoto": "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
                    "gender": "female",
                    "email": "olderuser@gmail.com",
                    "isProfileSetup": true,
                    "isIntermediarySetup": false,
                    "instaHandle": "@olduser",
                    "phoneNumber": 6174446666,
                    "password": "mypassword",
                    "role": "consumer"
            };

            const response = await request(app)
                .put(`/api/users/${sampleUser.id}`)
                .send(requestUserInputObject)
                .set('Accept', 'application/json');
            

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("The user was updated");
        
        let firstnameId = await User.findById(new ObjectId(sampleUser))
        let firstname = firstnameId.firstName;
        expect(firstname).toEqual('NewPutUserByUserId');


    });



    it(`Should return a 400 error if an invalid id is presented in the query parameter`, async () => {

        const requestUserInputObject = {
            "firstName": "NewPutUserByUserId",
            "lastName": "UserPutUserByUserId",
            "userName": "oldusername",
            "profilePhoto": "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            "gender": "female",
            "email": "olderuser@gmail.com",
            "isProfileSetup": true,
            "isIntermediarySetup": false,
            "instaHandle": "@olduser",
            "phoneNumber": 6174446666,
            "password": "mypassword",
            "role": "consumer"
    };

        const response = await request(app)
            .put(`/api/users/notarealid`)
            .send(requestUserInputObject)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- the user was not able to be updated");

    });

    it(`Should return a 400 error if the input body is invalid`, async () => {

        const requestUserInputObject = {
            "firstName": "New",
            "lastName": "User",
    };

        const response = await request(app)
            .put(`/api/users/${sampleUser.id}`)
            .send(requestUserInputObject)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- the user was not able to be updated");

    });


    afterAll( async () => {

        await User.deleteOne({ firstName: "SamplePutUserByUserId" });
        await User.deleteOne({ firstName: "NewPutUserByUserId" });

        mongoose.connection.close();
    });


});