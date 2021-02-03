const commander = require('commander');
var fs          = require("fs");
let _           = require('lodash');

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
				let folderName = (type === 'bot' ? 'App' : 'Discord');
				let fileName   = (_.replace(_.replace(name, 'Event', ''), 'event', ''));

				fs.readFile(__dirname + "/Templates/EventTemplate.tpl", function (err, buf) {
					if (err) {
						console.error(err);
						return;
					}

					let writeTo = `${process.cwd()}/App/Events/${folderName}/${fileName}Event.js`;

					let contents = buf.toString();

					contents = _.replace(contents, '{className}', `${fileName}Event`);
					contents = _.replace(contents, '{className}', `${fileName}Event`);

					fs.writeFile(writeTo, contents, (err) => {
						if (err) console.log(err);
						console.info(`Successfully created "${fileName}Event" in: "/App/Events/${folderName}"`);
					});
				});

			});

		this.cli
			.command('help')
			.option('-h, --help ', 'Help?')
			.action((name, options) => {
				console.table([
					{
						command     : 'make:event [name] -t discord/bot',
						description : 'Creates a new event listener for the bot',
					},
				]);
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

