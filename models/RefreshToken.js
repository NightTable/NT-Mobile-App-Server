const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    serverRefreshToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);