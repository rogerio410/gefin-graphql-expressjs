import cors from "cors";
import debug from "debug";
import express, { Request, Response } from "express";
import "express-async-errors";
import { CommomRoutesConfig } from "./common/common.routes.config";
import { my_logger } from "./common/log";
import { errorHandler } from "./presentation/rest/error.middleware";
import { ExpensesRoutes } from "./presentation/rest/expenses.routes";

const debugLog: debug.IDebugger = debug("app");

async function main() {
  // Express App and others stuffs
  const app: express.Application = express();
  const port = 3000;
  const routes: Array<CommomRoutesConfig> = [];

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Middleware for winston logger
  app.use(my_logger);

  // Registering routes
  routes.push(new ExpensesRoutes(app));

  // REST Hello Route
  const hello_msg = `Server started and running at http://localhost:${port}`;
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json(hello_msg);
  });

  // Global Error Handling
  app.use(errorHandler);

  // Startup App
  app.listen(port, () => {
    routes.forEach((route: CommomRoutesConfig) => {
      debugLog(`Routes add for ${route.name}`);
    });

    console.log(hello_msg);
  });
}

main().catch((error) => {
  debugLog(error);
  process.exit(1);
});
