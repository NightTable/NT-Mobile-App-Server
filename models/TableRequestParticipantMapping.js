const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableRequestParticipantMappingSchema = new Schema({
    tableReqId: {
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: true
    },
    participantId: {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    minimumPrice: {
        type: Number,
        required: true
    },
    voluntaryShare: {
        type: Number,
        required: true
    },
    costContribution: {
        type: Number,
        required: true
    },
    isRequestOrganizer: {
        type: Boolean,
        required: true
    },
    isInvitedPending: {
        type: Boolean,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true
    },
    isActiveParticipant: {
        type: Boolean,
        required: true
    },
    isRequestDefaultEntry: {
        type: Boolean,
        required: true
    },
    customPrice: {
        type: Number,
        required: false
    },
    isCustomPriceRequested: {
        type: Boolean,
        required: true
    },
    isCustomPriceGranted: {
        type: Boolean,
        required: true
    },
    isCostContributionFinalized: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('TableRequestParticipantMapping', tableRequestParticipantMappingSchema);