// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const UserFriendMapping = require('../models/UserFriendMapping');
const User = require('../models/User');



const populateUserFriendMappings =  async () => {

    let sourceUserOne = await User.create({
        firstName: "PopulateUserFriend",
        lastName: "SourceOne",
        userName: "populateuserfriendsourceone",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateuserfriendsourceone@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateuserfriendsourceone",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await sourceUserOne.save();

    let targetUserOne = await User.create({
        firstName: "PopulateUserFriend",
        lastName: "TargetOne",
        userName: "populateuserfriendtargetone",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateuserfriendtargetone@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateuserfriendtargetone",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await targetUserOne.save();


    let targetUserTwo = await User.create({
        firstName: "PopulateUserFriend",
        lastName: "TargetTwo",
        userName: "populateuserfriendtargettwo",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateuserfriendtargettwo@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateuserfriendtargettwo",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });
    
    await targetUserTwo.save();


    let targetUserThree = await User.create({
        firstName: "PopulateUserFriend",
        lastName: "TargetThree",
        userName: "populateuserfriendtargetthree",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateuserfriendtargetthree@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateuserfriendtargetthree",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });


    await targetUserThree.save();


    let targetUserFour = await User.create({
        firstName: "PopulateUserFriend",
        lastName: "TargetFour",
        userName: "populateuserfriendtargetfour",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateuserfriendtargetfour@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateuserfriendtargetfour",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await targetUserFour.save();


    // creating the user friend mapping with the specified sources 


    let userFriendMappingOne = await UserFriendMapping.create({
        sourceId: sourceUserOne.id,
        targetId: targetUserOne.id
    });

    await userFriendMappingOne.save();

    let userFriendMappingTwo = await UserFriendMapping.create({
        sourceId: sourceUserOne.id,
        targetId: targetUserTwo.id
    });

    await userFriendMappingTwo.save();

    let userFriendMappingThree = await UserFriendMapping.create({
        sourceId: sourceUserOne.id,
        targetId: targetUserThree.id
    });

    await userFriendMappingThree.save();

    let userFriendMappingFour = await UserFriendMapping.create({
        sourceId: sourceUserOne.id,
        targetId: targetUserFour.id
    });

    await userFriendMappingFour.save();



}

exports.populateUserFriendMappings = populateUserFriendMappings;

