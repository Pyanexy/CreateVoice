const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.hex('#4169E1')(`${client.user.username} Успешно запустился!`));
    client.user.setPresence({
        activity: { name: 'Следящий за войсами' },
        status: "dnd",
    })
}