// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

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