const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    tableReqId: {
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: false
    },
    messageChatId: {
        type: Schema.Types.ObjectId,
        ref: 'MessageChat',
        required: false,
    }
});

module.exports = mongoose.model('Room', roomSchema);