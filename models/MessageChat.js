const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageChatSchema = new Schema({
    sourceUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isUnRead: {
        type: Boolean,
        required: false
    },
    lastMessage: {
        type: String,
        required: false
    },
    isSourceDeleted: {
        type: Boolean,
        required: true
    },
    isTargetDeleted: {
        type: Boolean,
        required: true
    }
});

messageChatSchema.index({ sourceUserId: 1, targetUserId: 1}, { unique: true });

module.exports = mongoose.model('MessageChat', messageChatSchema);