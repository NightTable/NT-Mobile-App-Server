const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserFriendMapping = require('../models/UserFriendMapping');
const UserBlockedFriendMapping = require('../models/UserBlockedFriendMapping');
const ObjectId = require('mongodb').ObjectId;
const url = require('url');
const { send } = require('process');


//api to add full detailks of user once he wants to access the table
router.put('/user/:userId', async(req,res)=>{
    
    let userId = req.params.userId;

    let {firstName, lastName, userName, phoneNumber, profilePhoto, gender, email, isProfileSetup, facebookEmail,  instaHandle} = req.body;

    //checking if the required values are there or not
    if(!firstName) return res.status(400).send({status:false, message: 'failed'});
    if(!lastName) return res.status(400).send({status:false, message: 'failed'});
    if(!userName) return res.status(400).send({status:false, message: 'failed'});
    if(!profilePhoto) return res.status(400).send({status:false, message: 'failed'});
    if(!gender) return res.status(400).send({status:false, message: 'failed'});
    if(!email) return res.status(400).send({status:false, message: 'failed'});
    if(!isProfileSetup) return res.status(400).send({status:false, message: 'failed'});
    if(!facebookEmail) return res.status(400).send({status:false, message: 'failed'});
    if(!instaHandle) return res.status(400).send({status:false, message: 'failed'});
    if(!phoneNumber) return res.status(400).send({status:false, message: 'failed'}); // need to add proper phone number validation

    //checking if they are not empty spaces
    if(!firstName.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!lastName.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!userName.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!profilePhoto.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!gender.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!email.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!facebookEmail.trim()) return res.status(400).send({status:false, message: 'failed'});
    if(!instaHandle.trim()) return res.status(400).send({status:false, message: 'failed'});

    let updatedUser = await User.findOneAndUpdate({_id:userId}, req.body, {new:true}).lean();
    if(!updatedUser) return res.status(404).send({status:false, message: "failed! No user found"});
    return res.status(201).send({status:true, message: "success", data: updatedUser});

})

router.get('/user', async(req,res)=> {
    try{
        let phoneNumber = req.body.phoneNumber;
        let user = await User.findOne({phoneNumber:phoneNumber, isDeleted:false}).lean();
        if(!user) return res.status(200).send({status:false, message:'user not found'})
        return res.status(200).send({status:true, message: 'user found', data: user})
    }catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
})

// router.get('/query', async (req, res) => {

//     try {

//         let queryObject = url.parse(req.url, true).query;
//         let nameParam = queryObject.name;
    
//         let nameWordArray = nameParam.split(' ');
    
//         let firstName = nameWordArray[0];
//         let lastName = nameWordArray[1];

//         let userResult = await User.find({ 
//             "firstName": { "$regex": firstName, "$options": "i" },
//             "lastName": { "$regex": lastName, "$options": "i" }});

//         let preparedUserList = [];

//         for (let i = 0; i < userResult.length; i++) {

//             let preparedUserResult = {
//                 id: userResult[0].id,
//                 name: `${userResult[0].firstName} ${userResult[0].lastName}`
//             }

//             preparedUserList.push(preparedUserResult);

//         }

//         res.json(preparedUserList);

//     } catch (err) {

//         res.status(400).send({ message: "Invalid input prevented the friend query to be completed"});

//     }

// });

// router.get('/name/:name', async (req, res) => {

//     let nameParam = req.params.name;
//     let nameWordArray = nameParam.trim().split(' ');



//     try {
//         let userResult = null;
//         if (nameWordArray.length == 2){
//             let firstName = nameWordArray[0];
//             let lastName = nameWordArray[1];
//             userResult = await User.find({ 
//                 "firstName": { "$regex": firstName, "$options": "i" },
//                 "lastName": { "$regex": lastName, "$options": "i" }});
//         }
//         else if (nameWordArray.length == 1){
//             let name = nameWordArray[0];
//             let result1 = await User.find({ "firstName": { "$regex": name, "$options": "i" }});
//             let result2 = await User.find({ "lastName": { "$regex": name, "$options": "i" }});
//             if (result1.length !== 0 && result2.length !== 0){
//                 let r1name = result1[0].firstName + " " + result1[0].lastName;
//                 let r2name = result2[0].firstName + " " + result2[0].lastName;
                
//                 if (r2name != r1name ){
//                     userResult = result1.concat(result2);
//                 }
//                 else{
//                     userResult = result1;
//                 }
//             }
//             else if (result1.length == 0 && result2.length != 0){
//                 userResult = result2;
//             }
//             else{
//                 userResult = result1;
//             }
            
//         }
//         if (userResult.length === 0){
//             return res.status(400).send({ message: `Invalid request -- The requested user with the given name could not be found`});
//         }
//         else{
//             return res.json(userResult);
//         }
//     } catch (err) {
//         res.status(400).send({ message: `Invalid request -- The requested user with the given name could not be found`, error: err});

//         return;

//     }

// });

// router.post('/blockedfriends', async (req, res) => {


//     let sourceUserIdParam = req.body.sourceUserId;
//     let targetUserIdParam = req.body.targetUserId;


//     try {


//         await UserFriendMapping.deleteOne({ 
//             sourceId: sourceUserIdParam,
//             targetId: targetUserIdParam
//         });

//         await UserFriendMapping.deleteOne({ 
//             sourceId: targetUserIdParam,
//             targetId: sourceUserIdParam
//         });

//         let createdUserBlockedFriendObject = await UserBlockedFriendMapping.create({

//             sourceId: sourceUserIdParam,
//             targetId: targetUserIdParam
//         });

//         await createdUserBlockedFriendObject.save();

//         res.json({ message: "The blocked relationship was successfully created." });


//     } catch (err) {

//         res.status(400).json({ message: "Invalid request -- the blocked relationship was not successfully created. "});
//     }
// });


// router.post('/friends', async(req, res) => {

//     let sourceUserIdParam = req.body.sourceUserId;
//     let targetUserIdParam = req.body.targetUserId;

//     try {

//         await UserFriendMapping.create({
//             sourceId: new ObjectId(sourceUserIdParam),
//             targetId: new ObjectId(targetUserIdParam)
//         });
    
//         await UserFriendMapping.create({
//             sourceId: new ObjectId(targetUserIdParam),
//             targetId: new ObjectId(sourceUserIdParam)
//         });

//         res.json({ message: "The friend relationship was created successfully" });
//         return;

//     } catch (err) {

//         res.status(400).send({ message: "Invalid request -- the friend relationship was not created successfully" });
//         return;
//     }

// });

// router.get('/friends/:userid', async (req, res) => {

//     let userIdParam = req.params.userid;

//     let retrievedMappingObjects;

//     try {

//         retrievedMappingObjects = await UserFriendMapping.find({ sourceId: new ObjectId(userIdParam)});

//         let basicInfoFriendList = [];

//         for (let i = 0; i < retrievedMappingObjects.length; i++) {

//             let localObject = retrievedMappingObjects[i];

//             let userObject = await User.findById(new ObjectId(localObject.targetId));

//             let basicInfoFriendObject = {
//                 id: userObject.id,
//                 name: userObject.firstName + " " + userObject.lastName
//             }

//             basicInfoFriendList.push(basicInfoFriendObject);
//         }

//         res.json(basicInfoFriendList);
//         return;

//     } catch (err) { 

//         res.status(400).send({ message: "Invalid input prevented any friends from being returned" });
//         return;
//     }

// });


router.get('/:userid', async (req, res) => {
    let userIdParam = req.params.userid;
    try {

        retrievedUserObject = await User.findById(userIdParam);
        if(!retrievedUserObject){
            return res.status(400).send({status: false, message: "user not found"})
        }
        return res.status(400).send({status:true, data: retrievedUserObject});
    } catch (err) { 

        res.status(500).send({ status: false, message: err.message });
        return;
    }
});

// router.post('/', async (req, res) => {


//     let firstNameParam = null;
//     let lastNameParam = null;
//     let userNameParam = null;
//     let profilePhotoParam = null;
//     let genderParam = null;
//     let isProfileSetupParam = null;
//     let isIntermediarySetupParam = null;
//     let instaHandleParam = null;
//     let phoneNumberParam = null;
//     let passwordParam = null;
//     let roleParam = null;

//     try {

//         firstNameParam = req.body.firstName;
//         lastNameParam = req.body.lastName;
//         userNameParam = req.body.userName;
//         profilePhotoParam = req.body.profilePhoto;
//         genderParam = req.body.gender;
//         isProfileSetupParam = req.body.isProfileSetup;
//         isIntermediarySetupParam = req.body.isIntermediarySetup;
//         instaHandleParam = req.body.instaHandle;
//         phoneNumberParam = parseInt(req.body.phoneNumber);
//         passwordParam = req.body.password;
//         roleParam = req.body.role;

//     } catch (exception) {


//         res.status(400).send("Invalid request -- Could not parse inputs");
//         return;
//     }

//     // checkig the case if the user does not put in all the required parameters 

//     const allInputsPresent = (
//         firstNameParam !== undefined &&
//         lastNameParam !== undefined &&
//         userNameParam !== undefined &&
//         profilePhotoParam !== undefined &&
//         genderParam !== undefined &&
//         isProfileSetupParam !== undefined &&
//         isIntermediarySetupParam !== undefined &&
//         instaHandleParam !== undefined &&
//         phoneNumberParam !== undefined &&
//         passwordParam !== undefined &&
//         roleParam !== undefined
//     )

//     if (!allInputsPresent) {

//         res.status(400).send("Invalid request -- All inputs not present");
//         return;

//     } else {

//         try {

//             const newUserObject = await User.create({
//                 firstName: firstNameParam,
//                 lastName: lastNameParam,
//                 userName: userNameParam,
//                 profilePhoto: profilePhotoParam,
//                 gender: genderParam,
//                 isProfileSetup: isProfileSetupParam,
//                 isIntermediarySetup: isIntermediarySetupParam,
//                 instaHandle: instaHandleParam,
//                 phoneNumber: phoneNumberParam,
//                 password: passwordParam,
//                 role: roleParam
//             });
        
//             await newUserObject.save();

//             res.json({
//                 message: "The user was successfully added to the database"
//             });

//         } catch (exception) {

//             res.status(400).send("Invalid request -- The user was not able to be added to the database");
//         }
//     }

// });

// router.put('/:userid', async (req, res) => {
//     let userIdParam = req.params.userid;
//     let retrievedUserIdObject = null;

//     let firstNameParam = null;
//     let lastNameParam = null;
//     let userNameParam = null;
//     let genderParam = null;
//     let phoneNumberParam = null;
//     let emailParam = null;

//     try {
//         firstNameParam = req.body.firstName;
//         lastNameParam = req.body.lastName;
//         userNameParam = req.body.userName;
//         genderParam = req.body.gender;
//         phoneNumberParam = parseInt(req.body.phoneNumber);
//         emailParam = req.body.email;


//         retrievedUserIdObject = await User.findOneAndUpdate(
//             {_id: new ObjectId(userIdParam)},
//             {
//                 firstName: firstNameParam,
//                 lastName: lastNameParam,
//                 userName: userNameParam,
//                 gender: genderParam,
//                 phoneNumber: phoneNumberParam,
//                 email: emailParam
//             });
//         res.json({message: "The user was updated"});
//         return;
//     } catch (err) { 
//         res.status(400).send({ message: "Invalid request -- the user was not able to be updated"});
//         return;
//     }

// });

router.delete('/:userid', async (req, res) => {

    let userIdParam = req.params.userid;

    try {

        await User.deleteOne({ _id: new ObjectId(userIdParam)});

        res.json({ message: "The user was successfully deleted"});
        return;

    } catch (err) {

        res.status(400).send({ message: "Invalid input prevented the user from being deleted"});
        return;
    }
});


module.exports = router;
