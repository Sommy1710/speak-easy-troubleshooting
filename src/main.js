import {server} from './bootstrap/server.js'
import appConfig from './config/app.config.js'
import initializeDatabaseConnection from './config/db.config.js'

(() =>
{
    try {
        initializeDatabaseConnection();
        server.listen(appConfig, () =>
        {
            console.log(`server is running on port ${appConfig.port}`);
        })

    } catch (error) {
        console.error("the server could not be started", error)
        process.exit(1);
    }
})()