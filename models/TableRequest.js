  

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableRequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tableConfigId: {
        type: Schema.Types.ObjectId,
        ref: 'TableConfiguration',
        required: true
    },
    customMinimum: {
        type:Number,
        required: true
    },
    // eventId:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Event',
    //     required: true
    // },
    joiningFee: {
        type: Number,
        required: true
    },
    organizerUserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    promoterId:{
        type: Schema.Types.ObjectId,
        ref: 'Representative',
        required: true
    },
    costSplitType: {
        type: String,
        required: true,
        enum:['pnsl', 'snpl']   
    },
    taken: {
        type: Number,
        require: true
    },
    available: {
        type: Number,
        required: true
    },
    eta:{
        type: Date
    },
    mfRatio: {
        type: Number,
        required: true
    },
    isPolling: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    isClosed: {
        type: Boolean,
        required: true
    },
    requestPlacementTime: {
        type: Date,
        required: true
    },
    activeGroupStartTime: {
        type: Date,
        required: false
    },
    activeGroupEndTime: {
        type: Date,
        required: false
    },   
    // clubId: { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Club',
    //     required: true
    // }
});

module.exports = mongoose.model('TableRequest', tableRequestSchema);