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