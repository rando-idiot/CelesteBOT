const { Events } = require('discord.js');
const log = require("../utils/log.js");
const { Users, Guilds } = require("../utils/database.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
        log.start(`Client logged on Discord as ${client.user.tag}`);
        await Users.sync();
        await Guilds.sync();
		log.ready(`CelesteBOT is ready to use`);
	},
};