import { ulid } from "ulidx"
import { Expense } from "./expense.entity"

class ExpensesDAO{
    expenses: Array<Expense> = [
        {
            id: ulid(),
            date: new Date(),
            description: 'Café Riverside',
            amount: 15.0,
            category: 'Alimentação'
        },
        {
            id: ulid(),
            date: new Date(),
            description: 'Jantar Maná',
            amount: 110.10,
            category: 'Alimentação'
        }
    ]


    async getExpenses(skip?: number, take?: number){
        return this.expenses.slice(skip, take)
    }

    async addExpense(expense: CreateExpenseDTO){
        const newExpense = {...expense, id: ulid()}
        this.expenses.push(newExpense)
        return newExpense
    }
}

interface CreateExpenseDTO extends Omit<Expense, 'id'>{
    id?: string
}


// Singleton
export default new ExpensesDAO()