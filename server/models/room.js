const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    descriptor: String,
    houseId: String,
    imageURL: String,
});
module.exports = mongoose.model('Rooms', roomSchema);