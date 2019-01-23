const EventListener = require('./../../Base/Event/EventListener');

class MessageEvent extends EventListener {

	/**
	 *
	 * @param reaction {MessageReaction}
	 * @param user
	 * @returns {Promise<void>}
	 */
	async handle(reaction, user)
	{
		let reactionHandler = this.instance.handler('MessageReactionHandler');

		//Handle any "MessageReactionHandlers"
		if (reactionHandler.messages[reaction.message.id] !== undefined) {
			let handle = reactionHandler.messages[reaction.message.id];

			handle.handle(reaction, user);
		}
	}

}

module.exports = MessageEvent;