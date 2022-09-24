// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: false
    },
    profilePhoto: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    gmail: {
      type: String,
      required: false
    },
    isProfileSetup: {
      type: Boolean,
      required: true
    },
    facebookEmail: {
      type: String,
      required: false
    },
    isIntermediarySetup: {
      type: Boolean,
      required: true
    },
    instaHandle: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: Number, 
      required: true
    },
    password: {
      type: String,
      required: true
    },
});

module.exports = mongoose.model('User', userSchema);