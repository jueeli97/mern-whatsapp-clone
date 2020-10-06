let mongoose = require("mongoose");

let whatsappSchema = mongoose.Schema({
    message : String,
    name : String,
    timestamp : String,
    received : Boolean
});

let whatsappModel = mongoose.model('messagecontents', whatsappSchema);

module.exports = whatsappModel;