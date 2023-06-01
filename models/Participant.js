const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type:Number,
        required: true
    },
    // isExternalUser: {
    //     type: Boolean,
    //     required: true
    // },
    isRepresentative:{
        type:Boolean,
        default:false
    },
    isPaymentInfoRegistered: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Participant', participantSchema);