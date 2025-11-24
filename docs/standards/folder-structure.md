# Standard Folder Structure - Cloud Lobsters SvelteKit Projects

This document defines the standard folder structure for all Cloud Lobsters SvelteKit projects.

---

## Project Root Structure

```
project-root/
├── src/
│   ├── lib/
│   └── routes/
├── shared-prisma/         # (Optional) If using shared Prisma schema
├── static/
├── .claude/               # Git submodule for team standards
├── package.json
├── svelte.config.js
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## src/lib/ Structure (Shared Library Code)

```
src/lib/
├── components/            # Reusable UI components
│   ├── ui/               # shadcn-svelte components
│   ├── [feature]/        # Feature-specific components
│   └── [component-name].svelte
│
├── stores/               # Svelte stores for global state
│   └── [store-name].svelte.ts
│
├── utils/                # Utility functions and helpers
│   └── [utility-name].ts
│
├── auth/                 # Authentication utilities and middleware
│   ├── jwt.ts
│   └── middleware.ts
│
├── types/                # TypeScript type definitions
│   └── [type-name].ts
│
├── services/             # Business logic and API services
│   └── [service-name].ts
│
├── controllers/          # Request handlers and business logic
│   └── [controller-name].ts
│
├── tables/               # Table-specific utilities
│   └── generic/
│
├── options/              # Configuration options and constants
│   ├── core/
│   ├── status/
│   ├── filters/
│   └── configuration/
│
└── templates/            # Email/document templates
```

### Component Naming Convention
- Use `kebab-case` for component filenames: `user-profile.svelte`
- Store Svelte 5 reactive files with `.svelte.ts` extension

---

## src/routes/ Structure (SvelteKit Routes)

### Root Level Routes
```
src/routes/
├── +layout.svelte        # Root layout
├── +layout.server.ts     # Root layout server logic
├── +page.svelte          # Homepage
├── +error.svelte         # Error page
│
├── auth/                 # Authentication routes
│   ├── +page.svelte
│   ├── +page.server.ts
│   └── reset-password/
│
└── dashboard/            # Main application routes
    ├── +layout.svelte
    ├── +layout.server.ts
    └── [feature]/        # Feature-specific routes
```

---

## Feature Route Structure (MANDATORY PATTERN)

Each feature under `src/routes/dashboard/[feature]/` MUST follow this structure:

```
src/routes/dashboard/[feature]/
├── +page.svelte              # Main page component
├── +page.server.ts           # Server-side data loading
├── +layout.svelte            # (Optional) Feature layout
├── +layout.server.ts         # (Optional) Feature layout server
│
├── [id]/                     # (Optional) Dynamic route
│   ├── +page.svelte
│   └── +page.server.ts
│
├── components/               # ✅ REQUIRED: Feature-specific components
│   ├── [ComponentName].svelte
│   ├── [feature-type]/      # Group related components
│   │   └── [Component].svelte
│   │
│   └── modals/              # ✅ REQUIRED if feature has modals
│       ├── modal-state.svelte.ts    # Centralized modal state
│       ├── [ModalName].svelte       # Individual modals
│       ├── index.ts                 # Modal exports
│       └── schema.ts                # (Optional) Zod schemas
│
├── stores/                   # (Optional) Feature-specific stores
│   └── [store-name].svelte.ts
│
├── utils/                    # (Optional) Feature-specific utilities
│   └── [utility-name].ts
│
├── api/                      # (Optional) API endpoints
│   └── +server.ts
│
└── (data)/                   # (Optional) Private folder for data helpers
    └── [helper].ts
```

---

## Modal Pattern (MANDATORY)

When a feature has modals, use the **centralized modal state pattern**:

```
components/modals/
├── modal-state.svelte.ts     # ✅ REQUIRED: Central state management
├── [ModalName].svelte        # Individual modal components
├── index.ts                  # Export all modals
└── schema.ts                 # (Optional) Zod schemas for forms
```

### modal-state.svelte.ts Structure
```typescript
// Example structure
export const modals = $state({
  modalName: {
    visible: false,
    data: null
  }
});
```

**Reference**: See [`.claude/commands/create-modal.md`](../../commands/create-modal.md) for full implementation guide.

---

## Table Pattern

When a feature has tables with filtering:

```
[feature]/
├── components/
│   ├── [FeatureTable].svelte          # Main table component
│   ├── [FeatureTableTitle].svelte     # Table title/actions
│   └── [feature-cells]/               # Table cell components
│       └── [CellName].svelte
│
├── stores/
│   └── filter-state.svelte.ts         # Table filter state
│
└── utils/
    └── filter-manager.ts               # TableFilterManager instance
```

**Reference**: See [`.claude/commands/create-table.md`](../../commands/create-table.md) for full implementation guide.

---

## File Naming Conventions

### Components
- **Svelte components**: `kebab-case.svelte` (e.g., `user-profile.svelte`)
- **Svelte reactive files**: `kebab-case.svelte.ts` (e.g., `modal-state.svelte.ts`)
- **TypeScript files**: `kebab-case.ts` (e.g., `api-helper.ts`)

### Routes
- **Pages**: `+page.svelte`, `+page.server.ts`
- **Layouts**: `+layout.svelte`, `+layout.server.ts`
- **Server endpoints**: `+server.ts`
- **Error pages**: `+error.svelte`

### Special Folders
- **Private folders**: `(folder-name)/` - Not part of URL path
- **Dynamic routes**: `[param]/` - Dynamic URL segment
- **Optional params**: `[[optional]]/` - Optional URL segment

---

## Anti-Patterns (DO NOT DO)

❌ **Don't create components directly in route folders**
```
src/routes/dashboard/claims/
├── ClaimCard.svelte          # ❌ Wrong! Should be in components/
└── +page.svelte
```

✅ **Correct**: Always use `components/` folder
```
src/routes/dashboard/claims/
├── components/
│   └── ClaimCard.svelte      # ✅ Correct
└── +page.svelte
```

---

❌ **Don't pass modal state through props**
```typescript
// ❌ Wrong!
let modalOpen = $state(false);
<Modal bind:open={modalOpen} />
```

✅ **Correct**: Use centralized modal state
```typescript
// ✅ Correct
import { modals } from './components/modals/modal-state.svelte';
modals.modalName.visible = true;
```

---

❌ **Don't create random folder structures**
```
src/routes/dashboard/feature/
├── stuff/                    # ❌ What is "stuff"?
├── things/                   # ❌ What is "things"?
└── misc/                     # ❌ What is "misc"?
```

✅ **Correct**: Use standard folder names
```
src/routes/dashboard/feature/
├── components/               # ✅ Clear purpose
├── stores/                   # ✅ Clear purpose
└── utils/                    # ✅ Clear purpose
```

---

## Example: Complete Feature Structure

```
src/routes/dashboard/claims/
├── +page.svelte                          # Claims list page
├── +page.server.ts                       # Load claims data
│
├── [id]/                                 # Individual claim detail
│   ├── +page.svelte
│   └── +page.server.ts
│
├── components/                           # ✅ All components here
│   ├── ClaimsTable.svelte               # Main table
│   ├── TableTitle.svelte                # Table actions
│   │
│   ├── claims/                          # Grouped claim components
│   │   ├── ClaimCard.svelte
│   │   ├── ClaimStatus.svelte
│   │   └── ClaimTimeline.svelte
│   │
│   └── modals/                          # ✅ Centralized modals
│       ├── modal-state.svelte.ts        # Central state
│       ├── AddClaimModal.svelte
│       ├── EditClaimModal.svelte
│       ├── TimelineModal.svelte
│       ├── index.ts
│       └── schema.ts
│
├── stores/                              # Feature stores
│   └── filter-state.svelte.ts
│
├── utils/                               # Feature utilities
│   ├── filter-manager.ts
│   └── claim-helpers.ts
│
└── api/                                 # API endpoints
    └── +server.ts
```

---

## Shared Database (Optional)

If using a shared Prisma schema across projects:

```
shared-prisma/
├── prisma/
│   ├── schema/                # Domain-organized schemas
│   │   ├── user.prisma
│   │   ├── claim.prisma
│   │   └── policy.prisma
│   │
│   ├── migrations/            # Database migrations
│   └── seed/                  # Seed scripts
│
└── package.json
```

---

## Configuration Files

### Required Root Files
- `package.json` - Dependencies and scripts
- `svelte.config.js` - SvelteKit configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration
- `.gitignore` - Git ignore patterns
- `.prettierrc` - Prettier formatting rules
- `CLAUDE.md` - Project-specific Claude Code instructions

---

## Quick Reference Checklist

When creating a new feature under `src/routes/dashboard/[feature]/`:

- [ ] Create `components/` folder
- [ ] If has modals: Create `components/modals/` with `modal-state.svelte.ts`
- [ ] If has tables: Create filter state in `stores/`
- [ ] If has utilities: Create `utils/` folder
- [ ] Use `+page.svelte` for UI
- [ ] Use `+page.server.ts` for data loading
- [ ] Follow team modal pattern (no prop drilling)
- [ ] Follow team table pattern (TanStack Table)
- [ ] Use `kebab-case` for all files

---

## Related Documentation

- [Modal Pattern](../../commands/create-modal.md) - How to create modals
- [Table Pattern](../../commands/create-table.md) - How to create tables
- [Form Pattern](../../commands/create-form.md) - How to create forms
- [Team Standards](../../CLAUDE.md) - Overall team patterns and practices
