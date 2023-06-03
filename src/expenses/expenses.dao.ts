import { Expense } from "./expense.entity"

class ExpensesDAO{
    expenses: Array<Expense> = [
        {
            date: new Date(),
            description: 'Café Riverside',
            amount: 15.0,
            category: 'Alimentação'
        }
    ]


    async getExpenses(skip?: number, take?: number){
        return this.expenses.slice(skip, take)
    }
}

// Singleton
export default new ExpensesDAO()