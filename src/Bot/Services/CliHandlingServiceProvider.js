const ServiceProvider = require('./../Base/ServiceProvider');
const _               = require('lodash');
const cli             = require('./../Cli/Cli');

class CliHandlingServiceProvider extends ServiceProvider {

	handle()
	{
		return this;
	}

	async onBoot()
	{
		//this.cliHandler = new cli();
		//this.cli        = this.cliHandler.cli;
	}

	async afterBoot()
	{
		//this.cliHandler.startParsing();
	}

}

module.exports = CliHandlingServiceProvider;
