const TableRequestParticipantMapping = require('../models/TableRequestParticipantMapping');
const Club = require('../models/Club');
const User = require('../models/User');
const TableRequest = require('../models/TableRequest');
const Region = require('../models/Region');
const Participant = require('../models/Participant');
const TableConfiguration = require('../models/TableConfiguration');


const populateTableRequestParticipantMappings =  async() => {


    let userOneTrParticipantMap = await User.create({
        firstName: "UserOneParticipantMap",
        lastName: "Person",
        userName: "useroneparticipantmap",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "useroneparticipantmap@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@useroneparticipantmap",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await userOneTrParticipantMap.save();


    let userTwoTrParticipantMap = await User.create({
        firstName: "UserOneParticipantMap",
        lastName: "Person",
        userName: "useroneparticipantmap",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "usertwoparticipantmap@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@useroneparticipantmap",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await userTwoTrParticipantMap.save();


    let userThreeTrParticipantMap = await User.create({
        firstName: "UserThreeParticipantMap",
        lastName: "Person",
        userName: "useroneparticipantmap",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "userthreeparticipantmap@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@userthreeparticipantmap",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await userThreeTrParticipantMap.save();


    let userFourTrParticipantMap = await User.create({
        firstName: "UserFourParticipantMap",
        lastName: "Person",
        userName: "userfourparticipantmap",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "userfourparticipantmap@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@userfourparticipantmap",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await userFourTrParticipantMap.save();

    let sampleTrMapRegion = await Region.create({
        cityArea: "NotRealCity",
        referenceLat: 133,
        referenceLong: 101.2
    });

    await sampleTrMapRegion.save();


    let sampleClubTrParticipantMap = await Club.create({

        name: "SampleTrClub",
        latitude: 393.33,
        longitude: 101.23,
        instaHandle: "@sampleTrMapClub",
        phoneNumber: 3334443933,
        address: "393 Sample Tr Club Street",
        website: "www.sampletrclub.com",
        userId: userOneTrParticipantMap.id,
        regionId: sampleTrMapRegion.id

    });


    await sampleClubTrParticipantMap.save();


    let sampleTrParticipantTwo = await Participant.create({
        userId: userTwoTrParticipantMap.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
    });

    
    await sampleTrParticipantTwo.save();



    let sampleTrParticipantThree = await Participant.create({
        userId: userThreeTrParticipantMap.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true

        
    });

    
    await sampleTrParticipantThree.save();


    let sampleTrParticipantFour = await Participant.create({

        userId: userFourTrParticipantMap.id,
        email: null,
        isExternalUser: false,
        isPaymentInfoRegistered: true
        
    });

    
    await sampleTrParticipantFour.save();


    let exampleTableConfiguration = await TableConfiguration.create({

        type: "standing",
        price: 390,
        size: 12,
        availabilityCount: 1,
        clubId: sampleClubTrParticipantMap.id
    });

    await exampleTableConfiguration.save();


    let sampleTableRequestTrMap = await TableRequest.create({
        name: "sampletablereqmaptablerequest",
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
        clubId: sampleClubTrParticipantMap.id
    });

    await sampleTableRequestTrMap.save();



    let mainTrMappingOne = await TableRequestParticipantMapping.create({
        tableReqId: sampleTableRequestTrMap.id,
        participantId: sampleTrParticipantTwo.id,
        minimumPrice: 100,
        voluntaryShare: 23,
        costContribution: 30,
        isRequestOrganizer: true,
        isInvitedPending: false,
        isAccepted: false,
        isActiveParticipant: false,
        isRequestDefaultEntry: true,
        customPrice: null,
        isCustomPriceRequested: false,
        isCustomPriceGranted: false,
        isCostContributionFinalized: false
    });

    await mainTrMappingOne.save();


    let mainTrMappingTwo = await TableRequestParticipantMapping.create({
        tableReqId: sampleTableRequestTrMap.id,
        participantId: sampleTrParticipantThree.id,
        minimumPrice: 100,
        voluntaryShare: 23,
        costContribution: 30,
        isRequestOrganizer: true,
        isInvitedPending: false,
        isAccepted: false,
        isActiveParticipant: false,
        isRequestDefaultEntry: true,
        customPrice: null,
        isCustomPriceRequested: false,
        isCustomPriceGranted: false,
        isCostContributionFinalized: false
    });

    await mainTrMappingTwo.save();


    let mainTrMappingThree = await TableRequestParticipantMapping.create({
        tableReqId: sampleTableRequestTrMap.id,
        participantId: sampleTrParticipantFour.id,
        minimumPrice: 100,
        voluntaryShare: 23,
        costContribution: 30,
        isRequestOrganizer: true,
        isInvitedPending: false,
        isAccepted: false,
        isActiveParticipant: false,
        isRequestDefaultEntry: true,
        customPrice: null,
        isCustomPriceRequested: false,
        isCustomPriceGranted: false,
        isCostContributionFinalized: false

    });

    await mainTrMappingThree.save();

};

exports.populateTableRequestParticipantMappings = populateTableRequestParticipantMappings;

