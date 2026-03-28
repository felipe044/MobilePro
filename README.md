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

## Relatório detalhado: onde cada requisito foi atendido

Este relatório associa **requisitos funcionais** (comportamento do app) e **requisitos de arquitetura/qualidade** (critérios acadêmicos) aos **arquivos e responsabilidades** no código.

---

### Requisitos funcionais

| Requisito | Onde está no código | Como é atendido |
|-----------|---------------------|-----------------|
| **Adicionar gasto com título, valor e categoria** | `src/presentation/screens/AddExpenseScreen/AddExpenseScreen.tsx` | Formulário com `nm_despesa`, `vlr_despesa` e seleção de `tp_despesa`; `handleSave` monta o objeto `Expense` (com `id` e `data`) e chama `viewModel.addExpense`. Validação de título vazio, valor numérico e valor negativo nas linhas ~77–90. |
| **Persistência do gasto (em memória)** | `src/data/datasources/LocalStorageService.ts` | Método `add` insere na lista interna `expenses` (linhas ~28–30). |
| **Regra de negócio: valor não negativo** | `src/data/repositories/ExpenseRepository.ts` | `add` lança erro se `expense.vlr_despesa < 0` (linhas ~27–30). A tela também bloqueia antes de chamar o repositório (`AddExpenseScreen`, linhas ~87–90) e trata exceção com `try/catch` (~92–106). |
| **Visualizar total gasto** | `HomeScreen.tsx` + `ExpenseViewModel.getTotal()` + `ExpenseRepository.getTotal()` | Home carrega `viewModel.getTotal()` em `loadData` (~33–35) e exibe no card “Total gasto” (~72–74). O total é a soma de `vlr_despesa` em `ExpenseRepository.getTotal()` (~42–45). |
| **Listar despesas** | `HomeScreen.tsx` | `FlatList` com `viewModel.getExpenses()` (~86–91), itens renderizados por `ExpenseCard`. |
| **Excluir gasto** | `HomeScreen.tsx` + `ExpenseCard.tsx` | `handleRemove` confirma com `Alert` e chama `viewModel.removeExpense(id)` (~50–64). O botão “Excluir” no card chama `onRemove(expense.id)` (`ExpenseCard.tsx` ~56–61). Remoção no storage: `LocalStorageService.remove` (~32–34). |
| **Categorias padrão** | `src/data/models/Expense.ts` | Constante `EXPENSE_CATEGORIES` (Alimentação, Transporte, etc.) linhas ~13–20. |
| **Criar categoria personalizada** | `AddExpenseScreen.tsx` + `ExpenseViewModel.addCategory` + `LocalStorageService.addCategory` | Campo “Nova categoria” e `handleAddCategory` (~41–51, ~174–191). Persistência em `customCategories` com validação de duplicata (~54–66 em `LocalStorageService`). |
| **Excluir categoria (padrão ou customizada)** | `AddExpenseScreen.tsx` + `LocalStorageService.removeCategory` | `handleRemoveCategory` com regra de manter ao menos uma categoria (~53–74). Para categorias padrão, usa `excludedDefaultCategories`; para customizadas, remove da lista (~68–77). |
| **Lista de categorias disponíveis na UI** | `LocalStorageService.getCategories` (~40–51) exposta via `ExpenseRepository` e `ExpenseViewModel.getCategories` | `AddExpenseScreen` mapeia `viewModel.getCategories()` para chips selecionáveis (~142–170). |
| **Resumo agrupado por categoria** | `SummaryScreen.tsx` + `ExpenseViewModel.getExpensesByCategory` (~28–35) | Ao focar a tela, carrega `getTotal()` e `getExpensesByCategory()` (~21–25). Para cada categoria, calcula subtotal e quantidade de itens (~56–76). |
| **Navegação entre telas** | `src/navigation/AppNavigator.tsx` | Stack: `Home` → `AddExpense` / `Summary` (~58–72). Tema e cabeçalho centralizados (~15–56). |
| **Inicialização do app e DI** | `App.tsx` | `setupDI()` antes de renderizar (~9); `AppNavigator` e `StatusBar` (~11–16). |

---

### Requisitos de arquitetura (MVVM)

| Camada | Arquivo(s) principal(is) | Papel |
|--------|--------------------------|--------|
| **Model** | `src/data/models/Expense.ts` | Interface `Expense` e tipos/categorias. |
| **Data / fonte de dados** | `LocalStorageService.ts` | Detalhe de armazenamento; a View não acessa diretamente (apenas via repositório na prática do fluxo atual). |
| **Repository** | `ExpenseRepository.ts`, interface `IExpenseRepository` | API estável para o domínio: CRUD de gastos, total, categorias. |
| **ViewModel** | `ExpenseViewModel.ts` | Orquestra o repositório para a UI: listas, total, agrupamento por categoria, categorias. |
| **View (telas)** | `HomeScreen`, `AddExpenseScreen`, `SummaryScreen` | Apresentação e eventos; obtêm `ExpenseViewModel` via `Container.getInstance().resolve('ExpenseViewModel')` (padrão usado nas três telas). |

Fluxo típico: **View** → **ViewModel** → **Repository** → **LocalStorageService**.

---

### Clean Code e organização de UI

- **Separação de estilos**: `HomeScreen.styles.ts`, `AddExpenseScreen.styles.ts`, `SummaryScreen.styles.ts` (e estilos locais em `ExpenseCard.tsx` onde o componente é autocontido).
- **Nomes e contratos**: campos alinhados ao modelo (`nm_despesa`, `vlr_despesa`, `tp_despesa`, `data`); interface `IExpenseRepository` documenta o contrato da camada de dados.
- **Componentes focados**: `ExpenseCard` só exibe um gasto e dispara exclusão via callback.

---

### Injeção de dependência

| Aspecto | Localização | Detalhe |
|---------|-------------|---------|
| Container (estilo service locator / GetIt) | `src/core/Container.ts` | `register` / `resolve`, cache de instâncias em `services`, `setupDI()` limpa e registra a cadeia (~47–63). |
| Registros | Mesmo arquivo | `LocalStorageService` → `ExpenseRepository` → `ExpenseViewModel` (~51–61). |
| Uso no app | `App.tsx` linha 9; telas resolvem `ExpenseViewModel` | Garante um único repositório/view model alinhado ao singleton de storage. |

---

### Design patterns

| Pattern | Onde | Evidência no código |
|---------|------|---------------------|
| **Repository** | `ExpenseRepository.ts` | Comentário no topo do arquivo; classe implementa `IExpenseRepository` e delega a `LocalStorageService`. |
| **Singleton** | `LocalStorageService.ts` | Construtor privado, `getInstance()` e `instance` estático (~9–21). |
| **Singleton (Container)** | `Container.ts` | Mesmo padrão para o container de DI (~11–22). |

---

### Testes unitários

Arquivo: `test/ExpenseRepository.test.ts` (Jest).

| Caso de teste | Método(s) exercitado(s) no código de produção | O que valida |
|---------------|-----------------------------------------------|--------------|
| Adicionar um gasto | `repository.add`, `getAll` | Persistência e leitura do gasto. |
| Remover um gasto | `add`, `remove`, `getAll` | Lista vazia após remoção por `id`. |
| Calcular o total | `add` (vários), `getTotal` | Soma correta de `vlr_despesa`. |
| Filtrar por categoria | `add`, `getByCategory` | Apenas despesas com `tp_despesa` igual à categoria. |
| Rejeitar valores negativos | `add` | `throw` com mensagem `Valor não pode ser negativo`; lista permanece vazia. |

`beforeEach` usa `LocalStorageService.getInstance()` e `storage.clear()` para isolar cenários (~22–26).

---

### Resumo rápido (checklist acadêmico)

- **MVVM**: telas em `presentation/screens`, `ExpenseViewModel`, dados via `ExpenseRepository` e `LocalStorageService`.
- **Clean Code**: estilos separados, modelos tipados, funções com responsabilidade clara.
- **DI**: `Container.ts` + `setupDI` em `App.tsx`.
- **Padrões**: Repository + Singleton (storage e container).
- **Testes**: cinco cenários no repositório em `test/ExpenseRepository.test.ts`.

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

Link do vídeo de apresentação no youtube:
https://youtu.be/jPwexBiNZFQ
