/**
 * Created by Sam on 15/04/2017.
 */


'use strict';

//import Command from './Command';

const Command = require('./../../src/Bot/Base/Command.js');

class PingAgain extends Command {

    constructor()
    {
        super();
        this._command     = 'pingagain {test?}';
        this._name        = 'PingAgain';
        this._description = 'Returns pong!';

    }

    async handle(message)
    {
        message.channel.send('Pong!');
    }

}

module.exports = PingAgain;