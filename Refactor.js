const database     = require('./src/Bot/Base/Database');
const BalanceModel = require('./src/Bot/Models/Balance');
const StateManager = require('./src/Bot/Helpers/StateManager');

async function migrate()
{

    let balances = await BalanceModel.query();

    for (let i in balances) {
        let balance = balances[i];

        let invested = await StateManager.getState(balance.discord_user_id, 'bot-investment');

        if (invested) {

            await BalanceModel.query()
                .where('discord_user_id', balance.discord_user_id)
                .patch({invested : invested.amount});

        }
    }
}

migrate()
    .then(() => {
        console.log('Refactored successfully.');
        process.exit(1)
    })
    .catch(console.log);
