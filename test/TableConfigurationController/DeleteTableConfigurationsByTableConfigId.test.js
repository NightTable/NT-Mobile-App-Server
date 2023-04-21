  

const { app } = require('../../server');
const request = require('supertest');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const TableConfiguration = require('../../models/TableConfiguration');

describe('Testing the DELETE /api/tableconfigurations/club/:clubId endpoint', () => {

    let sampleTableConfiguration;
    let sampleTableConfigurationTwo;

    beforeAll( async () => {

        await TableConfiguration.deleteOne({ type: "djDeleteTableConfigByTableConfigId" });
        await TableConfiguration.deleteOne({ type: "standing deluxeDeleteTableConfigByTableConfigId" });
        
        sampleTableConfiguration = await TableConfiguration.create({
            type: "djDeleteTableConfigByTableConfigId",
            minPrice: 10000,
            recommendedCapacity: 5,
            availabilityCount: 2,
            clubId: new ObjectId(),
        });

        await sampleTableConfiguration.save();

        sampleTableConfigurationTwo = await TableConfiguration.create({
            type: "standing deluxeDeleteTableConfigByTableConfigId",
            minPrice: 20000,
            recommendedCapacity: 10,
            availabilityCount: 1,
            clubId: new ObjectId(),
        });

        await sampleTableConfigurationTwo.save();


    })

    it('Should return a json object which represents the corresponding table configuration', async () => {

        const response = await request(app)
            .delete(`/api/tableconfigurations/${sampleTableConfigurationTwo.id}`)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("The table configuration was successfully deleted");

        let queriedTableConfigurationResultOne = await TableConfiguration.find({ _id: sampleTableConfiguration.id });
        expect(queriedTableConfigurationResultOne.length).toEqual(1);

        let queriedTableConfigurationResultTwo = await TableConfiguration.find({ _id: sampleTableConfigurationTwo.id });

        expect(queriedTableConfigurationResultTwo.length).toEqual(0);
        
        
    });

    it('Should return a 400 error if an invalid id is entered in', async () => {

        const response = await request(app)
            .delete(`/api/tableconfigurations/notvalidid`)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request - We were not able to delete the table configuration");


    });

    afterAll( async () => {

        await TableConfiguration.deleteOne({ type: "djDeleteTableConfigByTableConfigId" });
        await TableConfiguration.deleteOne({ type: "standing deluxeDeleteTableConfigByTableConfigId" });
        
        mongoose.connection.close();
    });


});