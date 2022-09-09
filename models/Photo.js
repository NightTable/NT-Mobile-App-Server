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