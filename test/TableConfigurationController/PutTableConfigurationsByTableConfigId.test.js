// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const request = require('supertest');
const { app }= require('../../server');
const mongoose = require('mongoose');
const TableConfiguration = require('../../models/TableConfiguration');
const ObjectId = require('mongodb').ObjectId;

describe('Testing the PUT /api/tableconfigurations/:tableconfigid endpoint', () => {


    let sampleTableConfigurationOne;

    beforeAll( async() => {

        sampleTableConfigurationOne = await TableConfiguration.create({
            type: "floorTestPutTableConfigByTableConfig",
            price: 303,
            size: 12,
            availabilityCount: 50,
            clubId: new ObjectId()
        });

        await sampleTableConfigurationOne.save();
       
    });

    it(`Should return successful response for request to update specific table configuration object`, async () => {

            const requestTableConfigurationInputObject = {
                    "type": "floorTESTModifiedPutTableConfigByTableConfig",
                    "price": 394,
                    "size": 3,
                    "availabilityCount": 2
            };

            const response = await request(app)
                .put(`/api/tableconfigurations/${sampleTableConfigurationOne.id}`)
                .send(requestTableConfigurationInputObject)
                .set('Accept', 'application/json');
            

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("The table configuration was successfully updated");


    });



    it(`Should return a 400 error if an invalid id is presented in the query parameter`, async () => {

        const requestTableConfigurationInputObject = {
                "type": "floorTESTModifiedPutTableConfigByTableConfig",
                "price": 394,
                "size": 3,
                "availabilityCount": 2
        };

        const response = await request(app)
            .put(`/api/tableconfigurations/notarealid`)
            .send(requestTableConfigurationInputObject)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- the table configuration was not able to be updated");

    });

    it(`Should return a 400 error if the input body is invalid`, async () => {

        const requestTableConfigurationInputObject = {
            "type": "floorTESTModifiedPutTableConfigByTableConfig",
            "price": 394,
        };

        const response = await request(app)
            .put(`/api/tableconfigurations/${sampleTableConfigurationOne.id}`)
            .send(requestTableConfigurationInputObject)
            .set('Accept', 'application/json');
        

        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Invalid request -- the table configuration was not able to be updated");

    });


    afterAll( async () => {

        await TableConfiguration.deleteOne({ type: "floorTestPutTableConfigByTableConfig" });
        await TableConfiguration.deleteOne({ type: "floorTESTModifiedPutTableConfigByTableConfig" });

        mongoose.connection.close();
    });


});