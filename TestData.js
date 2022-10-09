const Club = require('./models/Club');
const Region = require('./models/Region');
const Room = require('./models/Room');
const TableRequest = require('./models/TableRequest');
const TableConfiguration = require('./models/TableConfiguration');
const { ObjectId } = require('mongodb');
const User = require('./models/User');
const Participant = require('./models/Participant');
const TableRequestParticipantMapping = require('./models/TableRequestParticipantMapping');

const populateForGetTableRequestByClubId = async () => {
    const clubForGetTableRequestByClubId = await Club.create({
        name: "ClubForGetTableRequestByClubId",
        lattitude: 4,
        longitude: 37,
        instaHandle: "@clubForGetTableRequestByClubId",
        phoneNumber: 1234567890,
        website: "www.clubForGetTableRequestByClubId.com",
        regionId: new ObjectId(),
        stripeAccountNumber: "123dfjdkdk34895g",
        representativeId: new ObjectId()
    });
    await clubForGetTableRequestByClubId.save();

    const tableConfigForGetTableRequestByClubId = await TableConfiguration.create({
        type: "DJ ForGetTableRequestByClubId",
        minPrice: 20000,
        recommendedCapacity: 2,
        clubId: clubForGetTableRequestByClubId._id
    });
    await tableConfigForGetTableRequestByClubId.save();

    const tableRequestForGetTableRequestByClubId = await TableRequest.create({
        name: "tableRequestForGetTableRequestByClubId",
        tableConfigId: tableConfigForGetTableRequestByClubId._id,
        costSplitType: "pnsl",
        taken: 1,
        available: 1,
        mfRatio: 0,
        isPolling: true,
        isActive: false,
        isClosed: false,
        requestPlacementTime: new Date(),
        clubId: clubForGetTableRequestByClubId._id
    });
    await tableRequestForGetTableRequestByClubId.save();

    const userForGetTableRequestByClubId = await User.create({
        firstName: "FirstNameForGetTableRequestByClubId",
        lastName: "LastNameForGetTableRequestByClubId",
        userName: "userNameForGetTableRequestByClubId",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        isProfileSetup: true,
        isIntermediarySetup: false,
        phoneNumber: 1234567890,
        password: "apassword"
    });
    await userForGetTableRequestByClubId.save();

    const participantForGetTableRequestByClubId = await Participant.create({
        userId: userForGetTableRequestByClubId._id,
        isExternalUser: false,
        isPaymentInfoRegistered: true,
    });
    await participantForGetTableRequestByClubId.save();

    const trpmForGetTableRequestByClubId = await TableRequestParticipantMapping.create({
        tableReqId: tableRequestForGetTableRequestByClubId._id,
        participantId: participantForGetTableRequestByClubId._id,
        minimumPrice: 20000,
        voluntaryShare: 0,
        costContribution: 20000,
        isRequestOrganizer: true,
        isInvitedPending: false,
        isAccepted: true,
        isActiveParticipant: true,
        isCustomPriceRequested: false,
        isCustomPriceGranted: false,
        isCostContributionFinalized: true
    });
    await trpmForGetTableRequestByClubId.save();


}

exports.populateForGetTableRequestByClubId = populateForGetTableRequestByClubId;