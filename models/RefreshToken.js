const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);