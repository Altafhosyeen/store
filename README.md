Written for: developers joining or setting up this project.

# Royal Nuts Store

Storefront and admin console for Royal Nuts — product catalog, cart,
checkout and order management — built on React + Vite.

## Tech Stack

| Layer | Library |
| --- | --- |
| Framework | React + TypeScript |
| Build tool | Vite |
| Routing | React Router |
| UI | Ant Design |
| Styling | Tailwind CSS (utility layer only) |
| Server state | TanStack Query |
| Client state | Zustand (only where truly global) |
| HTTP | Axios (shared client) |
| Validation | Zod |
| Formatting / linting | Biome |
| Testing | Vitest + React Testing Library |
| Git hooks | Lefthook (staged-file checks) |

## Getting Started

Prerequisites: Node LTS (see `.nvmrc`) and npm.

```bash
nvm use
cp .env.example .env.local   # fill in real values
npm install                  # also installs lefthook git hooks
npm run dev                  # http://localhost:5173
```

No backend yet? Set `VITE_ENABLE_MOCK=true` in `.env.local` and the app runs
entirely on mock data — see [Mock mode](CLAUDE.md#mock-mode).

### Environment Variables

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Backend API base URL (falls back to the current origin) |
| `VITE_ENVIRONMENT` | development / staging / production |
| `VITE_ACCESS_TOKEN_ALIAS` | Access token cookie name |
| `VITE_REFRESH_TOKEN_ALIAS` | Refresh token cookie name |
| `VITE_SSL_ENABLED` | Mark auth cookies Secure (set true when served over HTTPS) |
| `VITE_PAGINATION_SIZE` | Default table/grid page size |
| `VITE_ENABLE_MOCK` | Serve the app from mock data instead of the backend (dev only) |

Environment variables are read in exactly one place:
`src/app/config/env.config.ts`. Import the typed `env` object, never
`import.meta.env`.

### Secrets — Hard Rules

**Never read, open, print, or copy `.env`, `.env.local`, or any file holding
real credentials.** This applies to everyone working in the repo, humans and AI
coding agents alike.

- **Never commit a real secret.** `.env` and `.env.local` are git-ignored and
  must stay that way. Only `.env.example` is tracked, and it holds
  **placeholders only** — never a working value.
- **Never paste secret values into a chat, issue, PR, commit message, log, or
  screenshot.** Refer to a variable by name (`VITE_BACKEND_URL`), never by value.
- **Never `cat`, `echo`, or otherwise print a secret-bearing file.** To learn
  which variables exist, read `.env.example` or the table above — both are safe.
- **No secrets belong in this frontend at all.** Anything shipped to the browser
  is public: every `VITE_*` value is inlined into the build and readable by any
  user. API keys, signing keys, and database credentials belong on the backend.
- **When adding a variable**, add it to `.env.example` with a placeholder and to
  the table above, in the same PR.

If a secret is ever committed or exposed, treat it as compromised: **rotate it
first**, then clean the history. Removing the file in a later commit does not
undo the exposure — the value stays in the git history and in any clone.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Typecheck + Vite production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` / `test:run` | Vitest (watch / CI) |
| `npm run lint` / `format` | Biome lint / format |
| `npm run quality:check` | typecheck + lint + test:run + build |

## Roles

Admin, Customer. Admin runs the admin console (catalog,
orders, customers); Customers use the public storefront. UI access is
permission-driven — see `src/constants/permissions.constants.ts`.

## Project Structure

```
src/
├── app/
│   ├── config/          typed env access
│   ├── layouts/         AdminLayout, AuthLayout, StorefrontLayout
│   ├── providers/       antd, query, auth, error boundary
│   └── router/          routes + guards
├── features/            business domains (products is the reference)
│   ├── products/        catalog CRUD (admin) + shop browsing (storefront)
│   ├── categories/       category CRUD (admin) + category grid (storefront)
│   ├── cart/             guest-friendly cart (Zustand, localStorage-persisted)
│   ├── checkout/         address + payment stub + order placement
│   ├── orders/           admin order management
│   ├── customers/        admin customer list
│   ├── auth/             login, register, forgot password
│   ├── account/          customer order history, addresses, profile
│   └── dashboard/        admin console home (stat cards)
├── components/           shared UI
├── constants/            roles, permissions, routes, api, query, storage, app
├── navigation/           per-role, permission-filtered menus
├── permissions/          access-control predicates
├── services/
│   ├── api/              client, interceptors, tokens, errors
│   └── storage/          the only storage accessor
├── store/                auth, ui, lookup, cart
├── hooks/                lookups + caching + shared utilities
├── lib/                  query client
├── types/                shared types
└── styles/
```

## Architecture

Ant Design owns the application shell; Tailwind is a utility layer. Server state
lives in TanStack Query. Constants are centralized. Authorization is
permission-driven on the frontend for UX — **the backend remains the security
authority**.

Full detail: [.claude/architecture.md](.claude/architecture.md).

## Quality Gates

| Stage | Runs |
| --- | --- |
| pre-commit | Biome + architecture checker on staged files |
| commit-msg | Conventional Commits validation |
| pre-push | typecheck + Vitest + Vite production build |

## Contributing

Read [.claude/README.md](.claude/README.md) before writing code. Commit messages
follow Conventional Commits; Lefthook hooks must pass.

Treat a stale README as a bug: update it in the same PR that changes what it
documents.
