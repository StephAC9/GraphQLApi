const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('./room')

const houseSchema = new Schema({
    address: String,
    ownerId: String,
});

module.exports = mongoose.model('Houses', houseSchema);