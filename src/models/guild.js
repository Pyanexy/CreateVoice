const mongoose = require('mongoose')

const guildShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: { type: String },
    prefix: { type: String, default: require('../json/config.json').prefix },
    ownerID: { type: String },
    roomCreate: { type: String, default: "" },
    room: { type: Array }
})

module.exports = mongoose.model('Guild', guildShema);