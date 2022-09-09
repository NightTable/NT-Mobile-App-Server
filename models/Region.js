const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regionSchema = new Schema({
    cityArea: {
        type: String,
        required: true
    },
    referenceLat: {
        type: Number,
        required: true,
    },
    referenceLong: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Region', regionSchema);