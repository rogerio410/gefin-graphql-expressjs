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
      const parsedInfo = parseResolveInfo(info);
      console.log(parsedInfo);

      return expensesService.list(skip, take);
    },
  },
  Mutation: {
    createExpense: (root, args, ctx, info) => {
      const input = args.input as CreateExpenseInput;
      return expensesService.create(input);
    },
  },

  // Fields Resolver
  Expense: {
    amount: (expense: Expense, arg, ctx, info) => {
      return expense.amount;
    },
  },
};

// when using import/export:
// export { expensesResolver };

// when using loadFiles:
export default expensesResolver;
