// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const express = require('express');

const User = require('../models/User');
const Club = require('../models/Club');
const Event = require('../models/Event');
const Photo = require('../models/Photo');
const TableRequest = require('../models/TableRequest');
const Region = require('../models/Region');
const Participant = require('../models/Participant');
const MessageChat = require('../models/MessageChat');
const TableReqCustomPriceAgreementMapping = require('../models/TableReqCustomPriceAgreementMapping');
const EmailValidationToken = require('../models/EmailValidationToken');
const Room = require('../models/Room');
const UserBlockedFriendMapping = require('../models/UserBlockedFriendMapping');
const Customer = require('../models/Customer');
const RefreshToken = require('../models/RefreshToken');
const UserFriendMapping = require('../models/UserFriendMapping');
const TableConfiguration = require('../models/TableConfiguration');


const { 
    populateEvents,
    populateTableRequests,
    populateRegions,
    populateEmailValidationTokens, 
    populateUserBlockedFriendMappings,
    populateCustomers,
    populateClubs,
    populateMessageChats,
    populateTransactions,
    populateTableReqCustomPriceAgreementMappings,
} = require('../populationScripts');

const { populateParticipants } = require('../PopulationScripts/PopulateParticipants');
const { populateRefreshTokens } = require('../PopulationScripts/PopulateRefreshTokens');
const { populateUserFriendMappings } = require('../PopulationScripts/PopulateUserFriendMappings');
const { populateRooms } = require('../PopulationScripts/PopulateRooms');
const { populatePhotos } = require('../PopulationScripts/PopulatePhotos');
const { populateTableRequestParticipantMappings } = require('../PopulationScripts/PopulateTableRequestParticipantMapping');
const { populateUsers } = require('../PopulationScripts/PopulateUsers');
const { populateTableConfigurations } = require('../PopulationScripts/PopulateTableConfigurations');
const { populateMessages } = require('../PopulationScripts/PopulateMessages');

const router = express.Router();

const repopulate = async (response) => {


    await Room.deleteMany();
    await Photo.deleteMany();
    await Region.deleteMany();
    await MessageChat.deleteMany();
    await TableReqCustomPriceAgreementMapping.deleteMany();
    await TableRequest.deleteMany();
    await Participant.deleteMany();
    await RefreshToken.deleteMany();
    await UserFriendMapping.deleteMany();
    await Event.deleteMany();
    await Club.deleteMany();
    await User.deleteMany();
    await EmailValidationToken.deleteMany();
    await UserBlockedFriendMapping.deleteMany();
    await Customer.deleteMany();
    await TableConfiguration.deleteMany();

    await populateRooms();
    await populatePhotos();
    await populateEvents();
    await populateTableRequests();
    await populateRegions();
    await populateClubs();
    await populateMessageChats();
    await populateTableRequestParticipantMappings();
    await populateTableReqCustomPriceAgreementMappings();
    await populateTransactions();
    await populateEmailValidationTokens();
    await populateUserFriendMappings();
    await populateUserBlockedFriendMappings();
    await populateCustomers();
    await populateParticipants();
    await populateRefreshTokens();
    await populateUsers();
    await populateTableConfigurations();
    await populateMessages();

    response.send("Deleted everything!");

};

router.get('/repopulate', (req, res) => {

    repopulate(res);
});




module.exports = router;
