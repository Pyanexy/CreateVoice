const chalk = require('chalk');
const mongoose = require('mongoose')
const Guild = require('../models/guild.js');

module.exports = async (client, guild) => {
    Guild.create({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        OwnerID: guild.ownerID,
        room: []
    }).then(() => {
        console.log(chalk.hex('#4169E1')(`Сервер ${guild.name} добавлен в базу данных!`));
    })
}