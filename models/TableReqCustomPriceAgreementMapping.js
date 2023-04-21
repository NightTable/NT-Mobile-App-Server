  

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