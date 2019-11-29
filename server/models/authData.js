const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authDataSchema = new Schema({
    ownerId: String,
    token: String,
    tokenExpiration: Number
});
module.exports = mongoose.model('AuthData', authDataSchema);