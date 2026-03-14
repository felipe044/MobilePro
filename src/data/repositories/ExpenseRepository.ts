/**
 * Design Pattern: Repository
 * Abstrai a fonte de dados e expõe operações de domínio
 * Separação de responsabilidades: a camada de apresentação não conhece o data source
 */
import { Expense } from '../models/Expense';
import type LocalStorageService from '../datasources/LocalStorageService';

export interface IExpenseRepository {
  getAll(): Expense[];
  add(expense: Expense): void;
  remove(id: string): void;
  getByCategory(category: string): Expense[];
  getTotal(): number;
  getCategories(): string[];
  addCategory(name: string): void;
  removeCategory(name: string): void;
}

export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly storage: LocalStorageService) {}

  getAll(): Expense[] {
    return this.storage.getAll();
  }

  add(expense: Expense): void {
    if (expense.vlr_despesa < 0) {
      throw new Error('Valor não pode ser negativo');
    }
    this.storage.add(expense);
  }

  remove(id: string): void {
    this.storage.remove(id);
  }

  getByCategory(category: string): Expense[] {
    return this.storage.getAll().filter((e) => e.tp_despesa === category);
  }

  getTotal(): number {
    return this.storage
      .getAll()
      .reduce((sum, expense) => sum + expense.vlr_despesa, 0);
  }

  getCategories(): string[] {
    return this.storage.getCategories();
  }

  addCategory(name: string): void {
    this.storage.addCategory(name);
  }

  removeCategory(name: string): void {
    this.storage.removeCategory(name);
  }
}
