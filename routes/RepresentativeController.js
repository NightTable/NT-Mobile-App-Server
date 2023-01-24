const express = require("express");
const Region = require("../models/Region");
const router = express.Router();
const Club = require("../models/Club");
const User = require("../models/User");

//need to know how we are creating the representative
// router.post('/createRepresentative', async(req,res)=>{
//     let {firstName, lastName, email, phoneNumber, username, clubId, role, tableConfigPrivilege, eventPrivileges, reservationManagementPrivileges, mobileAppTableMinimumPrivileges, menuItemPrivileges,clubPrivileges, representativePrivileges} = req.body;
//     if(!firstName || !firstName.trim() )
// })