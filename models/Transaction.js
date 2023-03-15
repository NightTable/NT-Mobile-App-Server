  

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
    transactionCreatedDate: {
        type: Date,
        required: true
    },
    numTablesPurchased: {
        type: Number,
        required: true
    },
    reservationId: {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    representativeId: {
        type: Schema.Types.ObjectId,
        ref: 'Representative',
        required: true
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    tableReqId: {
        type: Schema.Types.ObjectId,
        ref: 'TableRequest',
        required: true
    }
});


module.exports = mongoose.model('Transaction', transactionSchema); 