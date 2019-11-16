const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: String,
    ownerId: String
});

module.exports = mongoose.model('House', houseSchema);