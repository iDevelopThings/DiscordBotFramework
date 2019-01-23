/**
 * Created by Sam on 15/04/2017.
 */


'use strict';

//import Command from './Command';

const Command = require('./../../src/Bot/Base/Command.js');

class ReactionCommand extends Command {

	constructor()
	{
		super();
		this._command     = 'reaction';
		this._name        = 'Reaction';
		this._description = 'Returns reaction test!';

	}

	async handle(message)
	{
		this.instance.handler('ReactionInputMessageHandler')
			.confirm(message, 'Hello!')
			.addReaction('☑', () => {
				message.reply('A checkmark :o');
			})
			.onNoInput(() => {
				message.reply('Aww bro, why u no respond to meh');
			})
			.send();

	}

}

module.exports = ReactionCommand;