Written for: anyone (human or AI agent) about to write code in this repo.

# .claude

Single source of truth for how this codebase is built. Read before writing code.
When in doubt, follow these docs over patterns found in older code — legacy code
is migrated incrementally; new code always follows the current rules.

| File | What it covers |
| --- | --- |
| [architecture.md](architecture.md) | Folder structure, dependency direction, feature module shape, routing, state ownership, how to add a feature |
| `settings.json` | Shared permission allowlist for routine commands (tests, linters). Never store secrets here. |
| `settings.local.json` | Per-developer overrides. Gitignored. |

The root [CLAUDE.md](../CLAUDE.md) is always loaded and summarizes these.

## Reference feature

`src/features/products/` is the copy-me implementation. It demonstrates the
full stack: constants → types → service → hooks → pages → routes → public API,
covering both the admin CRUD side and the public storefront browsing side of
the same domain.

## Quality gates

Commits and pushes are gated by Lefthook:

- **pre-commit** — Biome on staged files, architecture checker on staged files
- **commit-msg** — Conventional Commits
- **pre-push** — typecheck, Vitest, Vite production build

Run everything locally with `npm run quality:check`.
