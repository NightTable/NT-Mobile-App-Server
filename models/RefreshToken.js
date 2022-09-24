// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    serverRefreshToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);