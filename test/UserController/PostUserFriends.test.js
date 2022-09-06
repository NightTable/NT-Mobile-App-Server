// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const request = require('supertest');
const { app } = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/User');
const { ObjectId } = require('mongodb');
const UserFriendMapping = require('../../models/UserFriendMapping');

describe('Testing the POST /api/users/friends endpoint', () => {

    let sampleUserOne;
    let sampleUserTwo;
    let sampleUserThree;

    beforeAll( async() => {

        sampleUserOne = await User.create({
            firstName: "SamplePostUserFriendOne",
            lastName: "SamplePostUserFriendOne Last",
            userName: "samplepostuserfriendone",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: "male",
            email: "samplepostuserfriendone@gmail.com",
            isProfileSetup: true,
            isIntermediarySetup: false,
            instaHandle: "@samplepostuserfriendone",
            phoneNumber: 6175884910,
            password: "password",
            role: "consumer"
        });

        await sampleUserOne.save();

        sampleUserTwo = await User.create({
            firstName: "SamplePostUserFriendTwo",
            lastName: "SamplePostUserFriendTwo Last",
            userName: "samplepostuserfriendtwo",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: "male",
            email: "samplepostuserfriendtwo@gmail.com",
            isProfileSetup: true,
            isIntermediarySetup: false,
            instaHandle: "@samplepostuserfriendtwo",
            phoneNumber: 6175884910,
            password: "password",
            role: "consumer"
        });

        await sampleUserTwo.save();


        sampleUserThree = await User.create({
            firstName: "SamplePostUserFriendThree",
            lastName: "SamplePostUserFriendThree Last",
            userName: "samplepostuserfriendThree",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: "male",
            email: "samplepostuserfriendthree@gmail.com",
            isProfileSetup: true,
            isIntermediarySetup: false,
            instaHandle: "@samplepostuserfriendthree",
            phoneNumber: 6175884910,
            password: "password",
            role: "consumer"
        });

        await sampleUserThree.save();
       
    });


    it(`Should return a 400 error if an invalid id is presented in the request body`, async () => {

        const requestBody = {
            "sourceUserId": "notavalidid",
            "targetUserId": "notavalidid2"
        }

        const response = await request(app)
            .post(`/api/users/friends`)
            .send(requestBody)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);

    });


    it(`Should return status 200 if request is correct, and confirm that the new UserFriendMapping is 
    created in the database and that the complimentary relationship showing the opposite 
    friend relationship is also created`, async () => {

        const requestBody = {
            "sourceUserId": sampleUserOne._id,
            "targetUserId": sampleUserTwo._id
        }

        const response = await request(app)
            .post(`/api/users/friends`)
            .send(requestBody)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);


        const sourceQuery = await UserFriendMapping.find({ sourceId: sampleUserOne.id, targetId: sampleUserTwo.id });
        const targetQuery = await UserFriendMapping.find({ targetId: sampleUserOne.id, sourceId: sampleUserTwo.id });

        expect(sourceQuery.length).toEqual(1);
        expect(targetQuery.length).toEqual(1);

        await UserFriendMapping.deleteOne({ id: sourceQuery[0].id });
        await UserFriendMapping.deleteOne({ id: targetQuery[0].id });
       
    });

    it(`Should not allow for duplicate friend relations to be created`, async() => {

        const requestBody = {
            "sourceUserId": sampleUserOne._id,
            "targetUserId": sampleUserThree._id
        }

        const response = await request(app)
            .post(`/api/users/friends`)
            .send(requestBody)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);

        const responseTwo = await request(app)
            .post(`/api/users/friends`)
            .send(requestBody)
            .set('Accept', 'application/json');

        expect(responseTwo.status).toEqual(400);

        const sourceQuery = await UserFriendMapping.find({ sourceId: sampleUserOne.id, targetId: sampleUserThree.id });
        const targetQuery = await UserFriendMapping.find({ sourceId: sampleUserThree.id, targetId: sampleUserOne.id });

        await UserFriendMapping.deleteOne({ id: sourceQuery[0].id });
        await UserFriendMapping.deleteOne({ id: targetQuery[0].id });
        
        
    });


    afterAll( async () => {

        await User.deleteOne({ firstName: sampleUserOne.firstName });
        await User.deleteOne({ firstName: sampleUserTwo.firstName });
        await User.deleteOne({ firstName: sampleUserThree.firstName });

        mongoose.connection.close();
    });


});