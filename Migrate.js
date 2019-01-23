const database = require('./src/Bot/Base/Database');

async function migrate()
{
    await database.knex.schema.createTableIfNotExists('Commands', table => {
        table.increments('id').primary();
        table.string('command');
        table.string('type');
        table.text('content');
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Music_Aliases', table => {
        table.increments('id').primary();
        table.string('alias');
        table.string('video_id');
        table.string('video_url');
        table.text('video_title');
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Messages', table => {
        table.increments('id').primary();
        table.string('author_id');
        table.longText('content');
        table.string('channel_name');
        table.string('channel_id');
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Streamers', table => {
        table.increments('id').primary();
        table.string('twitch_id');
        table.string('display_name');
        table.string('username');
        table.string('broadcaster_type');
        table.string('image');
        table.bool('is_live');
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Balances', table => {
        table.increments('id').primary();
        table.string('discord_user_id');
        table.bigInteger('balance').unsigned();
        table.bigInteger('invested').unsigned();
        table.bigInteger('lost_to_bot').unsigned();
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('States', table => {
        table.increments('id').primary();
        table.string('discord_user_id');
        table.string('key');
        table.longText('value');
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Levels', table => {
        table.increments('id').primary();
        table.string('discord_user_id');
        table.bigInteger('chatting').unsigned();
        table.bigInteger('gambling').unsigned();
        table.bigInteger('hacking').unsigned();
        table.timestamps();
    });

    await database.knex.schema.createTableIfNotExists('Music_Favourites', table => {
        table.increments('id').primary();
        table.string('discord_user_id');
        table.string('video_id');
        table.text('title');
        table.string('tag');
        table.timestamps();
    });
}

migrate()
    .then(() => {
        console.log('Migrated successfully.');
        process.exit(1)
    })
    .catch(console.log);
