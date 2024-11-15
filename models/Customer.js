  

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    stripeCustomerId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
});

module.exports = mongoose.model('Customer', customerSchema);