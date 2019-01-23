/**
 * Created by Sam on 15/04/2017.
 */
'use strict';

class Command {

	get aliases()
	{
		return this._aliases;
	}

	set aliases(value)
	{
		this._aliases = value;
	}

	get message()
	{
		return this._message;
	}

	set message(value)
	{
		this._message = value;
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

	constructor()
	{
		this._command       = '';
		this._name          = '';
		this._description   = '';
		this._bot           = null;
		this._commandPrefix = '!';
		this._aliases       = [];
		this._message       = null;
		this._hidden        = false;
		this._admin         = false;
		this._instance      = null;
		this._params        = {};
		this._allowedInDm   = false;
	}

	handle()
	{

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

	set instance(bot)
	{
		this._instance = bot;
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

module.exports = Command;