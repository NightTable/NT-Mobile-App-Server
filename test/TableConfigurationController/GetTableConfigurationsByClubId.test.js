const request = require('supertest');
const { app } = require('../../server');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const TableConfig = require('../../models/TableConfiguration');

describe('Testing the GET /api/tableconfigurations/club/:clubId endpoint', () => {

    let sampleTC;

    beforeAll( async () => {

        await TableConfig.deleteOne({ type: "djGetTableConfigByTableConfigId", price: 10000, size: 5 });
        
        sampleTC = await TableConfig.create({
            type: "djGetTableConfigByTableConfigId",
            price: 10000,
            size: 5,
            availabilityCount: 2,
            clubId: new ObjectId(),
        });
        await sampleTC.save();

    })

    it('Should return a json object which represents the corresponding table configuration', async () => {
        const response = await request(app)
            .get(`/api/tableconfigurations/club/${sampleTC.clubId}`)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(200);
        expect(response.body[0]._id).toEqual(sampleTC.id);
        expect(response.body[0].type).toEqual('djGetTableConfigByTableConfigId');
        expect(response.body[0].price).toEqual(10000);
        expect(response.body[0].size).toEqual(5);
        expect(response.body[0].availabilityCount).toEqual(2);
        expect(JSON.stringify(response.body[0].clubId)).toEqual(JSON.stringify(new ObjectId(sampleTC.clubId)));
    });

    it('Should return a 400 bad request error if the club id entered in the parameter is not valid', async () => {
        const response = await request(app)
            .get(`/api/tableconfigurations/club/invalidclubid`)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('Invalid club id values for endpoint');
    });


    it('Should return a valid json object which conforms correctly to the table configuration model', async () => {

        const response = await request(app)
            .get(`/api/tableconfigurations/club/${sampleTC.clubId}`)
            .set('Accept', 'application/json');
        expect(response.body[0].hasOwnProperty('type')).toEqual(true);
        expect(response.body[0].hasOwnProperty('price')).toEqual(true);
        expect(response.body[0].hasOwnProperty('size')).toEqual(true);
        expect(response.body[0].hasOwnProperty('availabilityCount')).toEqual(true);
        expect(response.body[0].hasOwnProperty('clubId')).toEqual(true);

    });
    afterAll( async () => {

        await TableConfig.deleteOne({ _id: new ObjectId(sampleTC.id)});

        mongoose.connection.close();
    });


});