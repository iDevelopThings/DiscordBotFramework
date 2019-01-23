const database = require('./src/Bot/Base/Database');
const Command  = require('./src/Bot/Models/Command');
const fs       = require('fs');

async function migrate()
{
	fs.readFile(__dirname + '/data/other-commands.json', (error, data) => {

		let commands = JSON.parse(data);
		for (let index in commands) {
			let command = commands[index];
			Command.query().insert({
				command    : command.command,
				type       : command.type,
				content    : command.content,
				created_at : new Date(),
				updated_at : new Date(),
			}).then(console.log)

		}
	});
}

migrate();