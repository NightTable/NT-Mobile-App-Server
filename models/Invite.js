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
        ref: 'User',
        required: [true, "tableRequestId is required"],
    },
    joiningFee: {
        type: Number,
        // required: [true, "eventDate is required"],
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('Invite', inviteSchema);