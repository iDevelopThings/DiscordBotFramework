const ServiceProvider = require('./../Base/ServiceProvider');
const EventDispatcher = require('./../Base/Event/EventDispatcher');

class EventServiceProvider extends ServiceProvider {

	constructor(bot, instance)
	{
		super(bot, instance);

		this.dispatcher = new EventDispatcher();
	}

	handle()
	{
		return this;
	}

	async onBoot()
	{
		await this.loadDiscordEvents();

		await this.loadAppEvents();
	}

	async loadDiscordEvents()
	{
		let events = this.instance.services.FileServiceProvider
			.loadAndFlattenFiles(__dirname + '/../Events/Discord');

		for (let e in events) {
			let event     = new events[e](this.bot, this.instance);
			let eventName = e.charAt(0).toLowerCase() + e.slice(1);
			eventName     = eventName.replace('Event', '');
			eventName     = eventName.replace('event', '');

			this.bot.on(eventName, (...args) => {
				event.handle(...args);
			});

			console.log(`[EventManager] Loaded event handler for discord-framework(${eventName})`);
		}

		events = this.instance.services.FileServiceProvider
			.loadAndFlattenFiles(process.cwd() + '/App/Events/Discord');

		for (let e in events) {
			let event     = new events[e](this.bot, this.instance);
			let eventName = e.charAt(0).toLowerCase() + e.slice(1);
			eventName     = eventName.replace('Event', '');
			eventName     = eventName.replace('event', '');

			this.bot.on(eventName, (...args) => {
				event.handle(...args);
			});

			console.log(`[EventManager] Loaded event handler for discord-structure(${eventName})`);
		}

	}

	async loadAppEvents()
	{
		let events = this.instance.services.FileServiceProvider
			.loadAndFlattenFiles(__dirname + '/../Events/App');

		for (let e in events) {
			let event     = new events[e](this.bot, this.instance);
			let eventName = e.replace('Event', '').replace('event', '');

			this.dispatcher.on(eventName, async (...args) => {
				event.handle(...args);
			});

			console.log(`[EventManager] Loaded event handler for app-framework(${eventName})`);
		}

		events = this.instance.services.FileServiceProvider
			.loadAndFlattenFiles(process.cwd() + '/App/Events/App');

		for (let e in events) {
			let event     = new events[e](this.bot, this.instance);
			let eventName = e.replace('Event', '').replace('event', '');

			this.dispatcher.on(eventName, async (...args) => {
				event.handle(...args);
			});

			console.log(`[EventManager] Loaded event handler for app-structure(${eventName})`);
		}
	}
}

module.exports = EventServiceProvider;