const commander = require('commander');

class Cli {

	constructor()
	{
		this.cli = commander.version('0.0.1');

		this.cli
			.command('make:event [name]')
			.option('-t, --type [discord or bot]', 'Which event do you want to handle, a framework event(bot) or discord event(discord)?')
			.action((name, options) => {
				let type = options.type;
				if (!name) {
					console.error('Name must be defined. `make:event EventName --type discord`');
					return;
				}

				if (type !== 'bot' && type !== 'discord') {
					type = 'bot';
				}

				console.log(`Created event: ${name} - ${type}`);

			});

		/**
		 * https://www.npmjs.com/package/commander

		 rogram
		 .command('exec <cmd>')
		 .alias('ex')
		 .description('execute the given remote cmd')
		 .option("-e, --exec_mode <mode>", "Which exec mode to use")
		 .action(function(cmd, options){
		    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
		  }).on('--help', function() {
		    console.log('');
		    console.log('Examples:');
		    console.log('');
		    console.log('  $ deploy exec sequential');
		    console.log('  $ deploy exec async');
		  });
		 */
	}

	startParsing()
	{
		this.cli.parse(process.argv);
	}

}

module.exports = Cli;

