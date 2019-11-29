const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const House = require('./house')

const authorSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    phoneNumber: String
});

module.exports = mongoose.model('Owners', authorSchema);