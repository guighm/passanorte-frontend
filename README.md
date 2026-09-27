# SPD-PassaNorte — Frontend

Painel administrativo **PassaNorte (Manauscult / PMM)** do sistema distribuído de gamificação do turismo de Manaus: a prefeitura gerencia pontos turísticos, eventos, rotas e roteiros, controla o estoque e a concessão de benefícios (insígnias/brindes) e acompanha insights de fluxo de turistas.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, `src/app`) · [React](https://react.dev) 19 · [TypeScript](https://www.typescriptlang.org) 5
- [Tailwind CSS](https://tailwindcss.com) 4 (via PostCSS) · fonte Inter via `next/font/google`
- [pnpm](https://pnpm.io) como gerenciador de pacotes (definido via `packageManager`)

## Estrutura

```
src/
├── app/                  # Rotas (App Router)
│   ├── page.tsx          # Raiz: redireciona para /login
│   ├── login/            # Autenticação
│   ├── dashboard/        # Visão geral e insights (origem de turistas, ranking de pontos, atrativos, menções)
│   ├── pontos-turisticos/
│   ├── eventos/
│   ├── rotas/            # Rotas & Roteiros
│   ├── estoque-beneficios/
│   ├── concessao-beneficios/
│   ├── servidores/       # Servidores & Acessos
│   └── configuracoes/
├── components/
│   └── layout/           # AppShell, Sidebar, Header
└── ...

public/
├── icons/                # Ícones SVG da navegação e das páginas
└── images/               # Logo PassaNorte
```

As páginas da navegação lateral usam o layout compartilhado `AppShell` (sidebar verde-institucional `#002f19` + header com breadcrumb). Atualmente os dados são mockados em cada página — ainda não há integração com a API do backend.

## Como rodar

Pré-requisito: [pnpm](https://pnpm.io) (definido via `packageManager` no `package.json`).

```bash
# Instalar dependências
pnpm install

# Servidor de desenvolvimento em http://localhost:3000
pnpm dev

# Build de produção e servidor
pnpm build
pnpm start

# Lint
pnpm lint
```

> **Atenção:** esta versão do Next.js possui breaking changes em relação às versões conhecidas. Consulte os guias em `node_modules/next/dist/docs/` antes de escrever código.

## Documentação do Next.js

Para saber mais sobre o Next.js, consulte:

- [Documentação do Next.js](https://nextjs.org/docs) — recursos e APIs.
- [Aprenda Next.js](https://nextjs.org/learn) — tutorial interativo.