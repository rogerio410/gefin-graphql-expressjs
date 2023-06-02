import { Application, NextFunction, Request, Response } from 'express';
import { CommomRoutesConfig } from "../common/common.routes.config";

export class ExpensesRoutes extends CommomRoutesConfig{

    constructor(app: Application){
        super(app, 'ExpensesRoutes')
    }
    
    configureRoutes(): Application {
        this.app.route('/expenses')
            .get((req: Request, res: Response)=>{})
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