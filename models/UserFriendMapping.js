// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userFriendMappingSchema = new Schema({
    sourceId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

userFriendMappingSchema.index({ sourceId: 1, targetId: 1}, { unique: true });

module.exports = mongoose.model('UserFriendMapping', userFriendMappingSchema);