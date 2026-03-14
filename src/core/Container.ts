/**
 * Injeção de Dependência: Container similar ao GetIt
 * Registra e resolve dependências, promovendo código modular e testável
 */
import LocalStorageService from '../data/datasources/LocalStorageService';
import { ExpenseRepository } from '../data/repositories/ExpenseRepository';
import { ExpenseViewModel } from '../presentation/viewmodels/ExpenseViewModel';

type Factory<T> = () => T;

class Container {
  private static instance: Container;
  private services = new Map<string, unknown>();
  private factories = new Map<string, Factory<unknown>>();

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register<T>(key: string, factory: Factory<T>): void {
    this.factories.set(key, factory as Factory<unknown>);
  }

  resolve<T>(key: string): T {
    if (this.services.has(key)) {
      return this.services.get(key) as T;
    }
    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`Serviço não registrado: ${key}`);
    }
    const instance = factory() as T;
    this.services.set(key, instance);
    return instance;
  }

  reset(): void {
    this.services.clear();
  }
}

export function setupDI(): Container {
  const container = Container.getInstance();
  container.reset();

  container.register('LocalStorageService', () =>
    LocalStorageService.getInstance()
  );
  container.register('ExpenseRepository', () => {
    const storage = container.resolve<LocalStorageService>('LocalStorageService');
    return new ExpenseRepository(storage);
  });
  container.register('ExpenseViewModel', () => {
    const repo = container.resolve<ExpenseRepository>('ExpenseRepository');
    return new ExpenseViewModel(repo);
  });

  return container;
}

export { Container };
