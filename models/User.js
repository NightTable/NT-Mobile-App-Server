  

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      // required: true
    },
    lastName: {
      type: String,
      // required: true
    },
    userName: {
      type: String,
      // required: false
    },
    profilePhoto: {
      type: String,
      // required: false
    },
    gender: {
      type: String,
      enum: ['male','female']
      // required: true
    },
    email: {
      type: String,
      // required: false
    },
    // gmail: {
    //   type: String,
    //   required: false
    // },
    isProfileSetup: {
      type: Boolean,
      // required: true,
      default: false
    },
    facebookEmail: {
      type: String,
      // required: false
    },
    // isIntermediarySetup: {
    //   type: Boolean,
    //   required: true
    // },
    instaHandle: {
      type: String,
      // required: false
    },
    phoneNumber: {
      type: Number, 
      required: true
    },
    // password: {
    //   type: String,
    //   required: true
    // },
    visits:{
      type: Number,
      default:0
    },
    inHouseSpend:{
      type:Number,
      default: 0
    },
    canChangeTableMinimums: {
      type: Boolean,
      default: false
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);