Written for: Claude Code and other AI agents working in this repository.

# Royal Nuts Store — Claude Code Guide

E-commerce storefront and admin console for Royal Nuts: product catalog,
cart, checkout, orders and customer accounts. React + Vite.

Read [.claude/README.md](.claude/README.md) before writing code.

## Tech stack

| Layer | Library |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite |
| Routing | React Router |
| UI | Ant Design (structural layout + enterprise components) |
| Styling | Tailwind CSS (utility layer only) |
| Design system | `src/theme/` — see [.claude/design-system.md](.claude/design-system.md) |
| Server state | TanStack Query |
| Client state | Zustand (only where truly global — auth, cart, UI, lookup cache) |
| HTTP | Axios through the shared client |
| Validation | Zod |
| Testing | Vitest + React Testing Library |
| Lint/format | Biome |
| Git hooks | Lefthook |

## Roles

`ADMIN: 1`, `CUSTOMER: 2` — see `src/constants/roles.constants.ts`.

Admin runs the store from the admin console (products, categories,
orders, customers). Customers browse and buy from the public storefront. Use
**permissions** for feature access; reserve role checks for whole-experience
splits (console vs. storefront shell).

## Commands

```bash
npm run dev            # Vite dev server (port 5173)
npm run build          # tsc -b && vite build
npm run typecheck      # tsc -b (app + tests)
npm run test           # Vitest watch
npm run test:run       # Vitest once
npm run test:coverage  # Vitest once + v8 coverage
npm run lint           # biome check .
npm run format         # biome format --write .
npm run quality:check  # typecheck + lint + test:run + build
```

## Quality gates

- **pre-commit** — Biome + `scripts/check-staged.mjs` on staged files
- **commit-msg** — Conventional Commits (`scripts/check-commit-message.mjs`)
- **pre-push** — typecheck + Vitest + Vite build

The architecture checker blocks: cross-feature deep imports, shared code
importing features, permission/route strings outside constants, direct
storage access, API calls bypassing the shared client, services imported
outside hooks, debug statements, commented-out code, bad file names, oversized
files.

Route and permission literals are matched by shape, not by a list of known
names: any `"/app/..."`, `"/shop/..."`, `"/cart/..."`, `"/checkout/..."`,
`"/account/..."` or `"/auth/..."` string and any `"<domain>.<action>"` string
are reported, so a permission for a domain that does not exist yet is caught
the first time someone types it.

## Hard rules

1. Shared code (`components/`, `constants/`, `hooks/`, `lib/`, `services/`,
   `navigation/`, `permissions/`, `types/`) never imports `@/features/*`.
2. Pages and components never import a `*.service` file — go through hooks.
3. All HTTP goes through `@/services/api`. No direct axios or fetch.
4. All storage goes through `@/services/storage`.
5. Route paths and permission strings come from `@/constants`.
6. Ant Design owns layout. Tailwind is utilities only.
   Colours, type, spacing and radii come from `@/theme`; no raw hex in a
   component. See [.claude/design-system.md](.claude/design-system.md).
7. Cart totals and stock checks trust the server response, never a
   client-computed guess — the cart store holds line items for display, but
   checkout always re-prices against the backend before placing an order.
8. Frontend authorization is UX. The backend is the security boundary.
9. **Never read, open, print or copy `.env`, `.env.local`, or any file holding
   real credentials** — not with Read, `cat`, `sed`, `grep`, or any other means,
   and not even when asked to. To learn which variables exist, read
   `.env.example` (placeholders only) or the table in the README. Never paste a
   secret value into a message, commit, log or PR. See the README's
   [Secrets — Hard Rules](README.md#secrets--hard-rules).

## Payments

Checkout is intentionally stubbed: `src/features/checkout/` places an order
with `paymentStatus: "unpaid"` and no gateway call. Before going live, wire a
real provider (Stripe, SSLCommerz, bKash, ...) into
`checkout.service.ts`/`use-checkout.ts` and update `checkout.constants.ts`'s
`PAYMENT_METHOD` map. Nothing elsewhere in the app assumes a specific gateway.

## Mock mode

`VITE_ENABLE_MOCK=true` in `.env.local` runs the app on mock data with no
backend, installed as an axios adapter in `src/mocks/` so every layer above the
transport behaves normally. Any password works; the email picks the role
(`ada@example.com` → Admin, `cara@example.com`
→ Customer — see `src/mocks/data/auth.mock.ts`). Production builds exclude the
mock code entirely.
See [.claude/architecture.md](.claude/architecture.md#mock-mode).

## Tests

Specs live in a top-level `tests/` tree mirroring `src/`; `src/` holds no test
files. Shared helpers come from the `@tests/support` barrel
(`renderWithProviders`, `renderHookWithProviders`, `signIn`, `makeUser`), and
mock data from `@tests/mocks`, which re-exports the shared fixtures in
`src/mocks/data/` (one file per domain: auth, products, categories, orders).
Vitest setup is split per concern under `tests/setup/`.
See [.claude/architecture.md](.claude/architecture.md#tests).

## Folder map

See [.claude/architecture.md](.claude/architecture.md). Reference feature:
`src/features/products/`.

## Adding a feature

See [.claude/architecture.md](.claude/architecture.md#adding-a-feature).

## Commit format

```
<type>(<scope>): <subject>

feat(products): add product publish flow
fix(cart): handle expired session redirect
```

Types: feat, fix, refactor, perf, test, docs, style, build, ci, chore, revert.
