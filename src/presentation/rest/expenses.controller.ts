import { Request, Response } from "express";
import expenseService from "../../application/expenses.service";

class ExpenseController {
  async list(req: Request, res: Response) {
    const { skip, take } = req.query;

    const skip_v = skip ? Number(skip) : undefined;
    const take_v = take ? Number(take) : undefined;

    const expenses = await expenseService.list(skip_v, take_v);

    return res.json(expenses);
  }

  async create(req: Request, res: Response) {
    const { description, amount, category } = req.body;

    const createdExpense = await expenseService.create({
      description,
      amount: Number(amount),
      category,
    });

    return res.status(201).json(createdExpense);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const expense = await expenseService.getOneById(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense Not Found!" });
    }

    return res.json(expense);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const expense = await expenseService.getOneById(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense Not Found!" });
    }

    const { description, amount, category } = req.body;
    const updatedExpense = await expenseService.updateById(id, {
      description,
      amount: Number(amount),
      category,
    });

    return res.status(200).json(updatedExpense);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const expense = await expenseService.getOneById(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense Not Found!" });
    }

    await expenseService.deleteById(id);

    return res.status(204).json();
  }
}

export default new ExpenseController();
