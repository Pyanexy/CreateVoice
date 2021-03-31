const mongoose = require('mongoose');
const chalk = require('chalk');


module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
// mongodb://localhost:27017/wardVoice
// require('../json/keys.json').tokens.MongoDB
        mongoose.connect(require('../json/keys.json').tokens.MongoDB, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log(`${chalk.green('Mongoose')} успешно подключился.`);
        });

        mongoose.connection.on('err', err => {
            console.error(`${chalk.green('Mongoose')} произошла ошибка: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(`${chalk.green('Mongoose')} соединение потеряно.`);
        });
    }
}