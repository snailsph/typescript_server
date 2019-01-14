import * as pino from 'pino'
import { AppServer, createServer } from './server'
import { MySql } from './lib/database'
import { HealthMonitor } from './lib/health';
import { createContainer } from './container'


export async function init() {
    const logger = pino()
    try {
        logger.info("Starting HTTP server")
        const db = new MySql({
            database: 'task_manager',
            host: 'localhost',
            port: 3306,
            user: "root",
            password: "sph123456",
            debug: process.env.ENV !== 'production'
        })

        // await db.schemaMigration()


        const port = Number(process.env.PORT) || 8086
        const container = createContainer(db,logger)
        const app = createServer(container)
        const health = container.health
        app.listen(port)

        registerProcessEvents(logger, app, db,health)
    } catch (e) {
        logger.error(e, 'An error occurred while initializing application.')
    }
}

function registerProcessEvents(
    logger: pino.Logger,
    app: AppServer,
    db: MySql,
    health: HealthMonitor
) {
    process.on('uncaughtException', (error: Error) => {
        logger.error('uncaughtException', error)
    })

    process.on('unhandledRejection', (reason: any, promise: any) => {
        logger.info(reason, promise)
    })

    process.on('SIGTERM', async () => {
        logger.info('Starting graceful shutdown')

        health.shuttingDown()
        
        let exitCode = 0
        const shutdown = [app.closeServer(), db.closeDataBase()]
        for (const n of shutdown) {
            try {
                await n
            } catch (e) {
                logger.error('Error in graceful shutdown ', e)
                exitCode = 1
            }
        }
        process.exit(exitCode)
    })
}

init()