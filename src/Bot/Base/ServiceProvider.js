class ServiceProvider {

	constructor(bot, instance)
	{
		this._bot      = bot;
		this._instance = instance;
	}

	handle()
	{

	}

	async onBoot() { }

	async afterBoot()
	{

	}

	loadedMessage()
	{
		console.log(`[BOOT] Loaded ${this.constructor.name}`);
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
	{ return this._bot; }

	set bot(value)
	{
		this._bot = value;
	}
}

module.exports = ServiceProvider;