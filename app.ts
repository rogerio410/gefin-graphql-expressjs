import express, { Request, Response } from 'express'

import cors from 'cors'
import * as expressWinston from 'express-winston'
import * as http from 'http'
import * as winston from 'winston'

import debug from 'debug'
import { CommomRoutesConfig } from './common/common.routes.config'
import { UsersRoutes } from './users/users.routes.config'

// Express App
const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3000
const routes: Array<CommomRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

// middlewares
app.use(express.json())
app.use(cors())

// Config expressWinston logging to all https requests
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    )
}

if (!process.env.DEBUG){
    loggerOptions.meta = false; // if not debug, log request in as one-liners
}

// active middleware for winton logger
app.use(expressWinston.logger(loggerOptions))

// Load app routes
routes.push(new UsersRoutes(app))

// Hello route
const hello_msg = `Server running at http://localhost:${port}`
app.get('/', (req: Request, res: Response)=>{
    res.status(200).json(hello_msg)
})

// Startup app
server.listen(port, () => {
    routes.forEach((route: CommomRoutesConfig) => {
        debugLog(`Routes add for ${route.getName()}`)
    })

    console.log(hello_msg)
})