  

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Testing the GET /api/users/name/:name', () => {

    let sampleSourceUserOne;
    let sampleSourceUserTwo;

    beforeAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUsersByName" });
        await User.deleteOne({ firstName: "JackGetUsersByName" });

        sampleSourceUserOne = await User.create({
            firstName: "JohnGetUsersByName",
            lastName: "NydamGetUsersByName",
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

        await sampleSourceUserOne.save();

        sampleSourceUserTwo = await User.create({
            firstName: "JackGetUsersByName",
            lastName: "SmithGetUsersByName",
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

        await sampleSourceUserTwo.save();
    });

    it(`Should return a status code of 200 if both users are present`, async () => {

        const responseSampleSourceUserOneFirstName = await request(app)
            .get(`/api/users/name/${sampleSourceUserOne.firstName}`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserOneLastName = await request(app)
            .get(`/api/users/name/${sampleSourceUserOne.lastName}`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserOnePartialFirstName = await request(app)
            .get(`/api/users/name/John`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserOnePartiaLastName = await request(app)
            .get(`/api/users/name/Nydam`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserOneFirstNameLastName = await request(app)
            .get(`/api/users/name/${sampleSourceUserOne.firstName + " " + sampleSourceUserOne.lastName}`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserTwoFirstName = await request(app)
            .get(`/api/users/name/${sampleSourceUserTwo.firstName}`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserTwoLastName = await request(app)
            .get(`/api/users/name/${sampleSourceUserTwo.lastName}`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserTwoPartialFirstName= await request(app)
            .get(`/api/users/name/Jack`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserTwoPartialLastName= await request(app)
            .get(`/api/users/name/Smith`)
            .set('Accept', 'application/json');
        const responseSampleSourceUserTwoFirstNameLastName = await request(app)
            .get(`/api/users/name/${sampleSourceUserTwo.firstName + " " + sampleSourceUserTwo.lastName}`)
            .set('Accept', 'application/json');

        expect(responseSampleSourceUserOneFirstName.status).toEqual(200);
        expect(responseSampleSourceUserOneLastName.status).toEqual(200); 
        expect(responseSampleSourceUserOneFirstNameLastName.status).toEqual(200);
        expect(responseSampleSourceUserTwoFirstName.status).toEqual(200);
        expect(responseSampleSourceUserTwoLastName.status).toEqual(200);
        expect(responseSampleSourceUserTwoFirstNameLastName.status).toEqual(200);
        expect(responseSampleSourceUserOnePartialFirstName.status).toEqual(200);
        expect(responseSampleSourceUserOnePartiaLastName.status).toEqual(200);
        expect(responseSampleSourceUserTwoPartialFirstName.status).toEqual(200);
        expect(responseSampleSourceUserTwoPartialLastName.status).toEqual(200);







    });

    it('Should return a status code of 400 if an invalid name is entered', async () => {

        const response = await request(app)
        .get(`/api/users/name/notavalidname`)
        .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- The requested user with the given name could not be found");

    });

    it('Should return a status code of 400 if trailing information is invalid', async () => {

        const response = await request(app)
        .get(`/api/users/name/`)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("The requested user was not found");

    });

    afterAll( async () => {

        await User.deleteOne({ firstName: "JohnGetUsersByName" });
        await User.deleteOne({ firstName: "JackGetUsersByName" });

        mongoose.connection.close();
    });


}); 