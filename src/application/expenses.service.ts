import { CRUDService } from "../common/crud.service";
import { Expense } from "../domain/expense.entity";
import ExpensesDao from "../persistence/expenses.dao";
import { NotFoundException } from "./exceptions/NotFoundException";

interface CreateExpenseRequest {
  description: string;
  amount: number;
  category: string;
}

type UpdateExpenseRequest = CreateExpenseRequest;

class ExpensesService implements CRUDService<Expense> {
  async list(skip?: number, take?: number): Promise<Expense[]> {
    return ExpensesDao.getExpenses(skip, take);
  }

  async create(request: CreateExpenseRequest) {
    return await ExpensesDao.addExpense(request);
  }

  async getOneById(id: string) {
    const expense = await ExpensesDao.getExpenseById(id);

    if (!expense) {
      throw new NotFoundException("Expenses not found!");
    }

    return expense;
  }

  async updateById(id: string, request: UpdateExpenseRequest) {
    return await ExpensesDao.updateExpenseById(id, request);
  }

  async deleteById(id: string) {
    await ExpensesDao.deleteExpenseById(id);
  }
}

// Singleton
export default new ExpensesService();
