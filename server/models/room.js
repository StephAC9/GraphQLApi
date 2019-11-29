const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Device = require('./device')

const roomSchema = new Schema({
    descriptor: String,
    houseId: String,
});
module.exports = mongoose.model('Rooms', roomSchema);