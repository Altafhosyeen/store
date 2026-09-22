Written for: engineers and AI agents adding features to this codebase.

# Architecture

Feature-first React. Ant Design owns the application shell; Tailwind is a utility
layer only. TanStack Query owns server state. Permissions drive UI access.

## Dependency direction

The arrow points one way. `scripts/check-staged.mjs` enforces it on every commit.

```
features/  ──>  components/ constants/ hooks/ lib/ navigation/ permissions/ services/ types/
   │
   └── within a feature:  pages ──> hooks ──> services ──> @/services/api
```

- A feature may import shared code. Shared code may **never** import `@/features/*`.
- A feature may import another feature's `index.ts` (its public API), never its
  internal files. `account/` imports `OrderDto` from `orders/`'s public API this
  way — the customer's own order history reuses the same shape the admin console
  uses.
- `services/` is the only layer that talks to the backend. Pages and components
  never import a `*.service` file — they go through hooks.

## Feature module shape

Copy `src/features/products/` — it is the reference implementation.

```
features/products/
├── components/                    feature-local UI (ProductCard, ProductsTable)
├── constants/products.constants.ts endpoints, enums, option labels
├── hooks/use-products.ts          TanStack Query; only consumer of services/
├── pages/                         thin: orchestrate hooks + components
│                                  (admin CRUD pages AND storefront browsing pages)
├── schemas/product.schema.ts      Zod business validation
├── services/products.service.ts  the only backend caller
├── types/products-api.types.ts   API DTOs
├── routes.tsx                    lazy-loaded route objects (admin + storefront)
└── index.ts                      public API
```

A domain that serves both the admin console and the public storefront (products,
categories) keeps both sets of pages in the same feature folder, since they
share the same service/hooks/types layer — only the route trees and shells
differ. `routes.tsx` exports two arrays (e.g. `productsRoutes` for the admin
console, `shopRoutes` for the storefront) so the root router can mount each
under its own layout.

Feature-specific values stay in the feature's own `constants/`. Only genuinely
shared values go in `src/constants/`.

Every feature carries this shape, including the small ones. A feature with a
single page still owns a `routes.tsx` and an `index.ts`, so mounting it is one
import in the root router rather than a lazy-import reaching into its `pages/`.

**Where a component lives** follows from who uses it:

| Used by | Lives in |
| --- | --- |
| One feature | `features/<domain>/components/` |
| Two or more features | `src/components/` |

A component used by exactly one feature belongs to that feature, however
generic it looks. Promote it to `src/components/` when a second feature needs
it — not in anticipation. `ProductPrice` and `StatCard` already live in
`src/components/` because more than one feature renders a price or a stat tile.

Inside `src/components/`:

| Folder | Holds |
| --- | --- |
| `common/` | cross-feature UI in active use (`PageHeader`, `Text`, `StatusTag`, `StatCard`) |
| `feedback/` | query, error and empty states |
| `storefront/` | storefront-specific shared UI (`ProductPrice`) |

## Shared layers

| Path | Owns |
| --- | --- |
| `src/constants/` | roles, permissions, routes, API endpoints, query keys, storage keys |
| `src/services/api/` | axios instance, interceptors, token refresh, error normalization |
| `src/services/storage/` | the only module allowed to touch localStorage/sessionStorage |
| `src/permissions/` | pure authorization predicates |
| `src/navigation/` | per-role menu metadata, permission-filtered |
| `src/store/` | auth, ui, lookup cache, cart |
| `src/hooks/lookups/` + `src/hooks/caching/` | two-tier reference-data cache |

## Routing

- `/login`, `/register`, `/forgot-password` → `PublicRoute` + `AuthLayout`
- `/app/*` → `ProtectedRoute` + `AdminLayout` (Admin console)
- `/shop`, `/shop/categories`, `/cart`, `/checkout` → `StorefrontLayout`, public
  (no auth guard — guests can browse and add to cart)
- `/account/*` → `StorefrontLayout` + `ProtectedRoute` (signed-in customers only)

Guards: `ProtectedRoute` (authenticated), `PermissionRoute` (capability),
`RoleRoute` (whole-experience split only — reserved for a future shell split
beyond the current console/storefront divide).

## Authorization

Roles say who the user is; permissions say what they can do. Use
`usePermissions()` / `<PermissionGate>` for feature access. Reserve role checks
for whole-experience splits.

**The backend is the security boundary.** Frontend checks are UX only.

## State

| Concern | Owner |
| --- | --- |
| Server state | TanStack Query |
| Table/grid filters, pagination, sort | URL search params (`useTableParams`) |
| Reference data (categories, brands) | two-tier cache: query + `lookup.store` |
| Guest cart | `cart.store` (localStorage-persisted, survives sign-in/out) |
| Global UI | `ui.store` |

Do not mirror query data into Zustand. The lookup cache and cart are the two
exceptions — the lookup cache for stable reference data, the cart because it
must survive a reload without requiring sign-in.

Checkout always re-prices and re-validates stock against the backend response
when placing an order — the cart store's prices are for display only.

## Mock mode

`VITE_ENABLE_MOCK=true` runs the whole app on mock data with no backend. The
flag is read once in `env.config.ts` as `isMockEnabled`, and `main.tsx` calls
`setupMocks()` before mounting.

```bash
# .env.local
VITE_ENABLE_MOCK=true
```

```
src/mocks/
├── data/                  fixtures, one file per domain (also used by tests)
├── handlers/              endpoint -> fixture, one file per domain
├── mock-router.ts         path matching, :params, MockHttpError
├── mock-adapter.ts        the axios adapter
└── index.ts               setupMocks(), the root-level switch
```

Mocking is installed as an **axios adapter**, not a branch inside services, so
the shared client, interceptors, hooks and pages all run exactly as they do
against a real backend — only the transport changes. Hard rule 3 still holds.

- Any password signs you in; the **email picks the role** (see `data/auth.mock.ts`).
- List endpoints really filter, search and page, so tables/grids behave believably.
- Creates, edits and status changes persist until the page reloads.
- An unmocked endpoint throws a 501 naming the method and path, rather than
  returning empty data that would look like a backend bug.

**Production builds can never serve mocks.** `isMockEnabled` is gated on
`import.meta.env.PROD`, which Vite replaces with a literal, so the bundler drops
the branch and emits no mock chunk at all — the fixtures are absent from the
bundle, not merely unused. Because of that, `src/mocks/index.ts` must not
re-export anything: `main.tsx` imports it statically, and a re-export would pull
the fixtures back in. Tests import `@/mocks/mock-adapter` directly.

## Tests

Specs live in a top-level `tests/` tree that **mirrors `src/`**. Production code
and test code stay separate, so `src/` contains no `.test.ts` files.

```
src/permissions/access-control.ts   ->  tests/permissions/access-control.test.ts
src/hooks/use-debounced-value.ts    ->  tests/hooks/use-debounced-value.test.ts
src/features/products/hooks/...     ->  tests/features/products/hooks/...
```

| Path | Owns |
| --- | --- |
| `tests/support/` | shared helpers, exported through `@tests/support` |
| `tests/mocks/` | re-export of `src/mocks/data`, reached as `@tests/mocks` |
| `tests/setup/` | one Vitest setup module per browser API jsdom lacks |

Mock data lives in `src/mocks/data/`, one file per domain (`auth.mock.ts`,
`products.mock.ts`, `categories.mock.ts`, `orders.mock.ts`, plus `api.ts` for
the pagination envelope and normalized errors) so the dev-time mock mode and
the tests share one set of fixtures. Import from the `@tests/mocks` barrel:

```ts
import { MOCK_PRODUCT_PUBLISHED, makeProduct, makePaginatedResult } from "@tests/mocks";
```

- Every domain exports ready-made constants (`MOCK_PRODUCT_PUBLISHED`) **and** a
  builder (`makeProduct(overrides)`). Use the constant when any valid row will
  do; the builder when the assertion depends on a specific field.
- Ids are shared across domains: a mock product's `categoryId` resolves to a
  real entry in `MOCK_CATEGORIES`.
- Mocks import values from `@/constants`, never hardcoded permission or status
  strings, so a renamed constant breaks them at compile time.
- Order/product timestamps are relative to `Date.now()`, never hardcoded dates.
- `tests/mocks/mocks.test.ts` guards these invariants.

Import helpers from the `@tests/support` barrel, never a file inside it:

```ts
import { renderWithProviders, screen, signIn, makeUserWithRole } from "@tests/support";
```

- `renderWithProviders` mounts the real Query, antd and Router providers, and
  returns `{ user, queryClient }`. `renderHookWithProviders` is the hook form.
- `signIn(user)` sets the real auth store; prefer it to mocking `usePermissions`,
  which would mock away the logic under test.
- `makeUser` / `makeUserWithRole` / `makeUserWithPermissions` are builders: state
  only the fields the assertion depends on.
- Each setup concern (`match-media`, `resize-observer`, `storage`, `cleanup`) is
  its own module. Add a new stub as a new file, not to a catch-all.

`tests/` is typechecked by `tsconfig.test.json` and inspected by the
architecture checker, same as `src/`. Test files are exempt from three rules
only: they may import axios to build error fixtures, they may spell
`/app/...`/`/shop/...`/etc. URLs (a spec drives route matching with paths the
app does not serve), and they have no line limit.

## Adding a feature

1. `src/features/<domain>/` using the shape above.
2. Add route + permission constants to `src/constants/`.
3. Service → hooks → pages.
4. Export route objects from `routes.tsx`; mount them in `src/app/router/routes.tsx`
   under the right shell (`AdminLayout` for console features, `StorefrontLayout`
   for public/customer features).
5. Add navigation metadata (admin console only) with permission requirements.
6. Handle loading, error, empty, and permission-denied states
   (`<QueryStateBoundary>`).
7. Test the behavior that would actually break, in `tests/features/<domain>/`.
8. `npm run quality:check`.
