// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated.


const ObjectId = require('mongodb').ObjectId;

const User = require('./models/User');
const Club = require('./models/Club');
const Customer = require('./models/Customer');
const Event = require('./models/Event');
const TableRequest = require('./models/TableRequest');
const MessageChat = require('./models/MessageChat');
const Transaction = require('./models/Transaction');
const Participant = require('./models/Participant');
const Region = require('./models/Region');
const TableConfiguration = require('./models/TableConfiguration');
const TableReqCustomPriceAgreementMappingSchema = require('./models/TableReqCustomPriceAgreementMapping');
const EmailValidationToken = require('./models/EmailValidationToken');
const UserBlockedFriendMapping = require('./models/UserBlockedFriendMapping');


const { faker } = require('@faker-js/faker');

let globalUserOne;
let globalUserTwo;
let globalUserThree;
let globalUserFour;
let globalUserFive;

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let globalDummyRegion;
let globalDummyTransactionClub;
let globalDummyTransactionTableRequest;

let globalDummyClub;
let globalDummyTableConfig;

const populateClubs = async () => {


    let dummyUser = await User.create({
        firstName: "TestClub",
        lastName: "Manager",
        userName: "clubmanager",
        profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
        gender: "male",
        email: "clubmanager@gmail.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@clubmanager",
        phoneNumber: 9393333,
        password: "password",
        role: "manager"
    });

    await dummyUser.save();

    globalDummyRegion = await Region.create({
        cityArea: "Juneau",
        referenceLat: 58.305801,
        referenceLong: -134.433304,
    });

    await globalDummyRegion.save();

 

    let dummyClubObjects = [

        {
            name: "Random Club 1",
            latitude: 87.38373,
            longitude: -30.383833,
            instaHandle: "@randomclub1",
            phoneNumber: 3939444444,
            address: "58 Random Club address 1",
            website: "https://somewebsite",
            userId: dummyUser.id,
            regionId: globalDummyRegion.id
        },
        {
            name: "Random Club 2",
            latitude: 85.38373,
            longitude: -34.383833,
            instaHandle: "@randomclub2",
            phoneNumber: 31444444,
            address: "58 Random Club address 2",
            website: "https://somewebsite2",
            userId: dummyUser.id,
            regionId: globalDummyRegion.id
        },
        {
            name: "Random Club 3",
            latitude: 83.38373,
            longitude: -24.383833,
            instaHandle: "@randomclub3",
            phoneNumber: 937337777,
            address: "58 Random Club address 2",
            website: "https://somewebsite2",
            userId: dummyUser.id,
            regionId: globalDummyRegion.id
        },
        {
            name: "Random Club 4",
            latitude: 13.38373,
            longitude: -22.383833,
            instaHandle: "@randomclub4",
            phoneNumber: 937337777,
            address: "58 Random Club address 4",
            website: "https://somewebsite4",
            userId: dummyUser.id,
            regionId: globalDummyRegion.id
        }, 
        {
            name: "Random Club 5",
            latitude: 83.38373,
            longitude: -24.383833,
            instaHandle: "@randomclub5",
            phoneNumber: 937337777,
            address: "58 Random Club address 5",
            website: "https://somewebsite5",
            userId: dummyUser.id,
            regionId: globalDummyRegion.id 
        }
    ];

    for (let i = 0; i < dummyClubObjects.length; i++) {

        let mongoClubObject = await Club.create({

            name: dummyClubObjects[i].name,
            latitude: dummyClubObjects[i].latitude,
            longitude: dummyClubObjects[i].longitude,
            instaHandle: dummyClubObjects[i].instaHandle,
            phoneNumber: dummyClubObjects[i].phoneNumber,
            address: dummyClubObjects[i].address,
            website: dummyClubObjects[i].website,
            userId: dummyUser.id,
            regionId: globalDummyRegion.id 
        });

        await mongoClubObject.save();

    }

}

const populateMessageChats = async() => {


    let users = [
        {
            firstName: "UserSource",
            lastName: "OneA",
            userName: "usersourceonea",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourceonea@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourceonea",
            phoneNumber: 1511114444,
            password: "password",
            role: "consumer"
        },
        {
            firstName: "UserSource",
            lastName: "OneB",
            userName: "usersourceoneb",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourceoneb@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourceoneb",
            phoneNumber: 8588487777,
            password: "password",
            role: "consumer"
        },
        {
            firstName: "UserSource",
            lastName: "TwoA",
            userName: "usersourcetwoa",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourcetwoa@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourcetwoa",
            phoneNumber: 8588487777,
            password: "password",
            role: "consumer"
        },
        {
            firstName: "UserSource",
            lastName: "TwoB",
            userName: "usersourcetwob",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourcetwob@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourcetwob",
            phoneNumber: 8588487777,
            password: "password",
            role: "consumer"
        },
        {
            firstName: "UserSource",
            lastName: "ThreeA",
            userName: "usersourcethreea",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourcethreea@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourcethreea",
            phoneNumber: 8588487777,
            password: "password",
            role: "consumer"
        },
        {
            firstName: "UserSource",
            lastName: "ThreeB",
            userName: "usersourcethreeb",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "usersourcethreeb@email.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@usersourcethreeb",
            phoneNumber: 8588487777,
            password: "password",
            role: "consumer" 
        }
    ];

    let createdUserIds = [];


    for (let i = 0; i < users.length; i++) {

        let iterationUser = await User.create({
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            userName: users[i].userName ,
            profilePhoto: users[i].profilePhoto,
            gender: users[i].gender,
            email: users[i].email ,
            gmail: users[i].gmail,
            isProfileSetup: users[i].isProfileSetup ,
            facebookEmail: users[i].facebookEmail ,
            isIntermediarySetup: users[i].isIntermediarySetup ,
            instaHandle: users[i].instaHandle,
            phoneNumber: users[i].phoneNumber,
            password: users[i].password,
            role: users[i].role 
        });

        await iterationUser.save();

        createdUserIds.push(iterationUser.id);
    }

    let messageChatObjectOne = await MessageChat.create({

        sourceUserId: createdUserIds[0],
        targetUserId: createdUserIds[1],
        isUnRead: true,
        lastMessage: "Hello, how are you?",
        isSourceDeleted: false,
        isTargetDeleted: false
    });

    await messageChatObjectOne.save();

    let messageChatObjectTwo = await MessageChat.create({

        sourceUserId: createdUserIds[2],
        targetUserId: createdUserIds[3],
        isUnRead: true,
        lastMessage: "This is another message",
        isSourceDeleted: false,
        isTargetDeleted: false
        
    });


    await messageChatObjectTwo.save();


    let messageChatObjectThree = await MessageChat.create({

        sourceUserId: createdUserIds[4],
        targetUserId: createdUserIds[5],
        isUnRead: true,
        lastMessage: "Another thing has been created",
        isSourceDeleted: false,
        isTargetDeleted: false
        
    });

    await messageChatObjectThree.save();

}

const populateTableReqCustomPriceAgreementMappings = async() => {



    let exampleUserOneManager = await User.create({
        firstName: "TableReqMapping",
        lastName: "UserOne",
        userName: "tablereqmappinguserone" ,
        profilePhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Tom_Cotton_official_Senate_photo.jpg/640px-Tom_Cotton_official_Senate_photo.jpg",
        gender: "male",
        email: "tablereqmappinguserone@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@tablereqmappinguserone",
        phoneNumber: 3934443333,
        password: "password",
        role: "manager" 
    });

    await exampleUserOneManager.save();

    let exampleUserTwo = await User.create({
        firstName: "TableReqMapping",
        lastName: "UserTwo",
        userName: "tablereqmappingusertwo" ,
        profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        gender: "male",
        email: "tablereqmappingusertwo@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@tablereqmappingusertwo",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await exampleUserTwo.save();


    let exampleUserThree = await User.create({
        firstName: "TableReqMapping",
        lastName: "UserTwo",
        userName: "tablereqmappinguserthree" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "tablereqmappinguserthree@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@tablereqmappinguserthree",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await exampleUserThree.save();

    let exampleUserFour = await User.create({
        firstName: "TableReqMapping",
        lastName: "UserTwo",
        userName: "tablereqmappinguserthree" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "tablereqmappinguserthree@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@tablereqmappinguserthree",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await exampleUserFour.save();


    let exampleUserFive = await User.create({
        firstName: "TableReqMapping",
        lastName: "UserFive",
        userName: "tablereqmappinguserfive" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "tablereqmappinguserfive@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@tablereqmappinguserfive",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await exampleUserFive.save();


    // creating the associated participants for the users 

    let exampleParticipantTwo = await Participant.create({
        userId: exampleUserTwo.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await exampleParticipantTwo.save();

    let exampleParticipantThree = await Participant.create({
        userId: exampleUserThree.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await exampleParticipantThree.save();


    let exampleParticipantFour = await Participant.create({
        userId: exampleUserFour.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await exampleParticipantFour.save();

    let exampleParticipantFive = await Participant.create({
        userId: exampleUserFive.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    await exampleParticipantFive.save();



    let exampleTableReqMappingClub = await Club.create({
        name: "TableReqClub",
        latitude: 35.227085,
        longitude: -80.843124,
        instaHandle: "@exampletableclubmapping",
        phoneNumber: 3032223133,
        address: "123 Example Club Address",
        website: "randomclubmapping@club.com",
        userId: exampleUserOneManager.id,
        regionId: globalDummyRegion.id
    });

    globalDummyTransactionClub = exampleTableReqMappingClub;

    await exampleTableReqMappingClub.save();

    let exampleTableConfiguration = await TableConfiguration.create({
        type: "floor",
        price: 800,
        size: 8,
        availabilityCount: 30,
        clubId: exampleTableReqMappingClub.id
    });

    await exampleTableConfiguration.save();


    let exampleTableRequest = await TableRequest.create({
        name: "cooltableformappingexample",
        tableConfigId: exampleTableConfiguration.id,
        costSplitType: "pnsl",
        taken: 4,
        available: 9,
        mfRatio: 0.25,
        isPolling: true,
        isActive: false,
        isClosed: false,
        requestPlacementTime: new Date(),
        activeGroupStartTime: null,
        activeGroupEndTime: null,
        clubId: exampleTableReqMappingClub.id
    });

    globalDummyTransactionTableRequest = exampleTableRequest;

    await exampleTableRequest.save();

    let exampleTableRequestParticipantMapping = await TableReqCustomPriceAgreementMappingSchema.create({

        tableReqId: exampleTableReqMappingClub.id,
        participantRequesterId: exampleParticipantTwo.id,
        agreeingParticipants: [
            exampleParticipantThree.id,
            exampleParticipantFour.id
        ],
        numParticipantsAgreed: 2,
        numAgreeingParticipantsNeeded: 1,
        isDisagreed: false
    });

    await exampleTableRequestParticipantMapping.save();

};

const populateTransactions = async () => {

    

    // creating the dummy transaction users

    let transactionUserTestOne = await User.create({
        firstName: "Transaction User",
        lastName: "One",
        userName: "transactionuserone" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "transactionuserone@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@transactionuserone",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await transactionUserTestOne.save();


    let transactionUserTestTwo = await User.create({
        firstName: "Transaction User",
        lastName: "Two",
        userName: "transactionusertwo" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "transactionusertwo@email.com" ,
        gmail: true,
        isProfileSetup: true,
        facebookEmail: false,
        isIntermediarySetup: false,
        instaHandle: "@transactionusertwo",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await transactionUserTestTwo.save();


    let transactionUserTestThree = await User.create({
        firstName: "Transaction User",
        lastName: "Three",
        userName: "transactionuserthree" ,
        profilePhoto: "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&k=20&m=185262648&s=170667a&w=0&h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=",
        gender: "male",
        email: "transactionuserthree@email.com" ,
        gmail: true,
        isProfileSetup: true ,
        facebookEmail: false ,
        isIntermediarySetup: false,
        instaHandle: "@transactionuserthree",
        phoneNumber: 3934443333,
        password: "password",
        role: "consumer" 
    });

    await transactionUserTestThree.save();


    // creating the dummy transaction customers


    let transactionCustomerTestOne = await Customer.create({

        stripeCustomerId: '393i383jdjdd',
        userId: transactionUserTestOne.id

    });

    await transactionCustomerTestOne.save();

    let transactionCustomerTestTwo = await Customer.create({
        stripeCustomerId: '393i383jdjdd',
        userId: transactionUserTestTwo.id
    });

    await transactionCustomerTestTwo.save();

    let transactionCustomerTestThree = await Customer.create({
        stripeCustomerId: '393i383jdjdd',
        userId: transactionUserTestThree.id
    });

    await transactionCustomerTestThree.save();


    // creating the transaction objects

    let transactionObjectOne = await Transaction.create({
        customerId: transactionCustomerTestOne.id,
        amount: 304.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
    });

    await transactionObjectOne.save();

    let transactionObjectTwo = await Transaction.create({
        customerId: transactionCustomerTestOne.id,
        amount: 934.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id

    });

    await transactionObjectTwo.save();

    let transactionObjectThree = await Transaction.create({

        customerId: transactionCustomerTestOne.id,
        amount: 1233.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
    });

    await transactionObjectThree.save();


    let transactionObjectFour = await Transaction.create({
        customerId: transactionCustomerTestTwo.id,
        amount: 12.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
        
    });

    await transactionObjectFour.save();


    let transactionObjectFive = await Transaction.create({
        customerId: transactionCustomerTestTwo.id,
        amount: 29.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
    });

    await transactionObjectFive.save();

    let transactionObjectSix = await Transaction.create({
        customerId: transactionCustomerTestTwo.id,
        amount: 303.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
        
    });

    await transactionObjectSix.save();


    let transactionObjectSeven = await Transaction.create({

        customerId: transactionCustomerTestThree.id,
        amount: 2933.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
        
    });

    await transactionObjectSeven.save();


    let transactionObjectEight = await Transaction.create({


        customerId: transactionCustomerTestThree.id,
        amount: 9483.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id

    });

    await transactionObjectEight.save();


    let transactionObjectNine = await Transaction.create({

        customerId: transactionCustomerTestThree.id,
        amount: 10239.3,
        dateCreated: randomDate(new Date(1997, 3, 23), new Date()),
        isRefund: false,
        tableReqId: globalDummyTransactionTableRequest.id,
        clubId: globalDummyTransactionClub.id
        
    });

    await transactionObjectNine.save();

}
    

const populateEmailValidationTokens = async () => {

    let emailValidationTokenOne = await EmailValidationToken.create({
        emailToken: "30i3893u3j9euedhejudd",
        email: "somerandomemail@gmail.com",
        expiryDate: randomDate(new Date(2012, 0, 1), new Date())
    });

    await emailValidationTokenOne.save();

    let emailValidationTokenTwo = await EmailValidationToken.create({
        emailToken: "393i2293ujeid9ddedud",
        email: "anotheremail@gmail.com",
        expiryDate: randomDate(new Date(2012, 0, 1), new Date())
    });

    await emailValidationTokenTwo.save();

    let emailValidationTokenThree = await EmailValidationToken.create({

        emailToken: "2-2092iue33iu3ueuejd",
        email: "random@gmail.com",
        expiryDate: randomDate(new Date(2012, 0, 1), new Date())
    });

    await emailValidationTokenThree.save();


};

const populateUserBlockedFriendMappings = async () => {


    let userBlockPartOneA = await User.create({
        firstName: "Jack",
        lastName: "Smith",
        userName: "jacksmith",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "jacksmith@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@jacksmith",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    globalUserOne = userBlockPartOneA;

    await userBlockPartOneA.save();

    let userBlockPartOneB = await User.create({
        firstName: "Amanda",
        lastName: "Anderson",
        userName: "amandaanderson",
        profilePhoto: "http://images6.fanpop.com/image/photos/37300000/Random-Girl-people-37325426-236-354.jpg",
        gender: "female",
        email: "amandaanderson@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@amandaanderson",
        phoneNumber: 3132223145,
        password: "password",
        role: "consumer"

    });

    globalUserTwo = userBlockPartOneB;

    await userBlockPartOneB.save();

    let userBlockPartTwoA = await User.create({
        firstName: "Hillary",
        lastName: "Clinton",
        userName: "hillaryclinton",
        profilePhoto: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg",
        gender: "female",
        email: "hillaryclinton@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@hillaryclinton",
        phoneNumber: 2029993333,
        password: "password",
        role: "consumer"

    });

    globalUserThree = userBlockPartTwoA;

    await userBlockPartTwoA.save();

    let userBlockPartTwoB = await User.create({
        firstName: "Barack",
        lastName: "Obama",
        userName: "hillaryclinton",
        profilePhoto: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg",
        gender: "male",
        email: "barackobama@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@barackobama",
        phoneNumber: 1112223333,
        password: "password",
        role: "consumer"
    });

    globalUserFour = userBlockPartTwoB;

    await userBlockPartTwoB.save();

    let userBlockPartThreeA = await User.create({
        firstName: "Will",
        lastName: "Smith",
        userName: "willsmith",
        profilePhoto: "https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg",
        gender: "male",
        email: "willsmith@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@willsmith",
        phoneNumber: 3809997384,
        password: "password",
        role: "consumer"
    });

    globalUserFive = userBlockPartThreeA;

    await userBlockPartThreeA.save();


    // creating the UserBlockedFriendMappings

    let userBlockedMappingOne = await UserBlockedFriendMapping.create({

        sourceId: userBlockPartOneA.id,
        targetId: userBlockPartOneB.id
    });

    await userBlockedMappingOne.save();


    let userBlockedMappingTwo = await UserBlockedFriendMapping.create({
        sourceId: userBlockPartOneA.id,
        targetId: userBlockPartTwoA.id
    });

    await userBlockedMappingTwo.save();

    let userBlockedMappingThree = await UserBlockedFriendMapping.create({

        sourceId: userBlockPartOneA.id,
        targetId: userBlockPartTwoB.id
    });

    await userBlockedMappingThree.save();

    let userBlockedMappingFour = await UserBlockedFriendMapping.create({
        sourceId: userBlockPartOneA.id,
        targetId: userBlockPartThreeA.id
        
    });

    await userBlockedMappingFour.save();

    let userBlockedMappingFive = await UserBlockedFriendMapping.create({

        sourceId: userBlockPartOneA.id,
        targetId: userBlockPartThreeA.id
    });

    await userBlockedMappingFive.save();

}

  

const populateCustomers = async () => {


    let customerObjectOne = await Customer.create({

        stripeCustomerId: "11222393i38u3j3j3ed",
        userId: globalUserOne.id
    });

    await customerObjectOne.save();

    let customerObjectTwo = await Customer.create({

        stripeCustomerId: "99983938ejhd393i38u3dj3j3o38udhd3ed",
        userId: globalUserTwo.id
    });

    await customerObjectTwo.save();

    let customerObjectThree = await Customer.create({

        stripeCustomerId: "00333wefw3393i38ddu3j3j3ed",
        userId: globalUserThree.id
    });

    await customerObjectThree.save();

    let customerObjectFour = await Customer.create({

        stripeCustomerId: "1112239eff3d3ewe8u3j3ddj3ed",
        userId: globalUserFour.id
    });

    await customerObjectFour.save();

    let customerObjectFive = await Customer.create({

        stripeCustomerId: "393323ed3i38uf3j3j3ed",
        userId: globalUserFive.id
    });

    await customerObjectFive.save();

}

const populateEvents = async () => {



    try {

        let newUser = await User.create({
            firstName: "Test",
            lastName: "User",
            userName: "testuser",
            profilePhoto: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
            gender: "male",
            email: "testuser@test.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@testuser",
            phoneNumber: 4449993822,
            password: "password",
            role: "manager"
        });

        await newUser.save();

        let newRegion = await Region.create({
            cityArea: "Boston",
            referenceLat: 42.361145,
            referenceLong: -71.057083,
        });

        await newRegion.save();

        // need to create initial club objects

        let newClub = await Club.create({
            name: "the grand",
            latitude: 42.353130,
            longitude: -71.047218,
            instaHandle: "@thegrand",
            phoneNumber: 3939444444,
            address: "58 Seaport Blvd #300, Boston, MA 02210",
            website: "https://thegrandboston.com",
            userId: newUser.id,
            regionId: newRegion.id

        });

        await newClub.save();

        globalDummyClub = await Club.create({
            name: "bijou",
            latitude: 42.351238,
            longitude: -71.064209,
            instaHandle: "@thebijou",
            phoneNumber: 6173574565,
            address: "51 Stuart St, Boston, MA 02116",
            website: "https://www.bijouboston.com/",
            userId: newUser.id,
            regionId: newRegion.id

        });

        await globalDummyClub.save();

        let newClubThree = await Club.create({
            name: "cure lounge",
            latitude: 42.350731,
            longitude: -71.064728,
            instaHandle: "@curelounge",
            phoneNumber: 6176952250,
            address: "246 Tremont St, Boston, MA 02116",
            website: "nowebsite",
            userId: newUser.id,
            regionId: newRegion.id
        });

        await newClubThree.save();

        // need to create intial table configuration object


        globalDummyTableConfig = await TableConfiguration.create({
            type: "floor",
            price: 800,
            size: 8,
            availabilityCount: 30,
            clubId: newClub.id
        });

        await globalDummyTableConfig.save();


        let testEvent = await Event.create({
            name: "CoolEvent",
            picture: "https://www.rollingstone.com/wp-content/uploads/2018/10/green-day-band-portrait.jpg",
            eventDate: randomDate(new Date(2012, 0, 1), new Date()),
            eventTime: "fri 1-2-22",
            ticketLink: "tickets.com",
            clubId: newClub.id
        });

        await testEvent.save();


        for (let i = 0; i < 50; i++) {

            let chosenDate = randomDate(new Date(2012, 0, 1), new Date());

            let iterationUser = await Event.create({
                name: faker.company.companyName(),
                picture: faker.image.imageUrl(),
                eventDate: chosenDate,
                eventTime: chosenDate.toString(),
                ticketLink: faker.internet.url(),
                clubId: newClub.id
            });

            await iterationUser.save();
        }

    } catch (exception) {
        throw exception; 
    }


};

const populateTableRequests = async () => {

    // creating 2 more clubs to populate table requests

    try {

        let dummyTableReqNames = ["coolnight", "funride", "magiclights", "funwater", "bluemilk"];

        let newTestTableRequest = await TableRequest.create({
            name: "cooltable",
            tableConfigId: globalDummyTableConfig.id,
            costSplitType: 'pnsl',
            taken: 3,
            available: 5,
            mfRatio: 0.33333,
            isPolling: true,
            isActive: false,
            isClosed: false,
            requestPlacementTime: randomDate(new Date(2012, 0, 1), new Date()),
            activeGroupStartTime: null,
            activeGroupEndTime: null,
            clubId: globalDummyClub.id
        });

        await newTestTableRequest.save();


        for (let i = 0; i < dummyTableReqNames.length; i++) {

            let iterationTableRequest = await TableRequest.create({
                name: dummyTableReqNames[i],
                tableConfigId: globalDummyTableConfig.id,
                costSplitType: 'pnsl',
                taken: 3,
                available: 5,
                mfRatio: 0.33333,
                isPolling: true,
                isActive: false,
                isClosed: false,
                requestPlacementTime: randomDate(new Date(2012, 0, 1), new Date()),
                activeGroupStartTime: null,
                activeGroupEndTime: null,
                clubId: globalDummyClub.id

            });

            await iterationTableRequest.save();

        }

    } catch (exception) {

        throw exception; 

    }

};

const populateRegions = async () => {

    try {

        let regionNames = [
            "Miami",
            "Los Angeles",
            "New York",
            "San Francisco",
            "Seattle"
        ];

        let regionLatLongObjs = [
            {
                lat: 25.761681,
                long: -80.191788
            },
            {
                lat: 34.052235,
                long: -118.243683
            },
            {
                lat: 40.730610,
                long: -73.935242
            },
            {
                lat: 37.773972,
                long: -122.431297 
            },
            {
                lat: 47.608013,
                long: -122.335167
            }
        ]


        regionNames.forEach(async (region, index) => {

            let newRegion = await Region.create({
                cityArea: region,
                referenceLat: regionLatLongObjs[index].lat,
                referenceLong: regionLatLongObjs[index].long
            });

            await newRegion.save();

        });


    } catch (exception) {

        throw exception;
    }

};




exports.populateEvents = populateEvents;
exports.populateRegions = populateRegions;
exports.populateTableRequests = populateTableRequests;
exports.populateClubs = populateClubs;
exports.populateMessageChats = populateMessageChats;
exports.populateTableReqCustomPriceAgreementMappings = populateTableReqCustomPriceAgreementMappings;
exports.populateTransactions = populateTransactions;
exports.populateEmailValidationTokens = populateEmailValidationTokens;
exports.populateUserBlockedFriendMappings = populateUserBlockedFriendMappings;
exports.populateCustomers = populateCustomers;
