const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.owner = require('./json/owner.json');
client.mongoose = require('./utils/mongoose.js');

["command", "event"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.mongoose.init()
client.login(require('./json/keys.json').tokens.Discord)