# Controle de Gastos

Aplicativo mobile para controle de gastos pessoais, desenvolvido em **React Native** como projeto acadêmico de pós-graduação em Desenvolvimento Mobile.

O app demonstra arquitetura **MVVM**, **Clean Code**, **Injeção de Dependência**, **Design Patterns** e **Testes Unitários**, com interface moderna seguindo boas práticas de UI/UX.

## Funcionalidades

- Adicionar gastos com título, valor e categoria
- Visualizar total gasto e lista de despesas
- Excluir gastos
- Criar e excluir categorias personalizadas
- Resumo de gastos agrupados por categoria

## Pré-requisitos

- Node.js >= 22.11.0
- npm ou yarn
- Android Studio (para emulador Android)
- Variáveis de ambiente: `ANDROID_HOME`, `JAVA_HOME`, `Path` com `platform-tools` e `emulator`

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/felipe044/MobilePro.git

# Instalar dependências
npm install

# Iniciar o Metro Bundler (em um terminal)
npm start

# Executar no Android (em outro terminal)
npm run android
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o Metro Bundler |
| `npm run android` | Build e executa no emulador Android |
| `npm run ios` | Executa no simulador iOS (macOS) |
| `npm test` | Executa os testes unitários |
| `npm run lint` | Executa o ESLint |

## Requisitos Acadêmicos Implementados

### 1. Arquitetura MVVM

| Camada | Localização | Descrição |
|--------|-------------|-----------|
| **Presentation** | `src/presentation/screens/` | Telas (Views) |
| **ViewModels** | `src/presentation/viewmodels/` | Lógica de apresentação |
| **Repository** | `src/data/repositories/` | Abstração da fonte de dados |
| **Data Source** | `src/data/datasources/` | Armazenamento em memória |
| **Models** | `src/data/models/` | Modelo de dados |

### 2. Clean Code

Classes pequenas, nomes descritivos, separação de responsabilidades, estilização em arquivos `*.styles.ts` separados.

### 3. Injeção de Dependência

Container em `src/core/Container.ts` (estilo GetIt), registrando LocalStorageService, ExpenseRepository e ExpenseViewModel.

### 4. Design Patterns

- **Repository** – `ExpenseRepository` abstrai o data source
- **Singleton** – `LocalStorageService.getInstance()`

### 5. Testes Unitários (5 testes)

- Adicionar gasto  
- Remover gasto  
- Calcular total  
- Filtrar por categoria  
- Rejeitar valores negativos  

## Estrutura do Projeto

```
src/
├── core/
│   └── Container.ts
├── data/
│   ├── datasources/LocalStorageService.ts
│   ├── models/Expense.ts
│   └── repositories/ExpenseRepository.ts
├── navigation/
│   └── AppNavigator.tsx
└── presentation/
    ├── screens/
    │   ├── AddExpenseScreen/
    │   ├── HomeScreen/
    │   └── SummaryScreen/
    └── viewmodels/
        └── ExpenseViewModel.ts
test/
└── ExpenseRepository.test.ts
```

## Tecnologias

- React Native 0.84
- TypeScript
- React Navigation 7
- Jest (testes)

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
