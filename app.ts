import express, { Application, json } from 'express'
import { env } from './src/config/env'
import { userRoutes } from './src/modules/user/user.route'
import { AppDataSource } from './src/config/db'
import { Logger } from './src/utils/logger'
import { authRoutes } from './src/modules/auth/auth.route'
import { middleware } from './src/modules/middleware/middleware'

async function bootstrap() {
    const app: Application = express()
    const dbConnection = await AppDataSource.initialize()
    Logger.info(`isMysqlConnected: ${dbConnection.isInitialized}`)
    const { APP_PORT, NODE_ENV } = env()
    app.use(json())
    app.use(authRoutes)
    app.use(middleware,userRoutes)
    app.listen(APP_PORT, function () {
        Logger.success(`App ${NODE_ENV} is listening on port ${APP_PORT} !`)
    })
}

bootstrap()
