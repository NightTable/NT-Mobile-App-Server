const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    instaHandle: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    regionId: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

clubSchema.index({ name: 1, userId: 1}, { unique: true });


module.exports = mongoose.model('Club', clubSchema);