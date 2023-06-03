import { Application, NextFunction, Request, Response } from 'express';
import { CommomRoutesConfig } from "../common/common.routes.config";
import expensesController from './expenses.controller';

export class ExpensesRoutes extends CommomRoutesConfig{

    constructor(app: Application){
        super(app, 'ExpensesRoutes')
    }
    
    configureRoutes(): Application {
        this.app.route('/expenses')
            .get(expensesController.list)
            .post((req: Request, res: Response)=>{})

        this.app.route(`/expenses/:id`)
            .all((req: Request, res: Response, next: NextFunction)=>{})
            .get((req: Request, res: Response)=>{})
            .put((req: Request, res: Response)=>{})
            .patch((req: Request, res: Response)=>{})
            .delete((req: Request, res: Response)=>{})

        return this.app
    }
}