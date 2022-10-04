// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated. 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reservationOrganizerName: {
        type: String,
        required: true
    },
    reservationOrganizerPhone: {
        type: String,
        required: true,
    },
    numReservedTables: {
        type: Number,
        required: true
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    reservationCreationDate: {
        type: Date,
        required: true
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
});

module.exports = mongoose.model('Reservation', reservationSchema);
