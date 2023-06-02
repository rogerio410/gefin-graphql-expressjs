import { Application } from 'express'

export abstract class CommomRoutesConfig{
    app: Application
    private _name: string

    constructor(app: Application, name: string){
        this.app = app
        this._name = name
    }

    get name(){
        return this._name
    }

    abstract configureRoutes(): Application;
}