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
const { getDistanceFromLatLonInMi } = require('../../distanceAlgorithm');


describe('Testing the GET /api/clubs/:lat/:long', () => {

    let sampleClubOne;
    let sampleRegion;

    let fakeCity = "AtlantisGetClubByLatLong";
    let fakeLat = 61;
    let fakeLong = -61;

    beforeAll( async () => {

        await Club.deleteOne({ name: "SampleClubNameGetClubByLatLong1" });
        await Region.deleteOne({ cityArea: fakeCity, referenceLat: fakeLat, referenceLong: fakeLong});

        sampleRegion = await Region.create({
            cityArea: fakeCity,
            referenceLat: fakeLat,
            referenceLong: fakeLong
        })

        await sampleRegion.save();

        sampleClubOne = await Club.create({
            name: "SampleClubNameGetClubByLatLong1",
            latitude: 60,
            longitude: -60,
            instaHandle: "@sampleclubname1",
            phoneNumber: 393443333,
            address: "28 Gorska Street",
            website: "www.sampleclubname1.com",
            regionId: new ObjectId(sampleRegion._id),
            representativeId: new ObjectId(),
            stripeAccountNumber: "1234567890asdfgh" 
        });

        await sampleClubOne.save();
    })




    it('Should return a json object which represents the corresponding club', async () => {

        const response = await request(app)
            .get(`/api/clubs/coordinates/${fakeLat}/${fakeLong}`)
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(200);
        expect(JSON.stringify(response.body[0]._id)).toEqual(JSON.stringify(sampleClubOne._id));
        expect(response.body[0].name).toEqual(sampleClubOne.name);
        expect(response.body[0].latitude).toEqual(sampleClubOne.latitude);
        expect(response.body[0].longitude).toEqual(sampleClubOne.longitude);
        expect(response.body[0].instaHandle).toEqual(sampleClubOne.instaHandle);
        expect(response.body[0].phoneNumber).toEqual(sampleClubOne.phoneNumber);
        expect(response.body[0].address).toEqual(sampleClubOne.address);
        expect(response.body[0].website).toEqual(sampleClubOne.website);
        expect(response.body[0].stripeAccountNumber).toEqual(sampleClubOne.stripeAccountNumber);
        expect(JSON.stringify(response.body[0].regionId)).toEqual(JSON.stringify(sampleClubOne.regionId));
        expect(JSON.stringify(response.body[0].representativeId)).toEqual(JSON.stringify(sampleClubOne.representativeId));




    });

    it('Should return a 400 bad request error if the club coordinates entered in the parameter are not valid', async () => {
        
        const response = await request(app)
            .get(`/api/clubs/coordinates/invalid/coordinates`)
            .set('Accept', 'application/json');

        
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('Invalid latitude and longitude values for endpoint');

    });


    it('Should return a valid json object which conforms correctly to the Club model', async () => {
        
        const response = await request(app)
            .get(`/api/clubs/coordinates/${sampleRegion.referenceLat}/${sampleRegion.referenceLong}`) 
            .set('Accept', 'application/json');
        
        expect(response.body[0].hasOwnProperty('name')).toEqual(true);
        expect(response.body[0].hasOwnProperty('latitude')).toEqual(true);
        expect(response.body[0].hasOwnProperty('longitude')).toEqual(true);
        expect(response.body[0].hasOwnProperty('instaHandle')).toEqual(true);
        expect(response.body[0].hasOwnProperty('phoneNumber')).toEqual(true);
        expect(response.body[0].hasOwnProperty('address')).toEqual(true);
        expect(response.body[0].hasOwnProperty('website')).toEqual(true);
        expect(response.body[0].hasOwnProperty('regionId')).toEqual(true);
        expect(response.body[0].hasOwnProperty('stripeAccountNumber')).toEqual(true);
        expect(response.body[0].hasOwnProperty('representativeId')).toEqual(true);




    });

    it('Should verify that a latitude and longitude close to certain region returns the exact number of clubs within that region', async () => {
        let minRegionDistance = 200;
        let nearbyClubCount = 1;

        let regionLatitude = sampleRegion.referenceLat;
        let regionLongitude = sampleRegion.referenceLong;
        let calculatedDistance = getDistanceFromLatLonInMi(sampleClubOne.latitude, sampleClubOne.longitude, regionLatitude, regionLongitude);

        expect(nearbyClubCount).toEqual(1);
        expect(calculatedDistance < minRegionDistance).toBeTruthy();

    });

    afterAll( async () => {

        await Club.deleteOne({ _id: new ObjectId(sampleClubOne.id)});
        await Region.deleteOne({cityArea: "AtlantisGetClubByLatLong"});

        mongoose.connection.close();
    });


});