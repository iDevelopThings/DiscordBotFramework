/**
 * Created by Sam on 15/04/2017.
 */

'use strict';

const Handler = require('../Base/Handler.js');

class CommandsHandler extends Handler {

    constructor()
    {
        super();
        this.prefix   = '!';
        this.commands = [];
    }

    init()
    {
        super.init();
    }

    setCommands(commands)
    {
        this.commands = commands;
    }

    reload()
    {
        this.commands = [];
    }

    handle(message)
    {
        if (message.content[0] !== this.prefix)
            return;

        console.time('command handling');

        let command = this.parseCommand(message.content);

        if (!command) return;

        console.info(`[${command.class._admin ? 'ADMIN ' : ''}COMMAND] ${message.author.username}@${command.class._command}`);

        if (command.class.allowedInDm === false && message.channel.type === 'dm') {
            return;
        }

        if (command.class.admin) {
            let isAdmin = message.member.roles.find(val => (val.name === 'Administrator' || val.name === 'Owner' || val.name === 'Admin'));
            if (!isAdmin) {
                console.info(`[${command.class._admin ? 'ADMIN ' : ''}COMMAND] ${message.author.username}@${command.class._command} - Admin permissions required.`)
                return;
            }
        }

        command.class._params  = command.params;
        command.class._message = message;
        command.class.handle(message, command.parts)
            .then(response => {
                console.timeEnd('command handling')
            });

    }

    /**
     * Will take the text sent and convert it to a command
     *
     * @param text
     * @returns {*}
     */
    parseCommand(text)
    {
        let commandMessage = text.slice(1, text.length);
        let commandParts   = commandMessage.split(' ');

        let commandClass = this.commands[commandParts[0]];

        if (!commandClass) {

            //Handle aliases
            for (let c in this.commands) {

                let command = this.commands[c];

                if (command.aliases) {
                    for (let a in command.aliases) {
                        if (command.aliases[a] === commandParts[0]) {
                            return {
                                trigger    : commandParts[0], //comand start, ex !ping
                                params     : this.commandParams(commandParts, this.commands[c]),
                                parts      : commandParts,
                                class      : this.commands[c],
                                usingAlias : true,
                            };
                        }
                    }
                }
            }

            return null;
        }

        return {
            trigger    : commandParts[0], //comand start, ex !ping
            params     : this.commandParams(commandParts, commandClass),
            parts      : commandParts,
            class      : commandClass,
            usingAlias : false,
        };
    }

    /**
     * Parse the command parameters
     *
     * @param commandParts
     * @param command
     */
    commandParams(commandParts, command)
    {
        commandParts.shift();

        const reg  = /{\s*(.*?)\s*}/g;
        let match  = null;
        const args = {};

        let index = 0;
        while ((match = reg.exec(command.command)) !== null) {
            args[match[1]] = commandParts[index];
            index++;
        }

        return args;
    }

}

module.exports = CommandsHandler;