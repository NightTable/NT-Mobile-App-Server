// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

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
    isExternalUser: {
        type: Boolean,
        required: true
    },
    isPaymentInfoRegistered: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Participant', participantSchema);