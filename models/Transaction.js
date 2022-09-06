// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true
    },
    isRefund: {
        type: Boolean,
        required: true
    },
    tableReqId: {
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: true
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);