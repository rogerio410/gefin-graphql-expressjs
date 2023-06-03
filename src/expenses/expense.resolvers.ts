import expensesService from "./expenses.service";

// InputTypes
type CreateExpenseInput = {
  description: string;
  amount: number;
  category: string;
};

const expensesResolver = {
  Query: {
    expenses: (_, { skip, take }) => expensesService.list(skip, take),
  },
  Mutation: {
    createExpense: async (_, { input }) => {
      return await expensesService.create(input);
    },
  },
};

// when using import/export:
// export { expensesResolver };

// when using loadFiles
export default expensesResolver;
