const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild.js');

module.exports = {
    name: 'room',
    aliases: ['r', 'комната'],
    description: 'Сделать войс комнатой для создания',
    owner: false,
    run: async (client, message, args, prefix) => {
        if(!args[0]) return message.channel.send('Введите ID войса.')
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Вы не имеете администратора.')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('У меня нет прав управлять каналами.')
        if(isNaN(args[0]) == true) return message.channel.send('Как ЧИСЛОВОЙ ID стал буквенным?')
        if(client.channels.cache.get(args[0]) !== undefined && client.channels.cache.get(args[0]).type == 'voice') {
            let data = await Guild.findOne({guildID: message.guild.id})
            data.updateOne({roomCreate: args[0]}).then(() => {
                message.channel.send(`Войс \`${client.channels.cache.get(args[0]).name}\` теперь создает комнаты`)
            })
        }else{
            message.channel.send('Ты что за ID мне пихаешь?')
        }
    }
}