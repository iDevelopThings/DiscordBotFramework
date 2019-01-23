/**
 * Created by Sam on 15/04/2017.
 */

'use strict';

const Handler = require('../Base/Handler.js');

class ReactionInputMessageHandler extends Handler {

    constructor()
    {
        super();

        this._message         = null;
        this._text            = "";
        this._noInputCallback = null;
        this._timeout         = 30;
        this._endOnReaction   = true;
        this._handles         = {};
    }

    init()
    {
        super.init();
    }

    handle(bot)
    {
    }

    confirm(message, text, timeout = 30, endOnReaction = true)
    {
        this._message             = message;
        this._text                = text;
        this._timeout             = timeout;
        this._endOnReaction       = endOnReaction;
        this._handles[message.id] = {};

        return this;
    }

    addReaction(emoji, onClick)
    {
        this._handles[this._message.id][emoji] = {
            emoji        : emoji,
            clickHandler : onClick
        };

        return this;
    }

    onNoInput(callback)
    {
        this._noInputCallback = callback;

        return this;
    }

    async send(checkMessageAuthor = true)
    {
        let reactionMessage = await this._message.reply(this._text);
        try {
            for (let e in this._handles[this._message.id]) {
                await reactionMessage.react(this._handles[this._message.id][e].emoji);
            }
        } catch (e) {
        }

        this.instance.handler('MessageReactionHandler')
            .onReaction(
                reactionMessage,
                async (reaction, user) => {

                    if (user.id === process.env.DISCORD_BOT_ID)
                        return;

                    if (checkMessageAuthor)
                        if (user.id !== this._message.author.id)
                            return;

                    let emojiInput = this._handles[this._message.id][reaction.emoji.name];

                    if (emojiInput) {
                        emojiInput.clickHandler();

                        if (this._endOnReaction) {
                            await this.instance.handler('MessageReactionHandler').removeReactionMessage(reactionMessage);
                        }
                    }
                },
                this._timeout,
                this._noInputCallback
            );
    }

}

module.exports = ReactionInputMessageHandler;