/**
 * Created by Sam on 15/04/2017.
 */
'use strict';

const fs = require('fs');

class Handler {

	constructor()
	{
		this._bot      = null;
		this._instance = null;
	}

	init()
	{

	}

	async shutdown()
	{
		await this.onShutdown();
	}

	async startup()
	{
		await this.onStartup();
	}

	async onShutdown()
	{

	}

	async onStartup()
	{

	}

	/**
	 * Allows you to set variables for the current handler that will save when the bot closes
	 * These variables will be loaded back in again on start up
	 *
	 *
	 * @param filename
	 * @param variables
	 * @returns {Promise<void>}
	 */
	async saveState(filename, variables = [])
	{
		let data = {};
		for (let v in variables) {
			data[variables[v]] = this[variables[v]];
		}

		let jsonData = JSON.stringify(data);

		await fs.writeFileSync(`./data/${filename}.json`, jsonData, 'utf8');
	}

	/**
	 * Allows you to load the state from file
	 *
	 * @param filename
	 * @param whenComplete | callback
	 * @returns {Promise<void>}
	 */
	async loadState(filename, whenComplete)
	{
		await fs.readFile(`./data/${filename}.json`, 'utf8', async (error, object) => {
			if (error) {
				console.log(error);
				return;
			}

			let variables = JSON.parse(object);

			for (let v in variables) {
				this[v] = variables[v];
			}

			if (whenComplete)
				await whenComplete();

		});
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

module.exports = Handler;