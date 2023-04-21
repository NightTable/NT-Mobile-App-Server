  

const Club = require('../models/Club');
const Region = require('../models/Region');
const Room = require('../models/Room');
const TableRequest = require('../models/TableRequest');
const User = require('../models/User');
const TableConfiguration = require('../models/TableConfiguration');

const populateRooms = async () => {


    let populateRoomUser = await User.create({
        firstName: "PopulateRUserOne",
        lastName: "One",
        userName: "populateruserone",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populateruserone@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populateruserone",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await populateRoomUser.save();


    let populateRoomUserTwo = await User.create({

        firstName: "PopulateRUserTwo",
        lastName: "Two",
        userName: "populaterusertwo",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populaterusertwo@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populaterusertwo",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"

    });

    await populateRoomUserTwo.save();

    let populateManagerUserOne = await User.create({
        firstName: "PopulateRManagerUserOne",
        lastName: "Two",
        userName: "populatermanageruserone",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "populatemanageruserone@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@populatermanageruserone",
        phoneNumber: 9384443333,
        password: "password",
        role: "manager"
    });

    await populateManagerUserOne.save();

    let populateRegionExample = await Region.create({
        cityArea: "Russia",
        referenceLat: 55.751244,
        referenceLong: 37.618423
    });

    await populateRegionExample.save();

    let populateRoomClub = await Club.create({
        name: "Populate User Club" ,
        latitude: 38.494 ,
        longitude: -74.443,
        instaHandle: '@populateuserclub' ,
        phoneNumber: 393843333 ,
        address: "32 Populate User Club" ,
        website: "the populate user club website" ,
        userId: populateRoomUser.id,
        regionId: populateRegionExample.id
    });

    await populateRoomClub.save();

    let populateRoomTableConfiguration = await TableConfiguration.create({
        type: "dancing",
        price: 393,
        size: 8,
        availabilityCount: 3,
        clubId: populateRoomClub.id
    });


    await populateRoomTableConfiguration.save();

    let populateRoomTableRequestOne = await TableRequest.create({
        name: "PopulateExampleRoomTabReqOne",
        tableConfigId: populateRoomTableConfiguration.id,
        costSplitType: "pnsl",
        taken: 2,
        available: 6,
        mfRatio: 0.25,
        isPolling: false,
        isActive: false,
        isClosed: false,
        requestPlacementTime: new Date(),
        activeGroupStartTime: null,
        activeGroupEndTime: null,
        clubId: populateRoomClub.id
    });

    await populateRoomTableRequestOne.save();

    let populateRoomTableRequestTwo = await TableRequest.create({
        name: "PopulateExampleRoomTabReqTwo",
        tableConfigId: populateRoomTableConfiguration.id,
        costSplitType: "pnsl",
        taken: 5,
        available: 3,
        mfRatio: 0.25,
        isPolling: false,
        isActive: false,
        isClosed: false,
        requestPlacementTime: new Date(),
        activeGroupStartTime: null,
        activeGroupEndTime: null,
        clubId: populateRoomClub.id
    });

    await populateRoomTableRequestTwo.save();

    let populateRoomTableRequestThree = await TableRequest.create({
        name: "PopulateExampleRoomTabReqThree",
        tableConfigId: populateRoomTableConfiguration.id,
        costSplitType: "pnsl",
        taken: 4,
        available: 4,
        mfRatio: 0.25,
        isPolling: false,
        isActive: false,
        isClosed: false,
        requestPlacementTime: new Date(),
        activeGroupStartTime: null,
        activeGroupEndTime: null,
        clubId: populateRoomClub.id
    });

    await populateRoomTableRequestThree.save();

    let roomOneExample = await Room.create({
        messageChatId: null,
        tableReqId: populateRoomTableRequestOne.id
    });

    await roomOneExample.save();

    let roomTwoExample = await Room.create({
        messageChatId: null,
        tableReqId: populateRoomTableRequestTwo.id
    });

    await roomTwoExample.save();

    let roomThreeExample = await Room.create({
        messageChatId: null,
        tableReqId: populateRoomTableRequestThree.id
    });

    await roomThreeExample.save();

}

exports.populateRooms = populateRooms; 
