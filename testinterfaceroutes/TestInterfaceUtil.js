  


const tiClubControllerRoutes = require('./TIClubController');
const tiCustomerControllerRoutes = require('./TICustomerController');
const tiEmailValidationTokenControllerRoutes = require('./TIEmailValidationToken');
const tiEventControllerRoutes = require('./TIEventController');
const tiMessageChatControllerRoutes = require('./TiMessageChatController');
const tiMessageControllerRoutes = require('./TIMessageController');
const tiParticipantControllerRoutes = require('./TIParticipantController');
const tiPhotoControllerRoutes = require('./TIPhotoController');
const tiRefreshControllerRoutes = require('./TIRefreshTokenController');
const tiRegionControllerRoutes = require('./TIRegionController');
const tiRoomControllerRoutes = require('./TIRoomController');
const tiTableConfigurationControllerRoutes = require('./TITableConfigurationController');
const tiTableRequestCustomPriceAgreementMappingControllerRoutes = require('./TITableReqCustomPriceAgreementMapping');
const tiTableRequestControllerRoutes = require('./TITableRequestController');
const tiTableRequestParticipantMappingControllerRoutes = require('./TITableRequestParticipantMapping');
const tiTableRequestTransactionControllerRoutes = require('./TITransactionController');
const tiTableRequestUserControllerRoutes = require('./TIUser');
const tiUserBlockedFriendMappingControllerRoutes = require('./TIUserBlockedFriendMapping');
const tiUserFriendMappingControllerRoutes = require('./TIUserFriendMapping');

const configureTestInterfaceRoutes = (appObject) => {

    console.log("This is a test routes");

    appObject.use('/api/testinterface/club', tiClubControllerRoutes);
    appObject.use('/api/testinterface/customer', tiCustomerControllerRoutes);
    appObject.use('/api/testinterface/emailvalidationtoken', tiEmailValidationTokenControllerRoutes);
    appObject.use('/api/testinterface/event', tiEventControllerRoutes);
    appObject.use('/api/testinterface/messagechat', tiMessageChatControllerRoutes);
    appObject.use('/api/testinterface/message', tiMessageControllerRoutes);
    appObject.use('/api/testinterface/participant', tiParticipantControllerRoutes);
    appObject.use('/api/testinterface/photo', tiPhotoControllerRoutes);
    appObject.use('/api/testinterface/refreshtoken', tiRefreshControllerRoutes);
    appObject.use('/api/testinterface/region', tiRegionControllerRoutes);
    appObject.use('/api/testinterface/room', tiRoomControllerRoutes);
    appObject.use('/api/testinterface/tableconfiguration', tiTableConfigurationControllerRoutes);
    appObject.use('/api/testinterface/tablereqcustompriceagreementmapping', tiTableRequestCustomPriceAgreementMappingControllerRoutes);
    appObject.use('/api/testinterface/tablerequest', tiTableRequestControllerRoutes);
    appObject.use('/api/testinterface/tablerequestparticipantmapping', tiTableRequestParticipantMappingControllerRoutes);
    appObject.use('/api/testinterface/transaction', tiTableRequestTransactionControllerRoutes);
    appObject.use('/api/testinterface/user', tiTableRequestUserControllerRoutes);
    appObject.use('/api/testinterface/userblockedfriendmapping', tiUserBlockedFriendMappingControllerRoutes);
    appObject.use('/api/testinterface/userfriendmapping', tiUserFriendMappingControllerRoutes);

};

exports.configureTestInterfaceRoutes = configureTestInterfaceRoutes;