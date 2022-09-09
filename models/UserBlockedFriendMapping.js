const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userBlockedFriendMappingSchema = new Schema({
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

module.exports = mongoose.model('UserBlockedFriendMapping', userBlockedFriendMappingSchema);