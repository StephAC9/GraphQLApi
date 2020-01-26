const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    imageURL: String,
});

module.exports = mongoose.model('Owners', ownerSchema);