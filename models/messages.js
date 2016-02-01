// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    name: String,
    message: String,
    id: { type: Number },
    finish: { type: Number }
});

module.exports = mongoose.model('Message', MessageSchema);