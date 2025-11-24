# Cloud Lobsters - Team-Wide Claude Code Standards

This repository contains shared Claude Code patterns, commands, and documentation for the Cloud Lobsters team.

---

## Available Commands

Workflow shortcuts available via `/` prefix in Claude Code:

- **`/create-modal`** - Create modal component with centralized state pattern
  - See: [`commands/create-modal.md`](commands/create-modal.md)

- **`/create-table`** - Create table component with TanStack Table Core
  - See: [`commands/create-table.md`](commands/create-table.md)

- **`/create-form`** - Create form component with Superforms validation
  - See: [`commands/create-form.md`](commands/create-form.md)

- **`/review-component`** - Review component against team patterns
  - See: [`commands/review-component.md`](commands/review-component.md)

- **`/review-structure`** - Audit project folder structure against team standards
  - See: [`commands/review-structure.md`](commands/review-structure.md)

---

## Component Patterns

### Modal Pattern (Centralized State)

Use centralized modal state management to avoid prop drilling.

**Key Principles:**
- Store modal state in `modal-state.svelte.ts` using `$state()`
- Modal components use `$derived()` to extract state
- Open modals from anywhere by updating modal state
- Clean up state when modals close

**Full Implementation Guide:** Use `/create-modal` command

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

**Full Implementation Guide:** Use `/create-table` command

**Reference Documentation:** [`docs/reference/tanstack-tables/`](docs/reference/tanstack-tables/)

---

### Form Pattern (Superforms)

Use SvelteKit Superforms for type-safe form handling with validation.

**Key Principles:**
- Define Zod schema for validation
- Server action handles submission
- Client uses `superForm()` for reactivity
- Type-safe throughout

**Full Implementation Guide:** Use `/create-form` command

**Reference Documentation:** [`docs/reference/superform/`](docs/reference/superform/)

---

## Svelte 5 Best Practices

### Runes (Always Use)
- ✅ `$state()` for reactive state
- ✅ `$derived()` for computed values - **IMPORTANT**: When using `$derived`, the value must be accessed as a function: `const value = $derived(otherValue); console.log(value())`
- ✅ `$effect()` for side effects
- ✅ `$props()` for component props
- ❌ NEVER use `export let` (Svelte 4 syntax)

**Reference Documentation:** [`docs/reference/svelte-5/migration-guide.md`](docs/reference/svelte-5/migration-guide.md)

### {@const} Placement Rules
`{@const}` must be the **immediate child** of control flow blocks:
- `{#snippet}`, `{#if}`, `{#each}`, `<svelte:fragment>`, `<Component>`

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

**Component Library:** [`docs/reference/shadcn-svelte/`](docs/reference/shadcn-svelte/)

### TypeScript
- Always use TypeScript for new code
- Define interfaces for component props
- Type database queries properly

---

## Architecture Patterns

### Folder Structure
All projects must follow the standard folder structure defined in [`docs/standards/folder-structure.md`](docs/standards/folder-structure.md).

**Key Requirements:**
- Feature routes must have `components/` folder
- Modals use centralized state in `components/modals/modal-state.svelte.ts`
- Use standard folder names: `components/`, `stores/`, `utils/`, `api/`
- Use `kebab-case` for all file names

**Enforcement**: Use `/review-structure` command to audit projects

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

## Reference Documentation

### Framework Documentation
Located in [`docs/reference/`](docs/reference/):

- **Svelte 5** - [`docs/reference/svelte-5/migration-guide.md`](docs/reference/svelte-5/migration-guide.md)
- **Svelte MCP Server** - [`docs/reference/svelte-mcp-server.md`](docs/reference/svelte-mcp-server.md) (How to use MCP tools)
- **TanStack Table Implementation** - [`docs/reference/tanstack-table-implementation.md`](docs/reference/tanstack-table-implementation.md) (Complete implementation guide)
- **shadcn-svelte** - [`docs/reference/shadcn-svelte/`](docs/reference/shadcn-svelte/) (54 component docs)
- **Superforms** - [`docs/reference/superform/`](docs/reference/superform/) (17 guides)
- **TanStack Tables** - [`docs/reference/tanstack-tables/`](docs/reference/tanstack-tables/) (70 API docs)

### Standards Documentation
Located in [`docs/standards/`](docs/standards/):

- **Folder Structure** - [`docs/standards/folder-structure.md`](docs/standards/folder-structure.md) (Project structure standards)
- **Implementation Rules** - [`docs/standards/implementation-rules.md`](docs/standards/implementation-rules.md) (Critical verification rules)

### Agents
Located in [`agents/`](agents/):
- _Empty - agents can be added here as team needs them_

### Skills
Located in [`skills/`](skills/):
- _Empty - tool integration guides can be added here_

### Templates
Located in [`templates/`](templates/):
- _Empty - code templates can be added here_

---

## Common Development Commands

```bash
pnpm dev              # Start development server
pnpm check            # Run Svelte type checking
pnpm build            # Build for production
pnpm format           # Format code with Prettier
pnpm lint             # Check code formatting
```

---

## Using This Repository

### As a Git Submodule
This repository is designed to be used as a Git submodule named `.claude`:

```bash
# Add to your project
git submodule add https://github.com/Cloud-Lobsters/.claude.git .claude

# Update to latest
cd .claude && git pull origin main && cd ..
git add .claude && git commit -m "chore: update shared Claude standards"
```

### Commands
All commands in `commands/` are automatically available in Claude Code when this is your `.claude` submodule.

### Documentation
All reference documentation in `docs/reference/` is available for lookup when needed.

---

## Repository Structure

```
.claude/
├── CLAUDE.md              # This file - overview and patterns
├── commands/              # Workflow commands (accessible via /)
├── agents/                # Behavioral agents
├── skills/                # Tool integration guides
├── docs/reference/        # Framework documentation (142 files)
├── templates/             # Code templates
└── scripts/               # Helper scripts
```
