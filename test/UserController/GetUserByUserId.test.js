// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const request = require('supertest');
const { app } = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Testing the GET /api/users/:userid endpoint', () => {

    let sampleUser;

    beforeAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUserByUserId" });
        
        sampleUser = await User.create({
            firstName: "JohnGetUserByUserId",
            lastName: "NydamGetUserByUserId",
            userName: "jnydam",
            profilePhoto: "somerandomstring",
            email: "jnydam@me.com",
            gender: "male",
            gmail: "testgmaik",
            isProfileSetup: false,
            facebookEmail: "randomemail@facebook.com",
            isIntermediarySetup: true,
            instaHandle: "@something.com",
            phoneNumber: 3093333333,
            password: "hashedpassword",
        });

        await sampleUser.save();

    })

    it(`Should successfully retrieve the user object of valid query and return 
    200 status and be of type object with specified attributes`, async () => {
        const response = await request(app)
            .get(`/api/users/${sampleUser.id}`)
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(200);
        expect(typeof(response.body)).toEqual('object');
        expect(response.body.hasOwnProperty('_id')).toEqual(true);
        expect(response.body.hasOwnProperty('firstName')).toEqual(true);
        expect(response.body.hasOwnProperty('lastName')).toEqual(true);
        expect(response.body.hasOwnProperty('userName')).toEqual(true);
        expect(response.body.hasOwnProperty('profilePhoto')).toEqual(true);
        expect(response.body.hasOwnProperty('gender')).toEqual(true);
        expect(response.body.hasOwnProperty('gmail')).toEqual(true);
        expect(response.body.hasOwnProperty('email')).toEqual(true);
        expect(response.body.hasOwnProperty('isProfileSetup')).toEqual(true);
        expect(response.body.hasOwnProperty('facebookEmail')).toEqual(true);
        expect(response.body.hasOwnProperty('isIntermediarySetup')).toEqual(true);
        expect(response.body.hasOwnProperty('instaHandle')).toEqual(true);
        expect(response.body.hasOwnProperty('phoneNumber')).toEqual(true);
        expect(response.body.hasOwnProperty('password')).toEqual(true);

    });

    it('Should return a 400 error status code if the user id in the query is invalid', async () => {

        const response = await request(app)
        .get(`/api/users/notrealuserid`)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("The requested user was not found");

    });

    afterAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUserByUserId" });
        mongoose.connection.close();
    });


});