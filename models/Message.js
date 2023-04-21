  

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messageChatId: {
        type: Schema.Types.ObjectId,
        ref: 'MessageChat',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);