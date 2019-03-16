const ServiceProvider = require('./../Base/ServiceProvider');
const _               = require('lodash');

class CommandServiceProvider extends ServiceProvider {

	constructor(bot, instance)
	{
		super(bot, instance);
	}

	handle()
	{
		return this;
	}

	async onBoot()
	{
		let commandsClasses = this.instance.services.FileServiceProvider
			.loadForFrameworkAndBase(
				__dirname + '/../Commands',
				process.cwd() + '/App/Commands',
			);

		for (let index in commandsClasses) {
			let command                               = new commandsClasses[index]();
			command.bot                               = this.bot;
			command.instance                          = this.instance;
			command.commandPrefix                     = '!';
			this.instance.commands[command.trigger()] = command;

			console.log(`[BOOT] Loaded ${command.name}`);
		}

		console.log(`[BOOT] Loaded ${Object.keys(this.instance.commands).length} Commands into the cache.`);
	}

	async afterBoot()
	{
		this.instance.handler('CommandsHandler').setCommands(this.instance.commands);

		console.log(`[BOOT] Finished loading ${Object.keys(this.instance.commands).length} Commands. Test...`);
	}

}

module.exports = CommandServiceProvider;