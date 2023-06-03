import { CRUDService } from "../common/crud.service";
import { Expense } from "./expense.entity";
import ExpensesDao from "./expenses.dao";

class ExpensesService implements CRUDService<Expense>{
    
    async list(skip?: number, take?: number): Promise<Expense[]>{
        return ExpensesDao.getExpenses(skip, take)
    }

}

// Singleton
export default new ExpensesService()