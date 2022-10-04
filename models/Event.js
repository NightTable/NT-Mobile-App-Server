// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    picture: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    ticketLink: {
        type: String,
        required: true,
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);