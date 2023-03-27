const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
      type: String,
      required: [true, "name of event is required"],
    },
    picture: {
        type: String,
        required: [true, "picture is required"],
    },
    eventDate: {
        type: Date,
        // required: [true, "eventDate is required"],
    },
    eventTime: {
        type: String,
        required: [true, "eventTime is required"],
    },
    ticketLink: {
        type: String,
        required: [true, "ticketLink is required"],
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, "clubId is required"],
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('Event', eventSchema);