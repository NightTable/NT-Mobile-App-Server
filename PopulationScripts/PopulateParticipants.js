const Participant = require('../models/Participant');
const User = require('../models/User');

const populateParticipants = async () => {

    let populatePartUserOne = await User.create({
        firstName: "PopulatePart",
        lastName: "UserOne",
        userName: "populatepartuserone",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populatepartuserone@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populatepartuserone",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await populatePartUserOne.save();


    let populatePartUserTwo = await User.create({
        firstName: "PopulatePart",
        lastName: "UserTwo",
        userName: "populatepartusertwo",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populatepartusertwo@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populatepartusertwo",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await populatePartUserTwo.save();

    let populatePartUserThree = await User.create({
        firstName: "PopulatePart",
        lastName: "UserThree",
        userName: "populatepartuserthree",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populatepartuserthree@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populatepartuserthree",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await populatePartUserThree.save();


    let populatePartUserFour = await User.create({
        firstName: "PopulatePart",
        lastName: "UserFour",
        userName: "populatepartuserfour",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populatepartuserfour@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populatepartuserfour",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await populatePartUserFour.save();


    let populateParticipantOne = await Participant.create({
        userId: populatePartUserOne.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await populateParticipantOne.save();

    let populateParticipantTwo = await Participant.create({
        userId: populatePartUserTwo.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await populateParticipantTwo.save();

    let populateParticipantThree = await Participant.create({
        userId: populatePartUserThree.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await populateParticipantThree.save();

    let populateParticipantFour = await Participant.create({
        userId: populatePartUserFour.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await populateParticipantFour.save();

    
}

exports.populateParticipants = populateParticipants;