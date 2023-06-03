import { CRUDService } from "../common/crud.service";
import { Expense } from "./expense.entity";
import ExpensesDao from "./expenses.dao";

interface CreateExpenseRequest {
    description: string
    amount: number
    category: string
}

class ExpensesService implements CRUDService<Expense>{
    
    async list(skip?: number, take?: number): Promise<Expense[]>{
        return ExpensesDao.getExpenses(skip, take)
    }

    async create(request: CreateExpenseRequest){
        return await ExpensesDao.addExpense(request)
    }

}

// Singleton
export default new ExpensesService()