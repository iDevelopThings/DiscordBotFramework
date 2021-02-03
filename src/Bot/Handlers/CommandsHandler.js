/**
 * Created by Sam on 15/04/2017.
 */

'use strict';

const Handler = require('../Base/Handler.js');

class CommandsHandler extends Handler {

	constructor()
	{
		super();
		this.prefix   = '!';
		this.commands = [];
	}

	init()
	{
		super.init();
	}

	setCommands(commands)
	{
		this.commands = commands;
	}

	reload()
	{
		this.commands = [];
	}

	handle(message)
	{
		if (message.content[0] !== this.prefix)
			return;

		console.time('command handling');

		let command = this.parseCommand(message.content);

		if (!command) return;

		console.info(`[${command.class._admin ? 'ADMIN ' : ''}COMMAND] ${message.author.username}@${command.class._command}`);

		if (command.class.allowedInDm === false && message.channel.type === 'dm') {
			return;
		}

		/*if (command.class.admin) {
			let isAdmin = message.member.roles.find(val => (val.name === 'Administrator' || val.name === 'Owner' || val.name === 'Admin'));
			if (!isAdmin) {
				console.info(`[${command.class._admin ? 'ADMIN ' : ''}COMMAND] ${message.author.username}@${command.class._command} - Admin permissions required.`);
				return;
			}
		}*/

		if (command.class.roles.length) {
			let hasRole = message.member.roles.cache.find(val => command.class.roles.includes(val.name));
			if (!hasRole) {
				console.info(`[PERMS REQUIRED] ${message.author.username}@${command.class._command} - User doesnt have any of these roles, ${command.class.roles.join(', ')}`);
				return;
			}
		}

		command.class._params  = command.params;
		command.class._message = message;
		command.class.handle(message, command.parts)
			.then(response => {
				console.timeEnd('command handling');
			});

	}

	/**
	 * Will take the text sent and convert it to a command
	 *
	 * @param text
	 * @returns {*}
	 */
	parseCommand(text)
	{
		let commandMessage = text.slice(1, text.length);
		let commandParts   = commandMessage.split(' ');

		let commandClass = this.commands[commandParts[0]];

		if (!commandClass) {

			//Handle aliases
			for (let c in this.commands) {

				let command = this.commands[c];

				if (command.aliases) {
					for (let a in command.aliases) {
						if (command.aliases[a] === commandParts[0]) {
							return {
								trigger    : commandParts[0], //comand start, ex !ping
								params     : this.commandParams(commandParts, this.commands[c]),
								parts      : commandParts,
								class      : this.commands[c],
								usingAlias : true,
							};
						}
					}
				}
			}

			return null;
		}

		return {
			trigger    : commandParts[0], //comand start, ex !ping
			params     : this.commandParams(commandParts, commandClass),
			parts      : commandParts,
			class      : commandClass,
			usingAlias : false,
		};
	}

	/**
	 * Parse the command parameters
	 *
	 * @param commandParts
	 * @param command
	 */
	commandParams(commandParts, command)
	{
		commandParts.shift();

		const reg  = /{\s*(.*?)\s*}/g;
		let match  = null;
		const args = {};

		let index = 0;
		while ((match = reg.exec(command.command)) !== null && index < commandParts.length) {
			if (match[1].startsWith('"') && match[1].endsWith('"')) {
				let paramName = match[1].substr(1, match[1].length - 2);
				let str       = '';

				do {
					str += commandParts[index] + ' ';

					if (commandParts[index].endsWith('"')) {
						break;
					}
				} while (++index < commandParts.length);

				let value = str.substr(0, str.length - 1);

				if (value[0] === '"') {
					value = value.substr(1, value.length);
				}
				if (value[value.length - 1] === '"') {
					value = value.substr(0, value.length - 1);
				}

				args[paramName] = value;
			} else {
				args[match[1]] = commandParts[index];
			}

			index++;
		}

		return args;
	}

}

module.exports = CommandsHandler;
