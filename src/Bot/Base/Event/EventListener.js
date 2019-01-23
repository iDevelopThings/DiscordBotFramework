class EventListener {

	constructor(bot, instance)
	{
		this._bot      = bot;
		this._instance = instance;
	}

	handle(data)
	{

	}

	onRemove()
	{

	}

	/**
	 *
	 * @returns {Bot}
	 */
	get instance()
	{
		return this._instance;
	}

	/**
	 *
	 * @returns {Discord.Client|module:discord.js.Client}
	 */
	get bot()
	{
		return this._bot;
	}
}

module.exports = EventListener;