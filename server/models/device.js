const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    descriptor: String,
    status: String,
    imageURL: String,
    roomId: String,
    houseId: String
});
//module.exports = deviceSchema
module.exports = mongoose.model('Devices', deviceSchema);