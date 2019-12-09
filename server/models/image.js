const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    descriptor: String,
    imageUrl: String,
});
module.exports = mongoose.model('Images', imageSchema);