# Review Component

Review a Svelte component against team patterns and best practices using the component-reviewer agent.

## Instructions

Ask the user for:
1. **Component file path** or **component code** to review
2. **Component type** (modal, table, form, or general component)

Then perform the review following this process:

---

## Step 1: Read Component Code

If user provides a file path, read the component:
```
Read the file at the provided path
```

If user provides code directly, analyze it.

---

## Step 2: Identify Component Type

Determine what type of component this is:
- **Modal** - Uses Dialog component, manages visible state
- **Table** - Uses TanStack Table, displays data in rows/columns
- **Form** - Uses Superforms, handles user input and validation
- **General** - Other Svelte components

---

## Step 3: Check Pattern Compliance

Based on component type, check against team patterns:

### For Modal Components

Check `.claude-team/CLAUDE.md` > Modal Management Pattern:

✅ **Should have:**
- Derives state from centralized `modal-state.svelte.ts`
- Uses `$derived()` to extract values
- Binds to `modals.{name}.visible`
- Uses `$effect()` for side effects
- Cleans up state on close

❌ **Should NOT have:**
- `$bindable()` props for open state
- Props passed from parent for modal state
- Nested property mutations

### For Table Components

Check `.claude-team/CLAUDE.md` > Table Pattern:

✅ **Should have:**
- TanStack Table Core setup
- Column definitions with proper types
- Filter manager (if filters present)
- Sorting handlers
- Pagination (if needed)
- Loading/empty states

❌ **Should NOT have:**
- Client-side loading of > 10k rows
- Missing error handling
- No empty state handling

### For Form Components

Check `.claude-team/CLAUDE.md` > Form Pattern:

✅ **Should have:**
- Zod schema validation
- `superForm()` setup
- Server action integration
- Error display
- Loading states
- Success feedback

❌ **Should NOT have:**
- Client-only validation
- Missing error handling
- No loading indicators

---

## Step 4: Check Svelte 5 Best Practices

Verify the component follows Svelte 5 patterns:

### Runes Usage
✅ **Should use:**
- `$state()` for reactive state
- `$derived()` for computed values
- `$effect()` for side effects
- `$props()` for component props

❌ **Should NOT use:**
- `export let` (Svelte 4 syntax)
- Reactive declarations `$:`

### {@const} Placement
✅ **Correct placement:**
- Inside `{#each}`, `{#if}`, `{#snippet}` blocks
- As immediate child of control flow

❌ **Incorrect:**
- Inside regular HTML elements like `<div>`

### Animations
✅ **Should use:**
- Svelte native animations (`transition:`, `animate:`)

❌ **Avoid:**
- CSS-based animations for state transitions

---

## Step 5: Check Code Style

Verify code style guidelines from `.claude-team/CLAUDE.md`:

### File Naming
- ✅ Uses `snake_case` for files
- ✅ Proper SvelteKit conventions (`+page.svelte`, `+page.server.ts`)

### Styling
- ✅ Tailwind-first approach
- ✅ Uses `cn()` helper for conditional classes
- ❌ Excessive custom CSS

### TypeScript
- ✅ Proper type annotations
- ✅ Interface definitions for props
- ❌ Use of `any` type

---

## Step 6: Check Accessibility

Review accessibility:

- ✅ Semantic HTML elements
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus management
- ❌ Missing labels on form inputs
- ❌ No keyboard shortcuts for modals

---

## Step 7: Provide Review Report

Generate a comprehensive review report:

```markdown
## Component Review: [ComponentName]

### Component Type
[Modal/Table/Form/General]

### Pattern Compliance
- [x] Follows [PatternName] pattern
- [ ] Issues found (see below)

### Issues Found

#### 🔴 Critical Issues
[Issues that break functionality or violate core patterns]

1. **[Issue Title]**
   - **Location:** [file:line]
   - **Problem:** [What's wrong]
   - **Expected:** [What should be]
   - **Fix:** [How to fix it]
   - **Reference:** `.claude-team/CLAUDE.md` > [section]

#### 🟡 Warnings
[Issues that don't follow best practices]

1. **[Warning Title]**
   - **Location:** [file:line]
   - **Problem:** [What could be better]
   - **Suggestion:** [How to improve]
   - **Reference:** `.claude-team/CLAUDE.md` > [section]

#### 🔵 Suggestions
[Nice-to-have improvements]

1. **[Suggestion Title]**
   - **Current:** [How it is now]
   - **Suggested:** [How it could be]
   - **Benefit:** [Why this is better]

### Positive Findings

✅ **Good practices observed:**
- [List things done well]
- [Patterns followed correctly]
- [Clean code examples]

### Summary

[Overall assessment with a rating: Excellent/Good/Needs Improvement/Major Issues]

**Recommended Actions:**
1. [Priority fixes]
2. [Important improvements]
3. [Optional enhancements]
```

---

## Example Review Output

```markdown
## Component Review: TimelineModal.svelte

### Component Type
Modal

### Pattern Compliance
- [x] Follows Modal Pattern (Centralized State)
- [ ] Minor issues found

### Issues Found

#### 🟡 Warnings

1. **Missing cleanup delay for animations**
   - **Location:** timeline-modal.svelte:45
   - **Problem:** State is reset immediately on close without waiting for animation
   - **Suggestion:** Add 300ms delay in cleanup `$effect`
   - **Reference:** `.claude-team/CLAUDE.md` > Modal Pattern > Cleanup

```typescript
// Current
$effect(() => {
	if (!open) {
		timelineEvents = [];
	}
});

// Suggested
$effect(() => {
	if (!open) {
		setTimeout(() => {
			timelineEvents = [];
		}, 300);
	}
});
```

#### 🔵 Suggestions

1. **Add loading skeleton**
   - **Current:** Shows "Loading..." text
   - **Suggested:** Use skeleton component for better UX
   - **Benefit:** Improved perceived performance

### Positive Findings

✅ **Good practices observed:**
- Correctly uses `$derived()` to extract modal state
- Proper binding to `modals.timeline.visible`
- Uses `$effect()` for data fetching
- TypeScript types are well-defined
- Error handling is present

### Summary

**Rating: Good**

This modal component follows the team's centralized state pattern correctly. The implementation is clean and type-safe. Only minor improvements suggested for animation cleanup and loading states.

**Recommended Actions:**
1. Add animation delay to cleanup effect (5 min)
2. Consider adding loading skeleton (10 min)
```

---

## Severity Guidelines

### 🔴 Critical Issues
- Breaks core pattern (modal prop drilling, wrong runes)
- Security vulnerabilities
- Accessibility blockers
- Type safety violations
- Non-functional code

### 🟡 Warnings
- Doesn't follow best practice
- Missing error handling
- Performance concerns
- Inconsistent styling
- Minor accessibility issues

### 🔵 Suggestions
- Code organization improvements
- Enhanced user experience
- Optional optimizations
- Nice-to-have features

---

## Pattern References

- Modal Pattern: `.claude-team/CLAUDE.md` > Modal Management Pattern
- Table Pattern: `.claude-team/CLAUDE.md` > Table Pattern (TanStack Table)
- Form Pattern: `.claude-team/CLAUDE.md` > Form Pattern (Superforms)
- Svelte 5: `.claude-team/CLAUDE.md` > Svelte 5 Best Practices
- Code Style: `.claude-team/CLAUDE.md` > Code Style Guidelines

---

## Summary

This command provides comprehensive component reviews by:
1. ✅ Identifying component type
2. ✅ Checking pattern compliance
3. ✅ Validating Svelte 5 best practices
4. ✅ Verifying code style
5. ✅ Reviewing accessibility
6. ✅ Providing actionable feedback with examples
7. ✅ Referencing team documentation
