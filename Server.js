/**
 * Created by Sam on 15/04/2017.
 */

const DiscordBot = require('./src/Bot/Bot');
//const HotReload  = require('./HotReload');

const database = require('./src/Bot/Base/Database');

let discordBot = new DiscordBot();
discordBot.initiate().then(response => {
	console.log('[BOT] Everything is loaded.');
});

/*HotReload.watchFiles(() => {
	discordBot = new DiscordBot();
	discordBot.initiate().then(response => {
		console.log('[BOT] Everything is loaded.');
	});
});*/

/*
process.stdin.resume();

async function exitHandler(options, exitCode)
{
    try {
        for (let h in discordBot.handlers) {
            let handler = discordBot.handlers[h];
            await handler.shutdown();
        }
    } catch (e) {
        console.log(e);
        process.exit(0);
    }
    if (options.cleanup) {

    }
    if (exitCode || exitCode === 0) {

    }
    if (options.exit) {

        console.log('Successfully shutting down.');
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup : true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit : true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit : true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit : true}));
process.on('SIGTERM', exitHandler.bind(null, {exit : true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit : true}));*/

