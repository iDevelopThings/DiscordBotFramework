const fs   = require('fs');
const path = require('path');

function flatten(lists)
{
	return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath)
{
	return fs.readdirSync(srcpath)
		.map(file => './' + path.join(srcpath, file))
		.filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath)
{
	return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

let directories = getDirectoriesRecursive('./src/Bot');
console.log(directories);

var chokidar = require('chokidar');
var watcher  = chokidar.watch(directories);

function watchFiles(callback)
{
	watcher.on('ready', function () {
		console.log('ready');
		watcher.on('all', function () {
			console.log("Clearing /dist/ module cache from server");
			Object.keys(require.cache).forEach(function (id) {
				if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id];
			});

			callback();
		});
	});
}

module.exports = {
	watchFiles : watchFiles,
};