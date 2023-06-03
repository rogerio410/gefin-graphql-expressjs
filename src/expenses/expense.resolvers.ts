import expensesService from "./expenses.service";

export const expensesResolvers = {
    Query: {
        expenses: () => expensesService.list()
    }
}
