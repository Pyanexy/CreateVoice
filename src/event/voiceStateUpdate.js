const chalk = require('chalk');
const mongoose = require('mongoose');
const Guild = require('../models/guild.js');
const { CreateRoom } = require('../utils/models.js');

module.exports = async (client, oldState, newState) => {
    let oldMember = oldState.member
    let newMember = newState.member
    let data = await Guild.findOne({ guildID: newMember.guild.id })
    if (newMember.id != client.user.id && newMember.voice.channel != undefined && !newMember.user.bot) {
        if (newMember.voice.channelID == data.roomCreate) {
            CreateRoom(client, newState)(newMember);
        } else {
            return;
        }
    } else if (oldMember.id != client.user.id && oldMember.voice.channel == null) {
        let channels = [];
        data.room.forEach(element => {
            let channel = client.channels.cache.get(element.id);
            if (channel != undefined) {
                if (channel.type == 'voice') {
                    if (channel.members.array().length == 0) {
                        channel.delete({ timeout: 1 });
                        data.updateOne({ $pull: { room: { id: channel.id } } }).then(console.log(`${channel.name} удален`))
                    } else {
                        channels.push(element);
                    }
                }
            }
        });
        data.updateOne({ room: channels })
    }
}