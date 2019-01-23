const EventListener = require('./../../Base/Event/EventListener');

class MessageEvent extends EventListener {

    async handle(message)
    {
        if (message.author.id === process.env.DISCORD_BOT_ID)
            return;

        this.instance.handler('CommandsHandler').handle(message);
    }

}

module.exports = MessageEvent;