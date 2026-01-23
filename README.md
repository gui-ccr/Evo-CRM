# Dashboard Nexus EVO - CRM para EVO Coaching

## Visão Geral

Dashboard Nexus EVO é um CRM personalizado desenvolvido especialmente para o EVO Coaching, focado em gestão de leads, automação de mensageria (WhatsApp e E-mail) e análise de conversões de mentorias e programas de coaching.

## Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Roteamento
- **Lucide React** - Ícones

## Design System - Cores EVO Coaching

- **Dourado Principal**: `#eab308` (evo-gold-500)
- **Preto Principal**: `#18181b` (evo-dark-900)
- **Branco**: `#ffffff`
- **Cinzas**: Escala de evo-dark-50 a evo-dark-900

## Funcionalidades Principais

### 1. Dashboard Nexus EVO (Executive View)
- Cards de resumo: Total de Leads, Taxa de Conversão, ROI, Status dos Disparos
- Gráfico de volume de novos leads vs. vendas
- Tabela de conversões recentes
- Notificações em tempo real

### 2. Gestão de Clientes/Leads
- Visualização completa de leads
- Lead Scoring (leads quentes, mornos, frios)
- Filtros inteligentes por origem (Evento presencial, Lançamento digital, etc.)
- Estatísticas de engajamento

### 3. Upload de Listas
- Centro de upload drag-and-drop para arquivos .xlsx e .csv
- Histórico de importações
- Deduplicação automática de leads
- Status de processamento em tempo real

### 4. Disparo de Mensagens (Centro de Automação)
- Editor de templates com variáveis dinâmicas: `{{nome}}`, `{{evento}}`, `{{link_pagamento}}`
- Suporte para WhatsApp e E-mail
- Agendador de disparos
- Relatório de entrega (Entregues, Lidos, Erros)
- Gráfico de pizza para visualização de métricas

### 5. Configurações
- Perfil do usuário
- Notificações personalizadas
- Tema Dark/Light mode
- Integrações (WhatsApp API, SMTP E-mail)
- Segurança (2FA, gestão de sessões)

## Estrutura do Projeto

```
ERP/
├── src/
│   ├── components/
│   │   ├── features/      # Componentes específicos por funcionalidade
│   │   ├── layout/        # Layout e navegação
│   │   └── ui/            # Componentes UI reutilizáveis
│   ├── pages/             # Páginas principais do app
│   │   ├── Dashboard.tsx
│   │   ├── Clientes.tsx
│   │   ├── Upload.tsx
│   │   ├── Mensagens.tsx
│   │   └── Configuracoes.tsx
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js     # Configuração de cores EVO
└── package.json
```

## Como Executar

### Instalação
```bash
cd ERP
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## Dados Mockados

**IMPORTANTE**: Esta versão do dashboard utiliza dados mockados para demonstração. Todas as funcionalidades são visuais e não conectam a nenhum backend ou banco de dados. Os dados são estáticos e definidos diretamente nos componentes.

### Exemplos de Dados Mockados:
- Leads e conversões
- Estatísticas de performance
- Histórico de importações
- Templates de mensagens
- Disparos agendados
- Relatórios de entrega

## Responsividade

O dashboard foi desenvolvido com abordagem "Mobile First" seguindo as especificações do cliente:
- Layout adaptativo para desktop, tablet e mobile
- Sidebar responsiva
- Tabelas com scroll horizontal em telas pequenas
- Cards empilháveis em dispositivos móveis

## Skeleton Screens

Durante o carregamento de dados (simulado), o sistema exibe placeholders elegantes para melhorar a experiência do usuário e evitar sensação de lentidão.

## Próximos Passos (Backend)

Para tornar o sistema funcional, será necessário:
1. Integração com banco de dados (Supabase ou similar)
2. Implementação de APIs para CRUD de leads
3. Integração real com WhatsApp Business API
4. Integração com serviço SMTP para e-mails
5. Sistema de autenticação e autorização
6. Upload real de arquivos e processamento de planilhas
7. Agendamento real de disparos
8. Webhooks para rastreamento de entregas

## Licença

Projeto proprietário - EVO Coaching © 2024
