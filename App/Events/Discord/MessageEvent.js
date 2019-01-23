const EventListener = require('./../../../src/Bot/Base/Event/EventListener');

class MessageEvent extends EventListener {

	async handle(message)
	{
		console.log('message event');
	}

}

module.exports = MessageEvent;