# Arquitetura do Projeto - EVO Coaching CRM

## Visão Geral

Este projeto foi refatorado seguindo os princípios de **Clean Code**, **SOLID** e **Feature-Based Architecture** para garantir manutenibilidade, escalabilidade e facilidade de compreensão.

## Estrutura de Pastas

```
src/
├── features/               # Feature-based organization
│   ├── dashboard/         # Feature de Dashboard
│   │   ├── components/    # Componentes específicos do Dashboard
│   │   ├── hooks/         # Hooks customizados do Dashboard
│   │   ├── Dashboard.tsx  # Página principal
│   │   └── index.ts       # Barrel export
│   │
│   ├── clientes/          # Feature de Gestão de Clientes
│   │   ├── components/    # Componentes de UI
│   │   ├── hooks/         # Lógica de negócio
│   │   ├── types/         # TypeScript types/interfaces
│   │   └── Clientes.tsx   # Página principal
│   │
│   ├── upload/            # Feature de Upload de Listas
│   ├── mensagens/         # Feature de Disparo de Mensagens
│   ├── configuracoes/     # Feature de Configurações
│   │
│   └── shared/            # Recursos compartilhados
│       ├── components/    # Componentes reutilizáveis (Card, StatCard)
│       ├── hooks/         # Hooks compartilhados
│       ├── layout/        # Layout components (Sidebar, AppLayout)
│       ├── types/         # Types globais
│       └── utils/         # Funções utilitárias (formatters)
│
├── contexts/              # React Contexts (Theme, etc)
├── App.tsx                # Configuração de rotas
└── main.tsx               # Entry point

```

## Princípios Aplicados

### 1. Feature-Based Architecture

Cada feature é **auto-contida** e organizada em sua própria pasta com:
- **components/**: Componentes de UI específicos da feature
- **hooks/**: Lógica de negócio e estado
- **types/**: Definições de tipos TypeScript
- **Feature.tsx**: Página/componente principal

**Benefícios:**
- Fácil localização de código relacionado
- Facilita trabalho em equipe (cada dev pode trabalhar em uma feature)
- Permite lazy loading por feature
- Simplifica testes

### 2. Single Responsibility Principle (SRP)

Cada componente tem **uma única responsabilidade**:

```typescript
// ❌ ANTES: Componente fazendo tudo
function ClientesPage() {
  // lógica de fetch, estado, formatação, UI, tudo junto
}

// ✅ DEPOIS: Separação clara
function Clientes() {
  const { clientes, stats } = useClientesData(); // Hook para dados
  return (
    <>
      <ClientesHeader />              // Apenas header
      <ClientesStats stats={stats} /> // Apenas stats
      <ClientesTable clientes={clientes} /> // Apenas tabela
    </>
  );
}
```

### 3. Open/Closed Principle (OCP)

Componentes **abertos para extensão, fechados para modificação**:

```typescript
// StatusBadge aceita diferentes tipos via configuração
const statusConfig = {
  ativo: { className: '...', label: 'Ativo' },
  pendente: { className: '...', label: 'Pendente' },
  // Fácil adicionar novos status sem modificar o componente
};
```

### 4. Dependency Inversion Principle (DIP)

Componentes dependem de **abstrações** (props/interfaces), não de implementações:

```typescript
interface ClientesTableProps {
  clientes: Cliente[]; // Depende da interface, não da implementação
}

export function ClientesTable({ clientes }: ClientesTableProps) {
  // Não sabe de onde vêm os dados (API, mock, etc)
}
```

### 5. Clean Code

**Sem comentários desnecessários**: Código auto-explicativo

```typescript
// ❌ ANTES
// Este componente renderiza a lista de clientes
function ClientesList() { ... }

// ✅ DEPOIS
function ClientesTable() { ... } // Nome já explica o que faz
```

**Funções pequenas e focadas**:
```typescript
// Cada função faz uma coisa só
export const formatCurrency = (value: number): string => { ... }
export const formatDate = (dateString: string): string => { ... }
```

## Padrões de Código

### Nomenclatura

- **Componentes**: PascalCase (`ClientesTable.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useClientesData.ts`)
- **Types**: PascalCase (`Cliente`, `ClienteStatus`)
- **Constantes**: camelCase (`statusConfig`)

### Organização de Imports

```typescript
// 1. Bibliotecas externas
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

// 2. Imports relativos de shared
import { formatCurrency } from '../../shared/utils/formatters';
import { Card } from '../../shared/components/Card';

// 3. Imports locais da feature
import { StatusBadge } from './StatusBadge';
import type { Cliente } from '../types';
```

### Composição de Componentes

Preferir **composição** ao invés de componentes grandes:

```typescript
// ✅ BOM: Componentes pequenos e compostos
<Clientes>
  <ClientesHeader onAddClient={handleAdd} />
  <ClientesStats stats={stats} />
  <Card title="Lista">
    <ClientesTable clientes={clientes} />
  </Card>
</Clientes>
```

## Hooks Customizados

Toda lógica de negócio está em **hooks reutilizáveis**:

```typescript
// hooks/useClientesData.ts
export function useClientesData() {
  // Futuramente pode buscar de API
  const clientes = [...];
  const stats = {...};

  return { clientes, stats };
}
```

**Benefícios:**
- Lógica separada da UI
- Fácil testar isoladamente
- Reutilizável entre componentes

## Types Centralizados

Cada feature tem seus próprios types:

```typescript
// features/clientes/types/index.ts
export type ClienteStatus = 'ativo' | 'inativo' | 'pendente';

export interface Cliente {
  id: string;
  nome: string;
  status: ClienteStatus;
  // ...
}
```

## Componentes Compartilhados

Componentes usados em múltiplas features ficam em `shared/`:

- **Card**: Container reutilizável
- **StatCard**: Card de estatísticas
- **AppLayout**: Layout principal
- **Sidebar**: Menu lateral

## Utilities

Funções utilitárias puras em `shared/utils/`:

```typescript
// Funções puras, sem efeitos colaterais
export const formatCurrency = (value: number): string => { ... }
export const formatDate = (dateString: string): string => { ... }
```

## Status da Implementação

Veja `CHECKLIST-IMPLEMENTACAO.md` para detalhes completos.

### ✅ Implementado (70%)
- Dashboard com 4 cards principais e gráfico de vendas
- Upload de arquivos com drag-and-drop e histórico
- Gestão de clientes completa
- Lista de templates e disparos
- Configurações e theme switcher
- Arquitetura feature-based com SOLID

### ⚠️ Pendente (30%)
- Gráfico de linha (Leads vs Vendas 30 dias)
- Status de processamento em tempo real
- **Página completa de CRM Intelligence (Funil de Vendas)**
- Editor de Templates funcional
- Interface de Agendamento de Disparos
- Gráfico de Pizza (Relatório de Entrega)
- Skeleton Screens
- Melhorias mobile

## Próximos Passos

### Alta Prioridade
1. **CRM Intelligence**: Criar feature completa de funil de vendas
2. **Gráfico de Linha**: Adicionar ao Dashboard (Leads vs Vendas)
3. **Progresso em Tempo Real**: Implementar no Upload

### Média Prioridade
4. **Editor de Templates**: Interface para criar/editar com variáveis
5. **Agendador de Disparos**: Modal de agendamento completo
6. **Relatório de Entrega**: Gráfico de pizza

### Técnicas
7. **Integração com API**: Substituir mocks por Supabase
8. **Testes**: Adicionar testes unitários
9. **Validação**: Zod ou Yup para formulários
10. **Error Boundaries**: Tratamento de erros por feature

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Conclusão

Esta arquitetura garante:
- ✅ Código limpo e fácil de entender
- ✅ Separação clara de responsabilidades
- ✅ Facilidade para adicionar novas features
- ✅ Manutenção simplificada
- ✅ Escalabilidade do projeto
