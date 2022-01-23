module.exports = {
    name: 'prefix',
    description: 'Изменение префикса,
    aliases: ["set-prefix"],
    owner: false,
    run: async(client, message, args, prefix) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("у вас нет прав");
        if(!args[0]) return message.reply(`set the prefix name`)
        if(args[0].length > 5) return message.reply(`Длинна префикса может составлять 5 значений`)

        let data = await Guild.findOne({ guildID: message.guild.id })

        let embed = new MessageEmbed()
        .setColor(require("./json/config.json").color)
        .setDescription(`Новый префикс: \`${args[0]}\``)
        message.channel.send(embed)

        data.prefix = args[0]; data.save();
    }
  }
