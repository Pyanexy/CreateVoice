const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild.js');

module.exports = {
    name: 'lock',
    aliases: ['l', 'закрыть'],
    description: 'Закрыть комнату.',
    owner: false,
    run: async (client, message, args, prefix) => {
        let data = await Guild.findOne({guildID: message.guild.id})
        let embed = new MessageEmbed()
        .setColor(require('../../json/config.json').color)
        data.room.forEach(async element => {
            if(client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                let role = ['702504780215615569', '654316521207758858']
                for (const roles of role) {
                    client.channels.cache.get(element.id).createOverwrite(roles, {
                        'VIEW_CHANNEL': false,
                        'CONNECT': false,
                    })
                }
            await message.channel.send(embed.setDescription(`Канал \`${client.channels.cache.get(element.id).name}\` был закрыт`))
            } else {
                return;
            }
        })
    }
}