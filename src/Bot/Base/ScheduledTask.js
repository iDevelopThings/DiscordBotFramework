/**
 * Created by Sam on 20/01/2019.
 */
'use strict';

const moment = require('moment');
require('moment-timer');

class ScheduledTask {

	constructor()
	{
		this._bot      = null;
		this._instance = null;
		this._timer    = null;
		this._duration = {
			interval : 5,
			unit     : 'm',
		};
	}

	/**
	 * This will be called by the bot on startup and begin running the "timer"
	 */
	init()
	{
		this._timer = moment
			.duration(this._duration.interval, this._duration.unit)
			.timer({loop : true, start : true}, async () => {
				await this.handle(this.bot.guilds.first(), this.bot);
			});
	}

	start()
	{
		if (!this._timer) return;
		if (this._timer.isStarted()) return;

		this._timer.start();
	}

	stop()
	{
		if (!this._timer) return;
		if (this._timer.isStopped()) return;

		this._timer.stop();
	}

	restart()
	{
		this.stop();
		this.start();
	}

	/**
	 * This function will be the one that is overridden by the sub class
	 */
	handle(guild, bot)
	{

	}

	async forceRun()
	{
		await this.handle(this.bot.guilds.first(), this.bot);
	}

	setDuration(duration)
	{
		this._timer.duration(moment.duration(duration.interval, duration.unit));
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

module.exports = ScheduledTask;