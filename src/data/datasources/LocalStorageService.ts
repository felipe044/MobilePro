/**
 * Serviço de armazenamento em memória
 * Design Pattern: Singleton - única instância para toda a aplicação
 * Responsabilidade: Persistir dados em memória (simples, sem banco)
 */
import { Expense } from '../models/Expense';
import { EXPENSE_CATEGORIES } from '../models/Expense';

class LocalStorageService {
  private static instance: LocalStorageService;
  private expenses: Expense[] = [];
  private customCategories: string[] = [];
  private excludedDefaultCategories: string[] = [];

  private constructor() {}

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  getAll(): Expense[] {
    return [...this.expenses];
  }

  add(expense: Expense): void {
    this.expenses.push(expense);
  }

  remove(id: string): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
  }

  getById(id: string): Expense | undefined {
    return this.expenses.find((e) => e.id === id);
  }

  getCategories(): string[] {
    const defaults = EXPENSE_CATEGORIES.filter(
      (d) => !this.excludedDefaultCategories.includes(d)
    );
    const combined: string[] = [...defaults];
    for (const cat of this.customCategories) {
      const trimmed = cat.trim();
      if (trimmed && !combined.includes(trimmed)) {
        combined.push(trimmed);
      }
    }
    return combined;
  }

  addCategory(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    const exists =
      EXPENSE_CATEGORIES.includes(trimmed as (typeof EXPENSE_CATEGORIES)[number]) ||
      this.customCategories.includes(trimmed);
    if (!exists) {
      this.customCategories.push(trimmed);
    }
    this.excludedDefaultCategories = this.excludedDefaultCategories.filter(
      (e) => e !== trimmed
    );
  }

  removeCategory(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (this.customCategories.includes(trimmed)) {
      this.customCategories = this.customCategories.filter((c) => c !== trimmed);
    } else if (
      EXPENSE_CATEGORIES.includes(trimmed as (typeof EXPENSE_CATEGORIES)[number])
    ) {
      this.excludedDefaultCategories.push(trimmed);
    }
  }

  clear(): void {
    this.expenses = [];
  }
}

export default LocalStorageService;
