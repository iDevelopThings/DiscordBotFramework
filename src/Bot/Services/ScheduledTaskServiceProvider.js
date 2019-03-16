const ServiceProvider = require('./../Base/ServiceProvider');
const _               = require('lodash');

class ScheduledTaskServiceProvider extends ServiceProvider {

	handle()
	{
		return this;
	}

	async onBoot()
	{
		let tasks = this.instance.services.FileServiceProvider
			.loadForFrameworkAndBase(
				__dirname + '/../ScheduledTasks',
				process.cwd() + '/App/ScheduledTasks',
			);

		for (let index in tasks) {
			let task      = new tasks[index]();
			task.bot      = this.bot;
			task.instance = this.instance;
			task.init();

			this.instance.tasks[index] = task;
		}

		console.log(`[BOOT] Finished loading all Scheduled Tasks.`);
	}

}

module.exports = ScheduledTaskServiceProvider;