import { Application, NextFunction } from "express";
import { CommomRoutesConfig } from "../../common/common.routes.config";
import expensesController from "./expenses.controller";

export class ExpensesRoutes extends CommomRoutesConfig {
  constructor(app: Application) {
    super(app, "ExpensesRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route("/expenses")
      .get(expensesController.list)
      .post(expensesController.create);

    this.app
      .route(`/expenses/:id`)
      .all((_, __, next: NextFunction) => next())
      .get(expensesController.getOne)
      .put(expensesController.update)
      .delete(expensesController.delete);

    return this.app;
  }
}
