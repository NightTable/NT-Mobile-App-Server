const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableConfigurationSchema = new Schema({
    type: {
       type: String,
       required: true 
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    availabilityCount: {
        type: Number,
        required: true
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
});

tableConfigurationSchema.index({type: 1, clubId: 1}, {unique: true});

const tableConfigModel = mongoose.model('TableConfiguration', tableConfigurationSchema);
tableConfigModel.createIndexes();


module.exports = mongoose.model('TableConfiguration', tableConfigurationSchema);