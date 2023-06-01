const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableConfigurationSchema = new Schema({
    type: {
       type: String,
       required: [true, "type is required"], 
    },
    minPrice: {
        type: Number,
        required: [true, "minPrice is required"],
    },
    recommendedCapacity: {
        type: Number,
        required: [true, "recommendedCapacity is required"],
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, "clubId is required"],
    },
    eventId:{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, "eventId is required"],
    },
    tableMapId:{
        type:String, 
        required: [true, 'tableMapId is required'],
        unique: true
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
},{timestamps: true});

// tableConfigurationSchema.index({type: 1, clubId: 1}, {unique: true});

// const tableConfigModel = mongoose.model('TableConfiguration', tableConfigurationSchema);
// tableConfigModel.createIndexes();


module.exports = mongoose.model('TableConfiguration', tableConfigurationSchema);