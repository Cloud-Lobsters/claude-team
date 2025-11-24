# Cloud Lobsters - Team-Wide Claude Code Standards

## Table of Contents
- [Component Patterns](#component-patterns)
- [Svelte 5 Best Practices](#svelte-5-best-practices)
- [Code Style Guidelines](#code-style-guidelines)
- [Architecture Patterns](#architecture-patterns)

---

## Component Patterns

### Modal Pattern (Centralized State)

Use centralized modal state management to avoid prop drilling.

**Key Principles:**
- Store modal state in `modal-state.svelte.ts` using `$state()`
- Modal components use `$derived()` to extract state
- Open modals from anywhere by updating modal state
- Clean up state when modals close

**Structure:**
```typescript
// modal-state.svelte.ts
export const modals = $state({
  timeline: {
    visible: false,
    claimId: null
  }
});
```

**Usage:**
```typescript
// Open modal from anywhere
import { modals } from './modal-state.svelte';

modals.timeline = { visible: true, claimId: 123 };
```

**Anti-Patterns:**
- ❌ Don't use `$bindable()` props
- ❌ Don't pass open state through props
- ❌ Don't mutate nested properties separately

---

### Table Pattern (TanStack Table)

Use TanStack Table Core for client-side filtering and sorting.

**Key Principles:**
- Server loads data in `+page.server.ts`
- Client handles filtering/sorting with TanStack Table
- Use `TableFilterManager` for centralized filter logic

**Best Practices:**
- Client-side filtering for < 10k rows
- Server-side pagination for > 10k rows
- Use global search + column filters
- Implement clear filters button

---

### Form Pattern (Superforms)

Use SvelteKit Superforms for type-safe form handling with validation.

**Key Principles:**
- Define Zod schema for validation
- Server action handles submission
- Client uses `superForm()` for reactivity
- Type-safe throughout

---

## Svelte 5 Best Practices

### Runes (Always Use)
- ✅ `$state()` for reactive state
- ✅ `$derived()` for computed values
- ✅ `$effect()` for side effects
- ✅ `$props()` for component props
- ❌ NEVER use `export let` (Svelte 4 syntax)

### {@const} Placement Rules
`{@const}` must be the **immediate child** of:
- `{#snippet}` blocks
- `{#if}`, `{:else if}`, `{:else}` blocks
- `{#each}`, `{:then}`, `{:catch}` blocks
- `<svelte:fragment>`
- `<svelte:boundary>`
- `<Component>` (custom components)

**Correct:**
```svelte
{#each items as item}
  {@const isSelected = checkSelection(item.value)}
  <div>{isSelected}</div>
{/each}
```

**Incorrect:**
```svelte
<div>
  {@const value = something}  <!-- ❌ Error: inside <div> -->
  <span>{value}</span>
</div>
```

### Animations
- Always use **Svelte native animations** (not CSS animations)
- Use `transition:` directives
- Use `animate:` for list reordering

---

## Code Style Guidelines

### File Naming
- Use `snake_case` for all code files
- Components: `my-component.svelte`
- Routes: `+page.svelte`, `+page.server.ts`, `+layout.svelte`

### Styling
- **Tailwind-first** approach
- Custom CSS only when necessary
- Use `cn()` helper for conditional classes

### TypeScript
- Always use TypeScript for new code
- Define interfaces for component props
- Type database queries properly

---

## Architecture Patterns

### SvelteKit Routing
- Use `+page.svelte` for pages
- Use `+page.server.ts` for server-side data loading
- Use `+layout.svelte` for shared layouts
- Use `+server.ts` for API endpoints

### Data Loading
- Server loads data, client displays
- Use form actions for mutations
- Handle errors gracefully

### State Management
- Component state: `$state()`
- Shared state: Svelte stores or context
- Modal state: Centralized state pattern
- Form state: Superforms

---

## Common Development Commands

```bash
pnpm dev              # Start development server
pnpm check            # Run Svelte type checking
pnpm build            # Build for production
pnpm format           # Format code with Prettier
pnpm lint             # Check code formatting
```
