const { readdirSync } = require("fs");
const chalk = require('chalk')
module.exports = (client) => {
        const events = readdirSync(`./src/event`).filter(file => file.endsWith(".js"));
    
        for (let file of events) {
            let ent = require(`../event/${file}`);
            let eName = file.split(".")[0]
            console.log(chalk.green`Enable '${eName}'`);
            client.on(eName, ent.bind(null, client))
        }
}