/**
 * Created by Sam on 15/04/2017.
 */
'use strict';

const moment = require('moment');
require('moment-timer');

class TimedCommand {

    constructor()
    {
        this._command       = '';
        this._name          = '';
        this._description   = '';
        this._bot           = null;
        this._commandPrefix = '!';
        this._hidden        = false;
        this._admin         = false;
        this._instance   = null;
        this._params        = {};
        this._allowedInDm   = false;

        this._isTimed   = true; //Variable to differ between timed and normal commands
        this._autostart = true;
        this._time      = 30000;
        this._loop      = false;
        this._timer     = null;
    }

    /**
     * Called before our timer is instantiated
     *
     * @returns {Promise<boolean>}
     */
    async beforeStart(message, parts)
    {
        return true;
    }

    /**
     * Called by CommandsHandler when this command is used.
     */
    async handle(message, parts)
    {
        let shouldStart = await this.beforeStart(message, parts);

        if (shouldStart) {
            this._timer = new moment
                .duration(this._time)
                .timer(
                    {
                        loop  : this._loop,
                        start : this._autostart
                    },
                    () => {
                        this.tick(message, parts)
                            .then(response => {
                                console.log('Timed command completed');
                            })
                    }
                );
            await this.afterStart();
        }
    }

    async afterStart(message, parts)
    {

    }

    tick(message, parts)
    {

    }

    stop()
    {
        this._timer.stop();
    }

    start()
    {
        this._timer.start();
    }

    get description()
    {
        return this._description;
    }

    set description(value)
    {
        this._description = value;
    }

    get name()
    {
        return this._name;
    }

    set name(value)
    {
        this._name = value;
    }

    get command()
    {
        return this._command;
    }

    set command(value)
    {
        this._command = value;
    }

    get allowedInDm()
    {
        return this._allowedInDm;
    }

    set allowedInDm(value)
    {
        this._allowedInDm = value;
    }

    get params()
    {
        return this._params;
    }

    set params(value)
    {
        this._params = value;
    }

    get admin()
    {
        return this._admin;
    }

    set admin(value)
    {
        this._admin = value;
    }

    trigger()
    {
        return this._command.split(' ')[0];
    }

    /**
     *
     * @returns {Bot}
     */
    get instance()
    {
        return this._instance;
    }

    set instance(value)
    {
        this._instance = value;
    }

    /**
     *
     * @returns {Discord.Client|module:discord.js.Client}
     */
    get bot()
    {
        return this._bot;
    }

    set bot(value)
    {
        this._bot = value;
    }

}

module.exports = TimedCommand;