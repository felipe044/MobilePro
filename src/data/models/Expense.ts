/**
 * Modelo de dados para Despesa
 * Clean Code: Interface com nomes descritivos
 */
export interface Expense {
  id: string;
  nm_despesa: string;
  vlr_despesa: number;
  tp_despesa: string;
  data: string;
}

export const EXPENSE_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Moradia',
  'Outros',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
