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
        required: [true, "firstName is required"]
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "phoneNumber is required"]    
    },
    username: {
        type: String,
        required: [true, "username is required"]    
    },
    clubId: [{
        club:{
            type: Schema.Types.ObjectId,
            ref: 'Club',
            required: [true, "clubId is required"]
        }
    }],
    role: {
        type: String,
        required: true,
        enum: ["staff", "management", "host", "promoter", "godfather"]
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
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('Representative', representativeSchema);