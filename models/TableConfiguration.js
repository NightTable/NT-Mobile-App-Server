// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableConfigurationSchema = new Schema({
    type: {
       type: String,
       required: true 
    },
    minPrice: {
        type: Number,
        required: true
    },
    recommendedCapacity: {
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