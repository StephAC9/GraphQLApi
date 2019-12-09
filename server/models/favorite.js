const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    deviceId: String,
    descriptor: String,
    status: String,
    imageURL: String,
    roomDescriptor: String,
    houseId: String
});
module.exports = mongoose.model('Favorites', favoriteSchema);