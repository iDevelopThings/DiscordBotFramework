/**
 * Created by Sam on 15/04/2017.
 */

'use strict';

const Command = require('./../../src/Bot/Base/Command.js');

class Ping extends Command {

	constructor()
	{
		super();
		this._command     = 'ping {test?}';
		this._name        = 'Ping';
		this._description = 'Returns pong!';

	}

	async handle(message)
	{
		message.channel.send('Ponggggg!');
	}

}

module.exports = Ping;