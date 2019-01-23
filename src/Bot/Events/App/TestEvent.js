const EventListener = require('./../../Base/Event/EventListener');

class TestEvent extends EventListener{

    async handle(data)
    {
        console.log('Hi :D', data);
    }

}

module.exports = TestEvent;