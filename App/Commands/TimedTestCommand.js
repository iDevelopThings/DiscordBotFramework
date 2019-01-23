/**
 * Created by Sam on 15/04/2017.
 */


'use strict';

//import Command from './Command';

const TimedCommand = require('./../../src/Bot/Base/TimedCommand.js');

class TestTimedCommand extends TimedCommand {

	constructor()
	{
		super();
		this._command     = 'timed';
		this._name        = 'Timed';
		this._description = 'Test timed command';
		this._autostart   = true;
		this._time        = 10000;
		this._loop        = false;
	}

	async beforeStart(message, parts)
	{
		await super.beforeStart(message, parts);

		this.instance.handler('ReactionInputMessageHandler')
			.confirm(message, 'Hello!')
			.addReaction('☑', () => {
				message.reply('A checkmark :o');
			})
			.onNoInput(() => {
				message.reply('Aww bro, why u no respond to meh');
			})
			.send();

		return true;
	}

	async tick(message, parts)
	{
		message.reply('Hello sir');
	}

	async afterStart(message, parts)
	{
		await super.afterStart(message, parts);
	}

}

module.exports = TestTimedCommand;