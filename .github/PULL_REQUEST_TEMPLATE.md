# Summary

## What changed?

## Why?

## Screenshots / Visual QA

- Desktop checked:
- Mobile checked:
- Loading / empty / error states checked:
- Roles affected (Admin / Customer):

## Verification

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test:run`
- [ ] `npm run build`
- [ ] Checked in mock mode (`VITE_ENABLE_MOCK=true`)
- [ ] No credentials or secrets committed

## Architecture checklist

- [ ] Shared code does not import `@/features/*`
- [ ] Pages and components go through hooks, not `*.service` files
- [ ] All HTTP goes through `@/services/api`; all storage through `@/services/storage`
- [ ] Route paths and permission strings come from `@/constants`
- [ ] Colours, type, spacing and radii come from `@/theme` (no raw hex)

## Notes

- Known follow-ups:
