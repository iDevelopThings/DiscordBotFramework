const EventListener = require('./../../Base/Event/EventListener');
const Discord       = require('discord.js');

class RawEvent extends EventListener {
	
	constructor(bot, instance)
	{
		super(bot, instance);
		
		this.events = {
			MESSAGE_REACTION_ADD : 'messageReactionAdd',
		};
	}
	
	async handle(event)
	{
		if (!this.events.hasOwnProperty(event.t)) return;
		
		const {d : data} = event;
		const user       = this.bot.users.cache.get(data.user_id);
		const channel    = this.bot.channels.cache.get(data.channel_id) || await user.createDM();
		
		if (channel.messages.cache.has(data.message_id)) return;
		
		/**
		 * @type {Message}
		 */
		const message  = await channel.messages.fetch(data.message_id);
		const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
		
		let reaction = message.reactions.cache.get(emojiKey);
		
		if (!reaction) {
			const emoji = new Discord.Emoji(this.bot, data.emoji);
			reaction    = new Discord.MessageReaction(this.bot, emoji, message);
		}
		
		this.bot.emit(this.events[event.t], reaction, user);
	}
	
}

module.exports = RawEvent;
