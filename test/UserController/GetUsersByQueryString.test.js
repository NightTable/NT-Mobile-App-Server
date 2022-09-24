// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Testing the GET /api/users/query/:querystring', () => {

    let sampleSourceUserOne;
    let sampleSourceUserTwo;

    beforeAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUsersByQueryString" });
        await User.deleteOne({ firstName: "JackGetUsersByQueryString" });

        sampleSourceUserOne = await User.create({
            firstName: "JohnGetUsersByQueryString",
            lastName: "NydamGetUsersByQueryString",
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
            role: "consumer",
            customerId: null
        });

        await sampleSourceUserOne.save();

        sampleSourceUserTwo = await User.create({
            firstName: "JackGetUsersByQueryString",
            lastName: "SmithGetUsersByQueryString",
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
            role: "consumer",
            customerId: null

        });

        await sampleSourceUserTwo.save();
    });


    it(`Should return a status code of 200 if the Sample John Nydam user is queried`, async () => {

        const response = await request(app)
            .get(`/api/users/query?name=${sampleSourceUserOne.firstName} ${sampleSourceUserOne.lastName}`)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].name).toEqual('JohnGetUsersByQueryString NydamGetUsersByQueryString');
    });

    it('Should return a status code of 400 if an invalid name is entered', async () => {

        const response = await request(app)
        .get(`/api/users/query?name=notavalidname`)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid input prevented the friend query to be completed");

    });

    it('Should return a status code of 400 if trailing information is invalid', async () => {

        const response = await request(app)
        .get(`/api/users/query?randomtext3847`)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid input prevented the friend query to be completed");

    });

    afterAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUsersByQueryString" });
        await User.deleteOne({ firstName: "JackGetUsersByQueryString" });

        mongoose.connection.close();
    });


}); 