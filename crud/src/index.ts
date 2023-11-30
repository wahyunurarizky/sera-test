import express, { Express } from 'express'
import server from './framework/webserver/server'
import routes from './framework/webserver/routes'
import expressConfig from './framework/webserver/express'
import mongoConnection from './framework/database/mongodb/connection'

const app: Express = express()
expressConfig(app)

// MONGODB
mongoConnection()

// ROUTES
routes(app)

// SERVER
server(app)

export default app
