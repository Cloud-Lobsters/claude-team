# Shared Claude Code Agents Repository Structure

## Overview

This document describes the complete structure for a shared Claude Code agents repository that can be used across all team projects and computers using Git submodules.

## Architecture

- **Shared Repository**: Contains team-wide patterns, agents, commands, and skills
- **Git Submodule**: Integrated into each project as `.claude-team/`
- **Multiple CLAUDE.md**: Team patterns in submodule, project-specific in project root
- **Commands**: Accessible from both team repository and project-specific directories

---

## Complete Folder Structure

### Main Project (ClarityCover Dashboard)

```
/Users/admin/Documents/claritycover/dashboard/
│
├── .gitmodules                                    # Git submodule configuration
│
├── .claude-team/                                  # 👈 GIT SUBMODULE (shared-claude-agents)
│   ├── .git                                       # Submodule git metadata
│   ├── README.md                                  # Team repository overview
│   ├── CLAUDE.md                                  # 👈 TEAM-WIDE PATTERNS
│   │   ## Universal Component Patterns
│   │   ### Modal Pattern (Centralized State)
│   │   ### Table Pattern (TanStack Table)
│   │   ### Form Pattern (Superforms)
│   │   ## Svelte 5 Best Practices
│   │   ## Code Style Guidelines
│   │   ## Common Development Commands
│   │
│   ├── .claude/
│   │   ├── agents/                                # Behavioral agents
│   │   │   ├── requirements-analyst.md
│   │   │   ├── mermaid-diagram-generator.md
│   │   │   ├── ux-ui-expert.md
│   │   │   ├── component-reviewer.md
│   │   │   ├── architecture-advisor.md
│   │   │   ├── api-implementer.md
│   │   │   └── database-schema-expert.md
│   │   │
│   │   ├── commands/                              # 👈 WORKFLOW SHORTCUTS
│   │   │   ├── create-modal.md
│   │   │   ├── create-table.md
│   │   │   ├── create-form.md
│   │   │   ├── scaffold-crud.md
│   │   │   ├── review-component.md
│   │   │   ├── add-route.md
│   │   │   ├── create-api-endpoint.md
│   │   │   ├── generate-types.md
│   │   │   └── fix-imports.md
│   │   │
│   │   └── skills/                                # Tool integrations
│   │       ├── SVELTE.md
│   │       ├── PRISMA.md
│   │       ├── TAILWIND.md
│   │       ├── SUPERFORMS.md
│   │       └── TANSTACK.md
│   │
│   ├── templates/                                 # Code templates
│   │   ├── modal-component.svelte
│   │   ├── table-component.svelte
│   │   ├── form-component.svelte
│   │   ├── api-route.ts
│   │   └── page-layout.svelte
│   │
│   ├── docs/
│   │   ├── setup-instructions.md
│   │   ├── agent-catalog.md
│   │   ├── command-reference.md
│   │   ├── updating-submodule.md
│   │   └── contributing.md
│   │
│   └── scripts/
│       ├── install.sh                             # Setup script
│       ├── update.sh                              # Update submodule
│       └── validate-agents.js                     # Validation
│
├── .claude/                                       # 👈 PROJECT-SPECIFIC (optional)
│   ├── agents/                                    # ClarityCover-specific agents
│   │   └── insurance-workflow-expert.md
│   │
│   ├── commands/                                  # ClarityCover-specific commands
│   │   ├── init-claim.md
│   │   ├── generate-policy.md
│   │   └── send-approval-email.md
│   │
│   └── settings.local.json                        # Permission rules
│
├── CLAUDE.md                                      # 👈 PROJECT-SPECIFIC INSTRUCTIONS
│   # ClarityCover Dashboard
│
│   > **Team Standards**: Universal patterns in `.claude-team/CLAUDE.md`
│
│   ## Project Overview
│   ## Architecture
│   ## Database Schema
│   ## Routes Structure
│   ## Business Logic
│   ## Development Commands
│   ## Environment Setup
│
├── src/
│   └── routes/
│       └── dashboard/
│           ├── claims/
│           ├── policies/
│           └── retailers/
│
├── shared-prisma/
├── package.json
└── [rest of project files]
```

### Shared Repository (GitHub)

```
https://github.com/your-org/shared-claude-agents/

shared-claude-agents/                              # Repository root
│
├── README.md                                      # Overview and setup
├── CHANGELOG.md                                   # Version history
├── LICENSE
│
├── CLAUDE.md                                      # 👈 TEAM-WIDE PATTERNS
│
├── .claude/
│   ├── agents/                                    # 👈 BEHAVIORAL AGENTS
│   ├── commands/                                  # 👈 WORKFLOW SHORTCUTS
│   └── skills/                                    # 👈 TOOL INTEGRATIONS
│
├── templates/                                     # Code templates
├── docs/                                          # Documentation
└── scripts/                                       # Automation scripts
```

---

## File Contents Examples

### Team CLAUDE.md

**Location:** `.claude-team/CLAUDE.md`

```markdown
# Team-Wide Claude Code Standards

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
  },
  approvalEmail: {
    visible: false,
    claim: null
  }
});
```

**Usage:**
```typescript
// Open modal from anywhere
import { modals } from './modal-state.svelte';

modals.timeline = {
  visible: true,
  claimId: 123
};
```

**Modal Component:**
```svelte
<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { modals } from './modal-state.svelte';

  let open = $derived(modals.timeline.visible);
  let claimId = $derived(modals.timeline.claimId);
</script>

<Dialog.Root bind:open={modals.timeline.visible}>
  <Dialog.Content>
    <!-- Modal content -->
  </Dialog.Content>
</Dialog.Root>
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
- Hierarchical data uses parent_id references

**Structure:**
```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  const data = await db.items.findMany();
  return { items: data };
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createSvelteTable } from '@tanstack/svelte-table';

  let { data } = $props();

  const table = createSvelteTable({
    data: data.items,
    columns: columnDefs,
    // ... table config
  });
</script>
```

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

**Structure:**
```typescript
// +page.server.ts
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);
    if (!form.valid) return { form };

    // Process form...
    return { form };
  }
};
```

```svelte
<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';

  let { data } = $props();
  const { form, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance>
  <input name="name" bind:value={$form.name} />
  <input name="email" bind:value={$form.email} />
  <button type="submit">Submit</button>
</form>
```

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
```

---

### Example Agent File

**Location:** `.claude-team/.claude/agents/component-reviewer.md`

```markdown
# Component Reviewer Agent

You are an expert Svelte 5 component reviewer specializing in validating components against team patterns and best practices.

## Role

Review Svelte components to ensure they follow:
- Team patterns documented in CLAUDE.md
- Svelte 5 best practices
- Code style guidelines
- Accessibility standards

## Responsibilities

1. **Pattern Validation**
   - Modal pattern compliance (centralized state)
   - Table pattern compliance (TanStack Table)
   - Form pattern compliance (Superforms)

2. **Svelte 5 Best Practices**
   - Runes usage ($state, $derived, $effect, $props)
   - No Svelte 4 syntax (export let)
   - Correct {@const} placement
   - Native Svelte animations

3. **Code Quality**
   - TypeScript types and interfaces
   - Import organization
   - Component structure
   - Error handling

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

## Review Process

When reviewing a component:

1. **Read Team Patterns**
   - Check CLAUDE.md for relevant patterns
   - Understand expected structure

2. **Analyze Component**
   - Identify component type (modal, table, form, other)
   - Check pattern compliance
   - Validate Svelte 5 syntax

3. **Provide Feedback**
   - List compliance issues
   - Reference CLAUDE.md sections
   - Suggest specific improvements
   - Provide code examples

4. **Rate Severity**
   - 🔴 Critical: Breaks functionality or pattern
   - 🟡 Warning: Doesn't follow best practice
   - 🔵 Info: Suggestion for improvement

## Output Format

```markdown
## Component Review: [ComponentName]

### Pattern Compliance
- [x] Follows [PatternName] pattern
- [ ] Issues found (see below)

### Issues Found

#### 🔴 Critical Issues
1. [Issue description]
   - Location: [file:line]
   - Expected: [what should be]
   - Fix: [how to fix]
   - Reference: CLAUDE.md > [section]

#### 🟡 Warnings
[...]

#### 🔵 Suggestions
[...]

### Summary
[Overall assessment and recommendations]
```

## Example Usage

User: Review this modal component for pattern compliance