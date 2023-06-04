import { GraphQLResolveInfo } from "graphql";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import expensesService from "../../application/expenses.service";
import { Expense } from "../../domain/expense.entity";

// InputTypes
type CreateExpenseInput = {
  description: string;
  amount: number;
  category: string;
};

const expensesResolver = {
  Query: {
    expenses: (root, { skip, take }, ctx, info) => {
      // Get Meta-data from query: args, fields requested
      const parsedInfo = parseResolveInfo(info);
      console.log(parsedInfo);

      return expensesService.list(skip, take);
    },
  },
  Mutation: {
    createExpense: (root, { input }, context, info: GraphQLResolveInfo) => {
      return expensesService.create(input);
    },
  },

  // Fields Resolver
  Expense: {
    amount: (expense: Expense, arg, context, info) => {
      return expense.amount;
    },
  },
};

// when using import/export:
// export { expensesResolver };

// when using loadFiles:
export default expensesResolver;
