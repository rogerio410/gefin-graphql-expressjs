import express, { NextFunction, Request, Response } from 'express';
import { CommomRoutesConfig } from "../common/common.routes.config";

export class UsersRoutes extends CommomRoutesConfig{
    private prefix = '/users'

    constructor(app: express.Application){
        super(app, 'UsersRoutes')
    }
    
    configureRoutes(): express.Application {

        this.app.route(this.prefix)
            .get((req: Request, res: Response)=>{})
            .post((req: Request, res: Response)=>{})

        this.app.route(`${this.prefix}/:userId`)
            .all((req: Request, res: Response, next: NextFunction)=>{})
            .get((req: Request, res: Response)=>{})
            .put((req: Request, res: Response)=>{})
            .patch((req: Request, res: Response)=>{})
            .delete((req: Request, res: Response)=>{})

        return this.app
    }
}