const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    organizerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "organizerId is required"],
    },
    tableRequestId:{
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: [true, "tableRequestId is required"],
    },
    joiningFee: {
        type: Number,
        // required: [true, "eventDate is required"],
    },
    isDeleted: {
        type:Boolean,
        default: false
    },
    invitee: {
        type: String,
        required: true
        //phone number of either an external new user or internal
    },
    isAccepted: {
        type: Boolean,
        required: true
        //whether or not this invite was accepted or declined
    }
},{timestamps:true});

module.exports = mongoose.model('Invite', inviteSchema);