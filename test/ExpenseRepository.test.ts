/**
 * Testes Unitários - ExpenseRepository
 * Garantem qualidade e funcionalidade do código
 */
import { ExpenseRepository } from '../src/data/repositories/ExpenseRepository';
import LocalStorageService from '../src/data/datasources/LocalStorageService';
import { Expense } from '../src/data/models/Expense';

const createExpense = (overrides: Partial<Expense> = {}): Expense => ({
  id: '1',
  nm_despesa: 'Almoço',
  vlr_despesa: 25.5,
  tp_despesa: 'Alimentação',
  data: new Date().toISOString(),
  ...overrides,
});

describe('ExpenseRepository', () => {
  let repository: ExpenseRepository;
  let storage: LocalStorageService;

  beforeEach(() => {
    storage = LocalStorageService.getInstance();
    storage.clear();
    repository = new ExpenseRepository(storage);
  });

  test('1. Adicionar um gasto', () => {
    const expense = createExpense({ id: '1', vlr_despesa: 100 });
    repository.add(expense);

    const all = repository.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].nm_despesa).toBe('Almoço');
    expect(all[0].vlr_despesa).toBe(100);
  });

  test('2. Remover um gasto', () => {
    const expense = createExpense({ id: '1' });
    repository.add(expense);
    expect(repository.getAll()).toHaveLength(1);

    repository.remove('1');
    expect(repository.getAll()).toHaveLength(0);
  });

  test('3. Calcular o total de gastos', () => {
    repository.add(createExpense({ id: '1', vlr_despesa: 50 }));
    repository.add(createExpense({ id: '2', vlr_despesa: 30 }));
    repository.add(createExpense({ id: '3', vlr_despesa: 20 }));

    const total = repository.getTotal();
    expect(total).toBe(100);
  });

  test('4. Filtrar gastos por categoria', () => {
    repository.add(createExpense({ id: '1', tp_despesa: 'Alimentação' }));
    repository.add(createExpense({ id: '2', tp_despesa: 'Transporte' }));
    repository.add(createExpense({ id: '3', tp_despesa: 'Alimentação' }));

    const alimentacao = repository.getByCategory('Alimentação');
    expect(alimentacao).toHaveLength(2);
    expect(alimentacao.every((e) => e.tp_despesa === 'Alimentação')).toBe(true);

    const transporte = repository.getByCategory('Transporte');
    expect(transporte).toHaveLength(1);
  });

  test('5. Rejeitar valores negativos', () => {
    const expense = createExpense({ id: '1', vlr_despesa: -50 });

    expect(() => repository.add(expense)).toThrow('Valor não pode ser negativo');
    expect(repository.getAll()).toHaveLength(0);
  });
});
