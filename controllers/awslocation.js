const AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'us-east-2'});

// Create a Location Service client
const locationClient = new AWS.LocationService({apiVersion: '2020-11-19'});


// Geocode an address
const getCoordinates = (address) => {
    address = '1600 Amphitheatre Parkway, Mountain View, CA 94043, United States';

    locationClient.geocode({Address: address}, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
    });
}



//This will return the latitude and longitude of the geocoded address in the data object.



module.exports = {getCoordinates};