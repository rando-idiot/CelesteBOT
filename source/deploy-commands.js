const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandFolder = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandFolder);
for (const commandFile of commandFiles) {
	const commandFilePath = path.join(commandFolder, commandFile);
	const command = require(commandFilePath);
	if ('data' in command && 'execute' in command) { commands.push(command.data) }
    else { log.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`) };
};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();