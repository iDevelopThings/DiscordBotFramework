/**
 * Created by Sam on 15/04/2017.
 */

require('dotenv').config();

const Discord    = require('discord.js');
const _          = require('lodash');
const requireAll = require('require-all');

class Bot {

	constructor()
	{
		this._bot      = new Discord.Client();
		this._services = [];
		this._handlers = [];
		this._commands = [];
		this._tasks    = [];
	}

	async initiate()
	{
		await this._bot.login(process.env.DISCORD_TOKEN);
		await this.loadServices();
		await this.finishBooting();

		return this.bot;
	}

	/**
	 * Loads all the framework "Services" which basically provide functionality
	 *
	 */
	async loadServices()
	{
		let servicesFromConfig = require(process.cwd() + '/App/Config/App');
		servicesFromConfig     = servicesFromConfig.services || {};
		for (let s in servicesFromConfig) {
			try {
				servicesFromConfig[s] = require(process.cwd() + servicesFromConfig[s]);
			} catch (e) {
				console.log(`[BOOT] Error: ${e.toString()}`);
			}
		}//test

		let services = Object.assign(
			requireAll(process.cwd() + '/App/Services'),
			{
				FileServiceProvider        : require(process.cwd() + '/src/Bot/Services/FileServiceProvider'),
				ConfigServiceProvider      : require(process.cwd() + '/src/Bot/Services/ConfigServiceProvider'),
				HandlerServiceProvider     : require(process.cwd() + '/src/Bot/Services/HandlerServiceProvider'),
				CommandServiceProvider     : require(process.cwd() + '/src/Bot/Services/CommandServiceProvider'),
				EventServiceProvider       : require(process.cwd() + '/src/Bot/Services/EventServiceProvider'),
				CliHandlingServiceProvider : require(process.cwd() + '/src/Bot/Services/CliHandlingServiceProvider'),
			},
			servicesFromConfig,
		);

		for (let s in services) {
			try {
				this.services[s] = new services[s](this.bot, this);
			} catch (e) {
				console.log(s, e);
			}
			await this.services[s].onBoot();
			this.services[s].loadedMessage();
		}

	}

	async finishBooting()
	{
		for (let s in this.services) {
			await this.services[s].afterBoot();
		}
	}

	/**
	 *
	 * @returns {*|StreamDispatcher|EventDispatcher}
	 */
	get dispatcher()
	{
		return this.service('Event').dispatcher;
	}

	/**
	 *
	 * @returns {Discord.Client|module:discord.js.Client}
	 */
	get bot()
	{
		return this._bot;
	}

	/**
	 *
	 * @param name
	 * @returns {Handler}
	 */
	handler(name)
	{
		if (!(name.toString().endsWith('Handler') || name.toString().endsWith('handler')))
			name = `${name}Handler`;

		return this._handlers[name];
	}

	/**
	 *
	 * @returns {Array}
	 */
	get handlers()
	{
		return this._handlers;
	}

	/**
	 *
	 * @param value | Handler
	 */
	set handlers(value)
	{
		this._handlers = value;
	}

	/**
	 *
	 * @returns {Array|Handler}
	 */
	get services()
	{
		return this._services;
	}

	/**
	 *
	 * @param name
	 * @returns {ServiceProvider}
	 */
	service(name)
	{
		if (!(name.toString().endsWith('ServiceProvider') || name.toString().endsWith('Provider')))
			name = `${name}ServiceProvider`;

		return this.services[name];
	}

	/**
	 *
	 * @returns {Array}
	 */
	get tasks()
	{
		return this._tasks;
	}

	/**
	 *
	 * @param value
	 */
	set tasks(value)
	{
		this._tasks = value;
	}

	/**
	 *
	 * @param name
	 * @returns {ScheduledTask}
	 */
	task(name)
	{
		return this._tasks[name];
	}

	get commands()
	{
		return this._commands;
	}

	set commands(value)
	{
		this._commands = value;
	}

}

module.exports = Bot;