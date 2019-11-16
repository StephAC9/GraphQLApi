const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    descriptor: String,
    status: String,
    roomId: String
});

module.exports = mongoose.model('Device', deviceSchema);