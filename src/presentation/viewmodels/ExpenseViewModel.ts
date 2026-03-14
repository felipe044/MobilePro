/**
 * ViewModel - Camada de apresentação (MVVM)
 * Contém a lógica de apresentação e coordena o Repository
 * Clean Code: Classe com responsabilidade única
 */
import { Expense } from '../../data/models/Expense';
import type { IExpenseRepository } from '../../data/repositories/ExpenseRepository';

export class ExpenseViewModel {
  constructor(private readonly repository: IExpenseRepository) {}

  getExpenses(): Expense[] {
    return this.repository.getAll();
  }

  addExpense(expense: Expense): void {
    this.repository.add(expense);
  }

  removeExpense(id: string): void {
    this.repository.remove(id);
  }

  getTotal(): number {
    return this.repository.getTotal();
  }

  getExpensesByCategory(): Record<string, Expense[]> {
    const expenses = this.repository.getAll();
    return expenses.reduce<Record<string, Expense[]>>((acc, expense) => {
      const category = expense.tp_despesa;
      if (!acc[category]) acc[category] = [];
      acc[category].push(expense);
      return acc;
    }, {});
  }

  getExpensesFilteredByCategory(category: string): Expense[] {
    return this.repository.getByCategory(category);
  }

  getCategories(): string[] {
    return this.repository.getCategories();
  }

  addCategory(name: string): void {
    this.repository.addCategory(name);
  }

  removeCategory(name: string): void {
    this.repository.removeCategory(name);
  }
}
