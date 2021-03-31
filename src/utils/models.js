const Guild = require('../models/guild');

module.exports = {
    CreateRoom: (client, newState) => async function (newMember) {
        let room = await Guild.findOne({ guildID: newMember.guild.id })
        client.guilds.cache.get(newMember.guild.id).channels.create(`Войс - ${newMember.displayName}`, {
            type: 'voice',
            userLimit: 2,
            parent: newState.channel.parent
        }).then(channel => {
            channel.edit({
                permissionOverwrites: [
                    {
                        id: newMember.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: '702504780215615569',
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: newMember.id,
                        allow: ['MANAGE_CHANNELS', 'CONNECT', 'MOVE_MEMBERS']
                    }
                ]
            })
            newMember.voice.setChannel(channel);
            const vc_channel = channel.id;
            const vc_user = newMember.user.id;
            room.updateOne({ $push: { room: { id: vc_channel, authorId: vc_user } } }).then(console.log(`Войс ${newMember.displayName} создан`))
        })
    }
}