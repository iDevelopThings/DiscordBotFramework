const StateModel = require('../Models/State');

module.exports = {

    /**
     * Set a state for a specific user id
     *
     * @param userId
     * @param key
     * @param state
     * @returns {Promise<void>}
     */
    async setState(userId, key = "", state = {})
    {
        if (userId === 'bot') {
            userId = process.env.DISCORD_BOT_ID;
        }

        if (await this.getState(userId, key) !== null) {
            await StateModel.query()
                .where('discord_user_id', userId)
                .where('key', key)
                .patch({value : JSON.stringify(state)});
        } else {
            await StateModel.query()
                .insert({
                    discord_user_id : userId,
                    key             : key,
                    value           : JSON.stringify(state)
                })
        }
    },

    /**
     * Get a specific state for the user
     *
     * @param userId
     * @param key
     * @returns {Promise<*>}
     */
    async getState(userId, key)
    {
        if (userId === 'bot') {
            userId = process.env.DISCORD_BOT_ID;
        }

        let state = await StateModel.query()
            .where('discord_user_id', userId)
            .where('key', key)
            .first();

        if (!state)
            return null;

        return JSON.parse(state.value);
    },

    async deleteState(userId, key)
    {
        if (userId === 'bot') {
            userId = process.env.DISCORD_BOT_ID;
        }

        await StateModel.query()
            .where('discord_user_id', userId)
            .where('key', key)
            .delete();
    }

};