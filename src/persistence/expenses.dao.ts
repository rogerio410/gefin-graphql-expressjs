import { ulid } from "ulidx";
import { NotFoundException } from "../common/exceptions/NotFoundException";
import { Expense } from "../domain/expense.entity";

class ExpensesDAO {
  expenses: Array<Expense> = [
    {
      id: ulid(),
      date: new Date(),
      description: "Café Riverside",
      amount: 15.0,
      category: "Alimentação",
    },
    {
      id: ulid(),
      date: new Date(),
      description: "Jantar Maná",
      amount: 110.1,
      category: "Alimentação",
    },
  ];

  private getExpenseIndexById(id: string) {
    return this.expenses.findIndex((e) => e.id === id);
  }

  async getExpenses(skip?: number, take?: number) {
    return this.expenses.slice(skip, take);
  }

  async getExpenseById(id: string) {
    const index = this.getExpenseIndexById(id);
    if (index === -1) return;

    return this.expenses.at(index);
  }

  async addExpense(expense: CreateExpenseDTO) {
    const newExpense = { ...expense, id: ulid() };
    this.expenses.push(newExpense);
    return newExpense;
  }

  async updateExpenseById(id: string, expenseData: Omit<Expense, "id">) {
    const index = this.getExpenseIndexById(id);
    if (!index) {
      throw new NotFoundException("Expense not found!");
    }

    this.expenses[index] = { id, ...expenseData };

    return this.expenses.at(index);
  }

  deleteExpenseById(id: string) {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (!index) {
      throw new NotFoundException("Expense not found!");
    }

    this.expenses.splice(index, 1);
  }
}

interface CreateExpenseDTO extends Omit<Expense, "id"> {
  id?: string;
}

// Singleton (Node imports once)
export default new ExpensesDAO();
