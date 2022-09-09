const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailValidationTokenSchema = new Schema({
    emailToken: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('EmailValidationToken', emailValidationTokenSchema);