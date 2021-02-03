/**
 * Created by Sam on 15/04/2017.
 */

'use strict';

const Command = require('./../../src/Bot/Base/Command.js');

class RolesCommand extends Command {

	constructor()
	{
		super();
		this._command     = 'roletest';
		this._name        = 'RoleTest';
		this._description = 'Tests if roles param is working';

	}

	async handle(message)
	{
		message.channel.send('Ponggggg!');
	}

}

module.exports = RolesCommand;
