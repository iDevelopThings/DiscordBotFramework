const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDmRV66LEhGHUesOULFPEHMGpgUZ8LBjpk');

async function getChannel()
{

    let response = await youtube.getChannel('https://www.youtube.com/channel/UCpGhCxbp7Tg9g6HZQn-2DdQ?view_as=subscriber', {part : 'contentDetails'});

    let playlist = await youtube.getPlaylistByID(response.relatedPlaylists.uploads);

    let videos = await playlist.getVideos();

    console.log(videos);
}

getChannel()
    .then(response => {

    });

/*
let playlistLink = YouTube.util.parseURL('https://www.youtube.com/watch?v=wce2a5YoGAw&list=UU-MMd_17p3qNSTVbLdiYzow');

console.log(

    YouTube.util.parseURL('https://www.youtube.com/channel/UCpGhCxbp7Tg9g6HZQn-2DdQ?view_as=subscriber'),
    YouTube.util.parseURL('https://www.youtube.com/watch?v=f_F6k54WYJY'),
    playlistLink,
    (playlistLink.playlist),
    (YouTube.util.parseURL('https://www.youtube.com/channel/UCpGhCxbp7Tg9g6HZQn-2DdQ?view_as=subscriber').playlist)

    //youtube.util.parseUrl('https://www.youtube.com/channel/UCpGhCxbp7Tg9g6HZQn-2DdQ?view_as=subscriber')
);*/
