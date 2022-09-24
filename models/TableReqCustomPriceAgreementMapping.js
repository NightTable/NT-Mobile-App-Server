// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableReqCustomPriceAgreementMappingSchema = new Schema({
    tableReqId: {
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: true
    },
    participantRequesterId: {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    agreeingParticipantsIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    }],
    numParticipantsAgreed: {
        type: Number,
        required: true
    },
    numAgreeingParticipantsNeeded: {
        type: Number,
        required: true
    },
    isDisagreed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('TableReqCustomPriceAgreementMapping', tableReqCustomPriceAgreementMappingSchema);