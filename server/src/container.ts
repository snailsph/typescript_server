import { Logger } from 'pino'
import { Authenticator, JWTAuthenticator } from './lib/authenication'
import { MySql } from './lib/database'
import { BCryptHasher, Hasher } from './lib/hasher'
import { HealthMonitor } from './lib/health'
import { TaskManager, UserManager } from './managers'
import { TaskDatabaseHandle, UserDatabaseHandle } from './databseHandle'

export interface ServiceContainer {
    health: HealthMonitor
    logger: Logger
    lib: {
        hasher: Hasher
        authenticator: Authenticator
    }
    databaseHandle: {
        task: TaskDatabaseHandle
        user: UserDatabaseHandle
    }
    managers: {
        task: TaskManager
        user: UserManager
    }
}

export function createContainer(db: MySql, logger: Logger): ServiceContainer {
    const taskHandle = new TaskDatabaseHandle(db)
    const userHandle = new UserDatabaseHandle(db)
    const hasher = new BCryptHasher()
    const authenticator = new JWTAuthenticator(userHandle)
    const healthMonitor = new HealthMonitor()

    return {
        health: healthMonitor,
        logger,
        lib:{
            hasher,
            authenticator
        },
        databaseHandle: {
            task: taskHandle,
            user: userHandle
        },
        managers: {
            task: new TaskManager(taskHandle),
            user: new UserManager(userHandle,hasher,authenticator)
        }
    }
}