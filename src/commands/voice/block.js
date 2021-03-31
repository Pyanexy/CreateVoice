const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild.js');

module.exports = {
    name: 'block',
    aliases: ['b', 'заблокировать', 'бан'],
    description: 'Заблокировать доступ к каналу.',
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
                        if(client.channels.cache.get(element.id).permissionOverwrites.find(f => f.id == mention.id).deny.toArray() == 'CONNECT') {
                            message.channel.send('Пользователь уже заблокирован.')
                            return;
                        }
                    }
                    client.channels.cache.get(element.id).createOverwrite(client.guilds.cache.get(message.guild.id).members.cache.get(mention.id), {
                        'CONNECT': false
                    }).then(() => {
                        if(client.channels.cache.get(element.id).members.get(mention.id) !== undefined) {
                            client.channels.cache.get(element.id).members.get(mention.id).voice.kick()
                        }
                    }).then(() => {
                        message.channel.send(embed.setDescription(`Пользователь ${mention} получил ограничение в канале \`${client.channels.cache.get(element.id).name}\``))
                    })
                }
            })
        }
    }
}