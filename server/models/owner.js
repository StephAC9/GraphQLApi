const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    phoneNumber: String,
    imageURL: String,
});

module.exports = mongoose.model('Owners', authorSchema);