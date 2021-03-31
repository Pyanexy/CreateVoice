const mongoose = require('mongoose');
const Guild = require('../models/guild');
const chalk = require('chalk');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    Guild.findOne({
        guildID: message.guild.id
    }, async (err, data) => {
    if(!data) {
        Guild.create({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            ownerID: message.guild.OwnerID,
            room: []
        })
        return;
    }
    let prefix = data.prefix

    if (message.content.toLowerCase() ===`<@${client.user.id}>` || message.content.toLowerCase() ===`<@!${client.user.id}>`) {
        message.channel.send(`Мой префикс на сервере: \`${prefix}\``)
    }
    
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
    message.member = await message.guild.fetchMember(message);
  
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if(!client.owner.includes(message.author.id) && command.owner === true)  return message.channel.send('У вас нет прав на использование данной команды.')
    if (command) command.run(client, message, args, prefix);
    })
}