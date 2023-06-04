import express, { Request, Response } from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
import debug from "debug";
import { CommomRoutesConfig } from "./common/common.routes.config";
import { my_logger } from "./common/log";
import { ExpensesRoutes } from "./presentation/rest/expenses.routes";

// GraphQL Schema load:
//1. from import/export (as code)
// import { expensesTypeDefs } from './expenses/expenses.schema'
// import { expensesResolver } from './expenses/expense.resolvers'

// 2. from file
import { loadFiles } from "@graphql-tools/load-files";

const debugLog: debug.IDebugger = debug("app");

async function main() {
  // Express App and others stuffs
  const app: express.Application = express();
  const port = 3000;
  const routes: Array<CommomRoutesConfig> = [];

  // middlewares
  app.use(express.json());
  app.use(cors());

  // Active middleware for winston logger
  app.use(my_logger);

  // Registering routes
  routes.push(new ExpensesRoutes(app));

  // Hello Route
  const hello_msg = `Server started and running at http://localhost:${port}`;
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json(hello_msg);
  });

  // GraphQL Apollo Server as Middleware
  const serverGql = new ApolloServer({
    typeDefs: await loadFiles("src/**/*.graphql"),
    resolvers: await loadFiles("src/**/*.resolvers.ts"),
  });
  await serverGql.start();

  app.use("/graphql", expressMiddleware(serverGql));

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
