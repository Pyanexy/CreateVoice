const chalk = require('chalk');
const mongoose = require('mongoose')
const Guild = require('../models/guild.js');

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log(chalk.hex('#4169E1')(`Сервер ${guild.name} удален с базы данных!`));
    });
};