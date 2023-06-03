import debug from 'debug'
import { Request, Response } from 'express'
import expenseService from './expenses.service'

const log: debug.IDebug = debug('app:expenses-controller')
class ExpenseController{

    async list(req: Request, res: Response){
        const {skip, take} = req.query

        const skip_v = skip ? Number(skip) : undefined
        const take_v = take ? Number(take) : undefined

        const expenses = await expenseService.list(skip_v, take_v)
        res.json(expenses)
    }

}

export default new ExpenseController()