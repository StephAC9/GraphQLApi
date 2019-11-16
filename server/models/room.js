const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    descriptor: String,
    houseId: String
});

module.exports = mongoose.model('Room', roomSchema);