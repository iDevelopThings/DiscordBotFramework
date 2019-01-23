const ServiceProvider = require('./../Base/ServiceProvider');
const requireAll      = require('require-all');

class FileServiceProvider extends ServiceProvider {

    handle()
    {
        return this;
    }

    async onBoot()
    {

    }

    /**
     * Loads the files and combines them, for both the framework and the base.
     *
     * @param frameworkDirectory
     * @param baseDirectory
     * @returns {any}
     */
    loadForFrameworkAndBase(frameworkDirectory, baseDirectory)
    {
        return Object.assign(
            this.flattenDirectoryFiles(requireAll(frameworkDirectory)),
            this.flattenDirectoryFiles(requireAll(baseDirectory))
        )
    }

    /***
     * Loads files with require all and then flattens them
     *
     * @param directory
     */
    loadAndFlattenFiles(directory)
    {
        return this.flattenDirectoryFiles(
            requireAll(directory)
        );
    }

    /**
     * "Flattens" the directory structure so we can use it properly
     *
     * @param files
     */
    flattenDirectoryFiles(files)
    {
        let fileList = {};

        for (let i in files) {
            let file = files[i];

            if (typeof file === 'object') {
                fileList = Object.assign(fileList, this.flattenDirectoryFiles(file));
            } else {
                fileList[i] = file;
            }
        }

        return fileList;

    }

}

module.exports = FileServiceProvider;