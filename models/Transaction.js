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