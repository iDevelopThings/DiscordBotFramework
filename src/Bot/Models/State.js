const {Model} = require('objection');

class State extends Model {
    static get tableName()
    {
        return 'States';
    }
}

module.exports = State;