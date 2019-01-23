/**
 * Created by Sam on 10/01/2019.
 */

'use strict';

const Handler = require('../Base/Handler.js');

class MessageReactionHandler extends Handler {

    constructor()
    {
        super();

        this.messages = [];
    }

    init()
    {
        super.init();
    }

    onReaction(message, handle, timeout = 30, onNoInput = null)
    {
        if (this.messages[message.id] !== undefined) {
            return;
        }

        this.messages[message.id] = {
            handle          : handle,
            message         : message,
            timeoutInterval : null,
        };

        let progress        = 0;
        let originalContent = message.content;
        let reaction        = this.messages[message.id];

        reaction.timeoutInterval = setInterval(async () => {

            if (message === null) {
                clearInterval(reaction.timeoutInterval);
                return;
            }

            if (Number.isInteger((progress / 5))) {
                try {
                    await message.edit(`${originalContent} ${(timeout - progress)} seconds left to decide...`)
                } catch (e) {

                }
            }

            if (progress === timeout) {
                if (onNoInput) {
                    onNoInput();
                }
                await this.removeReactionMessage(message);
            }
            progress++;
        }, 1000)
    }

    async removeReactionMessage(message)
    {
        clearInterval(this.messages[message.id].timeoutInterval);

        delete this.messages[message.id];
        try {
            await message.delete();
        } catch (e) {

        }
    }

}

module.exports = MessageReactionHandler;