// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated. 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const representativeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     required: true
    // }, how do we handle representative login then
    username: {
        type: String,
        required: true
    },
    // isVerified: {
    //     type: Boolean,
    //     required: true
    // }, not there in schema
    clubId:[{
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }],
    role: {
        type: String,
        required: true,
        enum: ["management", "staff", "host", "promoter","ntadmin" ]
    },
    tableConfigPrivilege:{
        type: Boolean,
        required: true,
    },
    eventPrivileges:{
        type: Boolean,
        required: true,
    },
    reservationManagementPrivileges:{
        type: Boolean,
        required: true,
    },
    mobileAppTableMinimumPrivileges:{
        type: Boolean,
        required: true,
    },
    menuItemPrivileges:{
        type: Boolean,
        required: true,
    },
    clubPrivileges:{
        type: Boolean,
        required: true,
    },
    representativePrivileges:{
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Representative', representativeSchema);