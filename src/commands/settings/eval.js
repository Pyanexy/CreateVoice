const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const Guild = require('../../models/guild.js');

module.exports = {
    name: 'eval',
	aliases: ['e'],
	owner: true,
    run: async (client, message, args) => {
	    if (!args[0]) {
	    	message.channel.send('Какой код? Зачем?')
	    	return
	    }

	    try{
	    	let evaled = eval(args.join(' '));
	    	if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
	    	let eevaled = typeof evaled; 
	    	evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
	    	const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
	    	if(evaled === `undefined`) evaled = `Undefined`
	    	if(args.join(" ").toLowerCase().includes("token")) return;
	    	message.channel.send(stripIndents`
	    	Тип: ${tyype}
	    	Done for: ${new Date().getTime() - message.createdTimestamp + 'ms'}
	    	\n${evaled}`, {code: 'js', split: '\n'}).then(() => message.react("✅"))
	    } catch(e) {
			message.channel.send(stripIndents`Ошибочка❎
				\n${e}`, {code: "js", split: "\n"}).then(() => message.react("❎"))
	    }
    }
}
