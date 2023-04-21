const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    expiryAt:{
        type:String,
        required: true
    }   
},{timestamps:true});

module.exports = mongoose.model('Otp', otpSchema);