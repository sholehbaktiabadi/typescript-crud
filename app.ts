import express, { Application, json } from 'express'
import { env } from './src/config/env'
import { userRoutes } from './src/modules/user/user.route'
import { AppDataSource } from './src/config/db'

const app: Application = express()
AppDataSource.initialize().then(()=> console.log('connected')).catch(err=> console.log(err))
const { APP_PORT, NODE_ENV } = env()
app.use(json())
app.use(userRoutes)
app.listen(APP_PORT, function () {
    console.log(`App ${NODE_ENV} is listening on port ${APP_PORT} !`)
})
