  

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../models/User');
const UserFriendMapping = require('../../models/UserFriendMapping');

describe('Testing the GET /api/users/friends/:userid', () => {

    let sampleSourceUser;

    let sampleFriendOne;
    let sampleFriendTwo;
    let sampleFriendThree;

    beforeAll( async () => {

        await User.deleteOne({ firstName: "JohnGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendOneGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendTwoGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendThreeGetFriendsByUserId" });

        sampleSourceUser = await User.create({
            firstName: "JohnGetFriendsByUserId",
            lastName: "NydamGetFriendsByUserId",
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

        await sampleSourceUser.save();

        sampleFriendOne = await User.create({
            firstName: "SampleFriendOneGetFriendsByUserId",
            lastName: "SampleFriendOneNydamGetFriendsByUserId",
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

        await sampleFriendOne.save();

        sampleFriendTwo = await User.create({
            firstName: "SampleFriendTwoGetFriendsByUserId",
            lastName: "SampleFriendTwoNydamGetFriendsByUserId",
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

        await sampleFriendTwo.save();

        sampleFriendThree = await User.create({
            firstName: "SampleFriendThreeGetFriendsByUserId",
            lastName: "SampleFriendThreeNydamGetFriendsByUserId",
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

        await sampleFriendThree.save();


        let mappingOne = await UserFriendMapping.create({
            sourceId: sampleSourceUser.id,
            targetId: sampleFriendOne.id
        });

        await mappingOne.save();

        let mappingTwo = await UserFriendMapping.create({
            sourceId: sampleSourceUser.id,
            targetId: sampleFriendTwo.id
        });

        await mappingTwo.save();

        let mappingThree = await UserFriendMapping.create({
            sourceId: sampleSourceUser.id,
            targetId: sampleFriendThree.id
        });

        await mappingThree.save();

    });


    it(`Should return a status code of 200 among successful retrieval of 
    a friend list of a valid user query parameter`, async () => {

        const response = await request(app)
            .get(`/api/users/friends/${sampleSourceUser.id}`)
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(3);
        expect(response.body[0].name).toEqual('SampleFriendOneGetFriendsByUserId SampleFriendOneNydamGetFriendsByUserId');
        expect(response.body[1].name).toEqual('SampleFriendTwoGetFriendsByUserId SampleFriendTwoNydamGetFriendsByUserId');
        expect(response.body[2].name).toEqual('SampleFriendThreeGetFriendsByUserId SampleFriendThreeNydamGetFriendsByUserId');
    });

    it('Should be reflected that an element in the array response only has 2 properties', async () => {

        const response = await request(app)
        .get(`/api/users/friends/${sampleSourceUser.id}`)
        .set('Accept', 'application/json');

        expect(Object.keys(response.body[0]).length).toEqual(2);

    });

    it('Should return an error code of status 400 if the user parameter is invalid', async () => {


        const response = await request(app)
            .get(`/api/users/friends/notvalidfriendid`)
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid input prevented any friends from being returned");
    });

    afterAll( async () => {

        await User.deleteOne({ firstName: "JohnGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendOneGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendTwoGetFriendsByUserId" });
        await User.deleteOne({ firstName: "SampleFriendThreeGetFriendsByUserId" });

        mongoose.connection.close();
    });


});