---
name: run-royal-nuts-store
description: Build, run, and drive the Royal Nuts storefront/admin console (Vite + React + Ant Design). Use when asked to start royal-nuts-store, run its dev server, run its tests, build it, take a screenshot of its UI, or interact with the running app (add to cart, sign in, navigate routes).
---

This is a Vite + React 18 + TypeScript + Ant Design e-commerce app (public
storefront + admin console) with a built-in mock-data mode, so it runs with
no backend. Drive it by starting the Vite dev server, then poking it with
the Playwright driver at `.claude/skills/run-royal-nuts-store/driver.mjs`.

All paths below are relative to the repo root (`store/`).

## Prerequisites

This was verified on Windows (Git Bash / MINGW64) with Node v20.19.0 and
npm 10.5.0. No OS packages beyond Node are required — Vite and Playwright's
bundled Chromium are the only runtime dependencies, and both install via npm.

## Setup

```bash
npm install
npm install --save-dev playwright@1.49.0   # one-time: adds the driver's dependency
npx playwright install chromium --with-deps # one-time: downloads the browser binary (~140MB)
```

Mock mode requires `.env.local` at the repo root (gitignored, not committed):

```bash
echo "VITE_ENABLE_MOCK=true" > .env.local
```

With this set, the app runs entirely on in-memory mock fixtures
(`src/mocks/`) — any password signs you in, and the email picks the role
(`ada@example.com` → Admin, `cara@example.com` → Customer). No backend,
database, or API keys needed.

## Build

Not required to run the app (Vite serves TS/TSX directly in dev mode). To
verify a production build compiles:

```bash
npm run build   # tsc -b && vite build
```

## Run (agent path)

1. Start the dev server in the background:

```bash
npm run dev &
# Vite prints the port — 5173 by default, but it auto-increments
# ("Port 5173 is in use, trying another one...") if something already
# holds it. Read the actual port from its stdout before driving it.
```

2. Drive it with the Playwright script. **On Git Bash / MINGW, set
   `MSYS_NO_PATHCONV=1`** or Bash rewrites a leading `/` route argument
   into a Windows path (e.g. `/shop` becomes `C:/Program Files/Git/shop`)
   and every navigation fails with `Cannot navigate to invalid URL`.

```bash
MSYS_NO_PATHCONV=1 BASE_URL=http://localhost:5174 \
  node .claude/skills/run-royal-nuts-store/driver.mjs shot /shop screenshots/shop.png
```

(Replace `5174` with whatever port step 1 actually printed.)

| command | what it does |
|---|---|
| `shot <path> <out.png>` | Navigate to `BASE_URL<path>`, full-page screenshot to `<out.png>` |
| `eval <path> <jsExpr>` | Navigate, run a JS expression in-page, print the JSON result |
| `click <path> <selector> [out.png]` | Navigate, click a Playwright selector, optional screenshot after |
| `fill <path> <selector> <text> [out.png]` | Navigate, fill an input, optional screenshot after |

Verified this session:

```bash
MSYS_NO_PATHCONV=1 BASE_URL=http://localhost:5174 node .claude/skills/run-royal-nuts-store/driver.mjs shot / screenshots/home.png
MSYS_NO_PATHCONV=1 BASE_URL=http://localhost:5174 node .claude/skills/run-royal-nuts-store/driver.mjs eval / "document.title"
# -> "Royal Nuts"
MSYS_NO_PATHCONV=1 BASE_URL=http://localhost:5174 node .claude/skills/run-royal-nuts-store/driver.mjs shot /shop screenshots/shop.png
MSYS_NO_PATHCONV=1 BASE_URL=http://localhost:5174 node .claude/skills/run-royal-nuts-store/driver.mjs click /shop "text=Add to Cart" screenshots/cart-added.png
# -> cart badge in the header goes from empty to "1"
```

The driver prints any browser console errors it captured (`console.error`,
uncaught exceptions) after the command output — check that even when a
screenshot "looks fine," since a silently-failed API call won't show up
visually in mock mode.

Screenshots land wherever you point `<out.png>` — pass an absolute path or
one relative to the repo root; the examples above use `screenshots/`
(gitignored scratch dir, create it with `mkdir -p screenshots` first).

## Run (human path)

```bash
npm run dev
# -> opens on http://localhost:5173 (or next free port). Ctrl-C to stop.
```

## Test

```bash
npm run test:run       # Vitest once, no watch — 5 files, 34 tests, ~6-50s
npm run typecheck      # tsc -b --force
npm run lint           # biome check .
npm run quality:check  # typecheck + lint + test:run + build, in order
```

All 34 tests pass as of this session.

---

## Gotchas

- **`chromium-cli` is not available in this environment.** This machine is
  Windows/Git Bash, not a Linux container with it preinstalled. The driver
  uses `playwright` directly instead (installed as a devDependency, not
  global) — `npx playwright install chromium` alone is not enough, since
  that only fetches the browser binary; `import { chromium } from
  "playwright"` still fails with `Cannot find module 'playwright'` until
  the npm package itself is installed too.
- **Git Bash mangles leading-slash arguments.** `node driver.mjs shot /shop
  out.png` silently turns `/shop` into `C:/Program Files/Git/shop` unless
  `MSYS_NO_PATHCONV=1` is set on that invocation. The resulting Playwright
  error (`Cannot navigate to invalid URL`) gives no hint this is a shell
  quoting issue, not an app bug.
- **The dev server's port is not fixed.** `npm run dev` binds 5173 only if
  free; otherwise it silently moves to 5174, 5175, etc. and only says so
  in its own stdout. Read that line before setting `BASE_URL` — don't
  assume 5173.
- **Mock mode needs `.env.local`, which is gitignored.** A fresh clone has
  no mock flag set and `npm run dev` will try to reach a real backend at
  `VITE_BACKEND_URL` (unset → falls back to `window.location.origin`,
  which then 404s on every API call). Recreate `.env.local` after every
  fresh clone/checkout.
- **The mock product catalog uses public Unsplash stock-photo URLs as
  placeholder images**, and at least one of them (the first Cashews entry,
  `photo-1600189261867-...`) resolves to a photo of a book cover rather
  than a food product — a pre-existing mock-data quality issue, unrelated
  to the driver, worth flagging separately if you notice it while
  screenshotting the Shop page.
