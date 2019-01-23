/**
 * Created by Sam on 15/04/2017.
 */

'use strict';
const Discord = require('discord.js');

const Command = require('../src/Bot/Base/Command.js');
const Alias   = require('../src/Bot/Models/Alias.js');

const ytdl    = require("ytdl-core");
const request = require("request");
require('discord.js-music');

let musicChannel = null;
let mainChannel  = null;
let nowPlaying   = null;
let queue        = [];
let stopped      = false;

class MusicPlayer extends Command {

	constructor()
	{
		super();
		this._command     = 'mp';
		this._hidden      = true;
		this._name        = 'Music Player';
		this._description = 'Plays youtube tracks in #music';
	}
	/*
		handle(message, parts)
		{
			musicChannel = this._bot.channels.find(value => {
				return value.name === 'Music';
			});

			if (!musicChannel)
				mainChannel.send('There is no music channel set.');

			let feelsBadMan = this._bot.emojis.find(value => {
				return value.name == 'FeelsBadMan';
			});

			switch (parts[1]) {


				case "commands":

					/!*let embed = new Discord.RichEmbed()
						.setAuthor('Testing an author', 'https://shotsaver.idevelopthings.com/uploads/P2nQKC7vzWvfu778.png', 'https://shotsaver.idevelopthings.com/uploads/P2nQKC7vzWvfu778.png')
						.setColor('BLUE')
						.addField('Test', '20')
						.addBlankField()
						.addField('!mp', 'Queue a song to the list')
						.addBlankField()
						.setFooter('testing footer')
					;
					message.reply({embed});*!/

					message.reply(
						`\n!${this._command} queue {song url} - Adds a new song to the "playlist". \n` +
						`!${this._command} stop - Stops playing music. \n` +
						`!${this._command} play - Starts playing music if stopped. \n` +
						`!${this._command} list - Lists all the songs in the queue. \n` +
						`!${this._command} next - Plays the next song in the queue. \n`
					);
					break;
				case "queue":
					if (!parts[2]) {
						message.reply('You must specify a song to search for on youtube.');
						return;
					}

					let match = this.urlCheck(parts[2]);

					if (!match) {
						message.reply('Invalid youtube video.');
						return;
					}

					if (!match[3] === 'watch') {
						message.reply('Invalid youtube video url.');
						return;
					}

					let param = this.getParameterByName('v', parts[2]);

					message.reply('I\'m loading your song into the queue now....')

					request(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${param}&key=AIzaSyDmRV66LEhGHUesOULFPEHMGpgUZ8LBjpk`, (error, response, body) => {
						var json = JSON.parse(body);

						if ("error" in json) {
							message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
						} else if (json.items.length === 0) {
							message.reply("No videos found matching the search criteria.");
						} else {
							let item = json.items[0].snippet;

							let video = {
								id      : json.items[0].id,
								title   : item.title,
								user    : message.author,
								message : message
							};
							queue.push(video);

							if (!nowPlaying) {
								if (stopped) {
									stopped = false;
								}

								this.play(video)
							}

						}
					});

					break;

				case "stop":

					nowPlaying = null;
					stopped    = true;

					musicChannel.leave();

					break;

				case "alias":

					if (!parts[2]) {
						message.reply(
							`Alias allow you to create a "name" for a video for easier future reference, available parameters are \n` +
							`- alias add {alias name} {youtube url}\n` +
							`- alias remove {alias name} \n` +
							`- alias queue {alias name} \n`
						);
						return;
					}

					//Check the parameter of the command
					switch (parts[2]) {
						case "add":
							if (!parts[3] || parts[3].trim() === '') {
								message.reply('You must specify a name for the alias.');
								return;
							}
							if (!parts[4] || parts[4].trim() === '') {
								message.reply('You must specify a youtube url for the alias.');
								return;
							}

							let match = this.urlCheck(parts[4]);

							if (!match) {
								message.reply('Invalid youtube video.');
								return;
							}

							if (!match[3] === 'watch') {
								message.reply('Invalid youtube video url.');
								return;
							}

							let param = this.getParameterByName('v', parts[4]);

							request(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${param}&key=AIzaSyDmRV66LEhGHUesOULFPEHMGpgUZ8LBjpk`, (error, response, body) => {
								let json = JSON.parse(body);
								if ("error" in json) {
									message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
								} else if (json.items.length === 0) {
									message.reply("No videos found matching the search criteria.");
								} else {
									let item = json.items[0].snippet;

									let video = {
										video_id    : json.items[0].id,
										video_title : item.title,
										video_url   : parts[4],
										alias       : parts[3],
										created_at  : new Date(),
										updated_at  : new Date(),
									};
									Alias.query().insert(video).then(response => {
										message.reply('Your video was successfully added as an alias.');
									});
								}
							});

							break;

						case "queue":
							if (!parts[3]) {
								message.reply('You need to specify an alias to queue.');
								return;
							}

							Alias.query().where('alias', parts[3]).first()
								.then(alias => {
									let video = {
										id      : alias.video_id,
										title   : alias.video_title,
										user    : message.author,
										message : message
									};
									if (!nowPlaying) {
										this.play(video);
									} else {
										message.reply(`${alias.alias} was successfully loaded into the queue.`);
										queue.push(video);
									}

								});

							break;

					}

					break;

				case "list":
					let list = "";

					if (queue.length === 0) {
						message.reply(`There are currently no songs in the queue... ${feelsBadMan.toString()}`)
						return;
					}

					queue.forEach(value => {
						list += `\n ${(queue.indexOf(value) + 1)} - ${value.title}`;
					})

					message.reply(list);
					break;

				case "next":
					if (!queue[0]) {
						message.reply(`There is no song next in the queue ${feelsBadMan.toString()}`);
						return;
					}

					nowPlaying = null;

					this.play(queue[0]);
					break;

				case "play":
					if (queue.length === 0) {
						message.reply(`There are no songs in the queue at the moment. Use !yt queue {song url}  ${feelsBadMan.toString()}`)
						return;
					}
					this.stopped = false;

					this.play(queue[0]);
					break;

		}

	}

	play(video, alias = false)
	{
		musicChannel.join()
			.then(function (connection) {

				if (!alias)
					video.message.reply(`Your song "${video.title}" is starting...`);

				this._bot.user.setGame(`music: ${alias ? video.video_title : video.title}`);
				let audio_stream = ytdl(
					`https://youtu.be/${alias ? video.video_id : video.id}&vq=hd1080`,
					{filter : 'audioonly'}
				);

				let voice_handler = connection.playStream(audio_stream);
				voice_handler.setVolume(0.5);
				queue.splice(0, 1);
				nowPlaying = video;

				voice_handler.once("end", reason => {
					this._bot.user.setGame('Chilling');
					if (stopped == true) {
						return;
					}

					console.log('song ended...');

					if (queue.length > 0) {
						this.play(queue[0]);
					} else {
						musicChannel.leave();
						nowPlaying = null;
					}
				});

			}.bind(this))
			.catch(console.error);

	}

	getParameterByName(name, url)
	{

		name        = name.replace(/[\[\]]/g, "\\$&");
		var regex   = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	urlCheck(url)
	{
		let regExp = /^.*(youtu.be|youtube.com\/|list=)([^#\&\?\=]*).*/
	;

	/*return url.match(regExp);
}*/

}

module
	.exports = MusicPlayer;