# Cloud Lobsters - Team-Wide Claude Code Standards

This repository contains shared Claude Code patterns, commands, and documentation for the Cloud Lobsters team.

---

## Available Commands

Workflow shortcuts available via `/` prefix in Claude Code:

- **`/cmd-create-modal`** - Create modal component with centralized state pattern
  - See: [`commands/cmd-create-modal.md`](commands/cmd-create-modal.md)

- **`/cmd-create-table`** - Create table component with TanStack Table Core
  - See: [`commands/cmd-create-table.md`](commands/cmd-create-table.md)

- **`/cmd-create-form`** - Create form component with Superforms validation
  - See: [`commands/cmd-create-form.md`](commands/cmd-create-form.md)

- **`/cmd-review-component`** - Review component against team patterns
  - See: [`commands/cmd-review-component.md`](commands/cmd-review-component.md)

- **`/cmd-review-structure`** - Audit project folder structure against team standards
  - See: [`commands/cmd-review-structure.md`](commands/cmd-review-structure.md)

- **`/cmd-create-sheets-rating`** - Wire up Google Sheets-based rating engine
  - See: [`commands/cmd-create-sheets-rating.md`](commands/cmd-create-sheets-rating.md)

---

## Component Patterns

### Modal Pattern (Centralized State)

Use centralized modal state management to avoid prop drilling.

**Key Principles:**
- Store modal state in `modal-state.svelte.ts` using `$state()`
- Modal components use `$derived()` to extract state
- Open modals from anywhere by updating modal state
- Clean up state when modals close

**Full Implementation Guide:** Use `/cmd-create-modal` command

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

**Full Implementation Guide:** Use `/cmd-create-table` command

**Reference Documentation:** [`docs/reference/tanstack-tables/`](docs/reference/tanstack-tables/)

---

### Form Pattern (Superforms)

Use SvelteKit Superforms for type-safe form handling with validation.

**Key Principles:**
- Define Zod schema for validation
- Server action handles submission
- Client uses `superForm()` for reactivity
- Type-safe throughout

**Full Implementation Guide:** Use `/cmd-create-form` command

**Reference Documentation:** [`docs/reference/superform/`](docs/reference/superform/)

---

### Sheets Rating Pattern (Google Sheets API)

Use Google Sheets as a rating engine for complex insurance calculations that business users need to modify.

**Key Principles:**
- Google Sheet contains calculation formulas
- Yellow cells = inputs (written by code)
- "fieldName" column maps cells to form fields
- Screenshot must show URL (with spreadsheet ID) and sheet tab name
- Server writes inputs, reads calculated outputs
- Business users update formulas without code changes

**Setup Process:**
1. Decide: Reuse existing service account or create new one?
   - **Reuse:** Same app, same environment → faster setup
   - **Create new:** Different environment/security domain → better isolation
2. Take screenshots of sheet showing:
   - **Input screenshot:** URL bar, sheet tab, yellow cells, fieldName column
   - **Output screenshot:** Calculated cells with formulas and descriptions
   - (Can be one combined screenshot if everything fits)
3. Use `/cmd-create-sheets-rating` command
4. Command validates screenshots and extracts configuration
5. Claude generates all files with spreadsheet ID, sheet name, and cell mappings
6. Configure service account (reuse or create) and share spreadsheet
7. Deploy and test

**Full Implementation Guide:** Use `/cmd-create-sheets-rating` command

**Reference Documentation:** [`docs/reference/google-sheets-rating/`](docs/reference/google-sheets-rating/)

**Example Implementation:** See `/faces` route

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

**Enforcement**: Use `/cmd-review-structure` command to audit projects

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
- **Mermaid.js** - [`docs/reference/mermaid_js/`](docs/reference/mermaid_js/) (Diagram syntax and configuration)

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

- **Support Modal** - [`templates/support-modal/`](templates/support-modal/) (Slack-integrated user support system)

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

#### Initial Setup (First Time)

```bash
# 1. Navigate to your project root
cd /path/to/your/project

# 2. Add the submodule
git submodule add https://github.com/Cloud-Lobsters/.claude.git .claude

# 3. Commit the submodule
git add .gitmodules .claude
git commit -m "feat: add .claude team standards submodule"

# 4. (Optional) Add sync scripts to package.json
# Add these to your package.json scripts:
{
  "scripts": {
    "claude:pull": "bash .claude/scripts/pull.sh",
    "claude:push": "bash .claude/scripts/push.sh"
  }
}
```

#### Cloning a Project with the Submodule

When cloning a project that already has this submodule:

```bash
# Option 1: Clone with submodules
git clone --recurse-submodules <repository-url>

# Option 2: Clone first, then init submodules
git clone <repository-url>
cd <repository>
git submodule update --init --recursive
```

#### Updating to Latest Standards

```bash
# Pull latest team standards
pnpm claude:pull
# OR manually:
cd .claude && git pull origin main && cd ..
git add .claude && git commit -m "chore: update .claude submodule"
```

#### Contributing Changes Back to Team Standards

```bash
# After editing files in .claude/
pnpm claude:push "feat: add new pattern"
# OR manually:
cd .claude
git add -A
git commit -m "feat: add new pattern"
git push origin main
cd ..
git add .claude
git commit -m "chore: update .claude submodule"
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
