const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild.js');

module.exports = {
    name: 'unblock',
    aliases: ['ub', 'разблокировать', 'разбан'],
    description: 'Разблокировать доступ к каналу.',
    owner: false,
    run: async (client, message, args, prefix) => {
        if(!args[0]) return message.channel.send('Упомяните пользователя.');
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(mention) {
            let data = await Guild.findOne({guildID: message.guild.id})
            let embed = new MessageEmbed()
            .setColor(require('../../json/config.json').color)
            data.room.forEach(element => {
                if(client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                    if(mention.id == message.author.id) return;
                    if(client.channels.cache.get(element.id).permissionOverwrites.find(f => f.id == mention.id) !== undefined) {
                        if(client.channels.cache.get(element.id).permissionOverwrites.find(f => f.id == mention.id).allow.toArray() == 'CONNECT') {
                            message.channel.send('Пользователь не имеет блокировку.')
                            return;
                        }
                    }
                    client.channels.cache.get(element.id).createOverwrite(client.guilds.cache.get(message.guild.id).members.cache.get(mention.id), {
                        'CONNECT': true
                    }).then(() => {
                        message.channel.send(embed.setDescription(`У пользователя ${mention} снято ограничение в канале \`${client.channels.cache.get(element.id).name}\``))
                    })
                }
            })
        }
    }
}