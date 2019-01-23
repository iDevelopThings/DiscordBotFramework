const ServiceProvider = require('./../Base/ServiceProvider');

class ConfigServiceProvider extends ServiceProvider {

    handle()
    {
        return this;
    }

    async onBoot()
    {
        global.config = this.instance.services.FileServiceProvider
            .loadForFrameworkAndBase(
                process.cwd() + '/src/Bot/Config',
                process.cwd() + '/App/Config'
            );
    }

}

module.exports = ConfigServiceProvider;