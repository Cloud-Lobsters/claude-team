---
argument-hint: [optional-feature-path]
---

# Review Project Structure

Audit the current project's folder structure against Cloud Lobsters team standards.

**Usage:**

- `/cmd-review-structure` - Review entire project structure
- `/cmd-review-structure src/routes/dashboard/claims` - Review specific feature

**Arguments:**

- `$1` (optional): Specific path to review (e.g., `src/routes/dashboard/claims`)
  - If not provided, reviews entire `src/routes/` directory

---

## Your Task

Review the project structure and identify any violations of the team's folder structure standards defined in [`docs/standards/folder-structure.md`](../docs/standards/folder-structure.md).

**Target Path:** \${1:-src/routes/dashboard}

---

## Step 1: Explore Project Structure

Use the `Glob` and `Bash` tools to explore the project:

```bash
# Check src/lib structure
find src/lib -type d -maxdepth 2

# Check src/routes structure
find src/routes -type d -maxdepth 3

# Check dashboard features
find src/routes/dashboard -type d -maxdepth 2
```

---

## Step 2: Check Each Dashboard Feature

For each feature under `src/routes/dashboard/[feature]/`, verify:

### ✅ Required Elements

1. **Has `components/` folder**

   ```bash
   ls -la src/routes/dashboard/[feature]/components/
   ```

2. **If has modals, check modal pattern:**

   ```bash
   ls -la src/routes/dashboard/[feature]/components/modals/
   # Should contain: modal-state.svelte.ts
   ```

3. **File naming conventions:**
   - Components use `kebab-case.svelte`
   - Reactive files use `.svelte.ts` extension
   - No `export let` (Svelte 4 pattern)

### ❌ Common Violations

1. **Components in route root** (should be in `components/`)

   ```bash
   # Check for .svelte files directly in feature root
   ls src/routes/dashboard/[feature]/*.svelte
   ```

2. **Modal prop drilling** (should use centralized state)

   - Check for `bind:open` in modal components
   - Check for `$bindable()` props in modals

3. **Non-standard folder names**
   - `stuff/`, `things/`, `misc/`, etc.
   - Should only use: `components/`, `stores/`, `utils/`, `api/`, `(data)/`

---

## Step 3: Generate Audit Report

Create a report with:

### Compliance Summary

```markdown
## Project Structure Audit

**Overall Status**: [Pass/Fail]

### Compliant Features ✅

- feature-name: All standards met

### Non-Compliant Features ❌

- feature-name: Missing components/ folder
- feature-name: Components in route root
- feature-name: Modal using prop drilling
```

### Detailed Findings

For each violation, provide:

1. **Location**: Exact file path
2. **Issue**: What standard is violated
3. **Fix**: How to resolve it
4. **Reference**: Link to relevant documentation

---

## Step 4: Prioritize Issues

Categorize violations by severity:

### 🔴 Critical Issues (Fix Immediately)

- Modal prop drilling (breaks team pattern)
- Components in wrong location (breaks structure)

### 🟡 Important Issues (Fix Soon)

- Non-standard folder names
- Missing centralized modal state

### 🟢 Minor Issues (Fix Eventually)

- File naming conventions
- Missing optional folders

---

## Example Audit Output

````markdown
# Project Structure Audit Report

**Project**: ClarityCover Dashboard **Date**: 2025-11-24 **Status**: ⚠️ Issues Found

---

## Summary

- ✅ Compliant Features: 8/12
- ❌ Non-Compliant Features: 4/12
- 🔴 Critical Issues: 2
- 🟡 Important Issues: 3
- 🟢 Minor Issues: 5

---

## Critical Issues 🔴

### 1. Modal Prop Drilling in Retailers Feature

**Location**: `src/routes/dashboard/retailers/+page.svelte`

**Issue**: Modal state passed through props instead of using centralized state pattern.

```svelte
<!-- ❌ Current (Wrong) -->
<script>
  let modalOpen = $state(false);
</script>
<EditModal bind:open={modalOpen} />
```
````

**Fix**: Use centralized modal state pattern.

1. Create `src/routes/dashboard/retailers/components/modals/modal-state.svelte.ts`:

   ```typescript
   export const modals = $state({
     edit: { visible: false, retailerId: null },
   });
   ```

2. Update modal component to use centralized state:
   ```svelte
   <script>
     import { modals } from './modal-state.svelte';
     let open = $derived(modals.edit.visible);
   </script>
   <Dialog.Root bind:open={modals.edit.visible}>
   ```

**Reference**: [`.claude/commands/cmd-create-modal.md`](../.claude/commands/cmd-create-modal.md)

---

### 2. Components in Route Root

**Location**: `src/routes/dashboard/users/UserCard.svelte`

**Issue**: Component file in route root instead of `components/` folder.

**Fix**: Move to proper location.

```bash
mkdir -p src/routes/dashboard/users/components
mv src/routes/dashboard/users/UserCard.svelte src/routes/dashboard/users/components/
```

Then update all imports:

```typescript
// Change from:
import UserCard from "./UserCard.svelte";
// To:
import UserCard from "./components/UserCard.svelte";
```

**Reference**: [`.claude/docs/standards/folder-structure.md`](../.claude/docs/standards/folder-structure.md#feature-route-structure-mandatory-pattern)

---

## Important Issues 🟡

### 3. Non-Standard Folder Name

**Location**: `src/routes/dashboard/claims/stuff/`

**Issue**: Folder named "stuff" - unclear purpose, not following standard naming.

**Fix**: Rename to standard folder name or move contents.

If it contains components:

```bash
mv src/routes/dashboard/claims/stuff/* src/routes/dashboard/claims/components/
rmdir src/routes/dashboard/claims/stuff
```

---

## Minor Issues 🟢

### 4. Missing modal-state.svelte.ts

**Location**: `src/routes/dashboard/policies/components/modals/`

**Issue**: Has modals but missing centralized `modal-state.svelte.ts` file.

**Fix**: Create modal state file following team pattern.

**Reference**: [`.claude/commands/cmd-create-modal.md`](../.claude/commands/cmd-create-modal.md)

---

## Compliant Features ✅

The following features fully comply with team standards:

1. ✅ `dashboard/claims/` - Proper structure, centralized modals
2. ✅ `dashboard/quotes/` - Proper structure
3. ✅ `dashboard/settings/` - Proper structure
4. ✅ `dashboard/email-log/` - Proper structure, centralized modals

---

## Recommendations

1. **Immediate Actions**:

   - Fix modal prop drilling in retailers (Critical)
   - Move UserCard.svelte to components/ (Critical)

2. **Short Term**:

   - Rename non-standard folders
   - Add missing modal-state files

3. **Long Term**:
   - Document any project-specific deviations in CLAUDE.md
   - Run this audit regularly (monthly)

---

## Next Steps

1. Create GitHub issues for critical violations
2. Assign team members to fix issues
3. Re-run audit after fixes
4. Update team documentation if needed

```

---

## Enforcement Guidelines

### When to Allow Deviations

- **Project-specific requirements** documented in project CLAUDE.md
- **Legacy code** being gradually migrated
- **Experimental features** clearly marked

### When to Enforce Strictly

- **New features** must follow standards
- **Major refactors** must align with standards
- **Team-shared patterns** (modals, tables) must be consistent

---

## Follow-Up Commands

After reviewing structure:

- Use `/cmd-create-modal` to fix modal violations
- Use `/cmd-create-table` to fix table violations
- Use `/cmd-review-component` to check individual components
```
