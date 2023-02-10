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
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('Event', eventSchema);