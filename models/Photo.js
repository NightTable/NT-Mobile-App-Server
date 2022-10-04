// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: false
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }
});

module.exports = mongoose.model('Photo', photoSchema);