const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const privilegesSchema = new Schema({
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

module.exports = mongoose.model('Privilege', privilegesSchema);