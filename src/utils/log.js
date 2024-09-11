// Exports a bunch of different functions to nicely format logs with chalk and dayjs

const chalk = require('chalk');
const dayjs = require('dayjs');

function getDateAndTime() {
    return dayjs().format("(DD/MM)[[]HH:MM:ss] ");
};

module.exports = {

    info(message) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.hex('#AAAAAA')("[INFO] " + message));
    },

    debug(message) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.gray("[DEBUG] " + message));
    },

    start(message) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.cyanBright("[START] " + message));
    },

    ready(message) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.bold.greenBright("[READY] " + message));
    },

    exit(message) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.magentaBright("[EXIT] " + message));
    },

    warn(message) {
        const now = getDateAndTime();
        console.warn(chalk.gray(now) + chalk.yellowBright("[WARN] " + message));
    },

    error(message) {
        const now = getDateAndTime();
        console.error(chalk.gray(now) + chalk.redBright("[ERROR] " + message));
    },

    action(actor, action) {
        const now = getDateAndTime();
        console.log(chalk.gray(now) + chalk.hex('#AAAAAA')("[INFO] " + chalk.blueBright(actor) + " " + action));
    }
};