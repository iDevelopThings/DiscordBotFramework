const ServiceProvider = require('./../Base/ServiceProvider');
const _               = require('lodash');

class HandlerServiceProvider extends ServiceProvider {

    handle()
    {
        return this;
    }

    async onBoot()
    {
        let handlers = this.instance.services.FileServiceProvider
            .loadForFrameworkAndBase(
                process.cwd() + '/src/Bot/Handlers',
                process.cwd() + '/App/Handlers'
            );

        for (let index in handlers) {
            let handler      = new handlers[index]();
            handler.bot      = this.bot;
            handler.instance = this.instance;
            handler.init();
            this.instance.handlers[index] = handler;

            console.log(`[BOOT] Loaded ${index} Handler.`);
        }

        console.log(`[BOOT] Loaded ${_.size(handlers)} Handlers.`);
    }

    async afterBoot()
    {
        for (let h in this.instance.handlers) {
            await this.instance.handlers[h].startup();
        }
    }

}

module.exports = HandlerServiceProvider;