import express, { Request, Response } from 'express'

import cors from 'cors'
import debug from 'debug'
import { CommomRoutesConfig } from './common/common.routes.config'
import { my_logger } from './common/log'
import { ExpensesRoutes } from './expenses/expenses.routes.config'

// Express App and others stuffs
const app: express.Application = express()
const port = 3000
const routes: Array<CommomRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

// middlewares
app.use(express.json())
app.use(cors())

// active middleware for winton logger
app.use(my_logger)

// Load app routes
routes.push(new ExpensesRoutes(app))

// Hello Route
const hello_msg = `Server started and running at http://localhost:${port}`
app.get('/', (req: Request, res: Response)=>{
    res.status(200).json(hello_msg)
})

// Startup app
app.listen(port, ()=>{
    routes.forEach((route: CommomRoutesConfig) => {
        debugLog(`Routes add for ${route.getName()}`)
    })

    console.log(hello_msg)   
})
