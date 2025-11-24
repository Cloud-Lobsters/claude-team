# Critical Implementation Rules

**READ THIS FIRST BEFORE ANY IMPLEMENTATION**

These rules exist because past implementations were invalidated by incorrect assumptions about codebase structure.

---

## Rule 1: Always Verify Actual File Structure First

**DO NOT assume** what routes exist or how entities are organized based on planning documents or external context.

**YOU MUST**:
1. Inspect the actual file system under `src/routes/dashboard/` to see what routes currently exist
2. Verify the relationship between entities (e.g., "Are stores sub-entities of retailers, or independent routes?")
3. Cross-reference with existing implementations in similar modules (claims, policies)
4. Verify that any proposed file structure matches the actual codebase organization

### Anti-pattern (WRONG):
```
Refactoring plan says "Stores Route - State: ✗ Route doesn't exist yet"
→ ASSUME stores need a new top-level /dashboard/stores/ route
→ CREATE stores route from scratch
→ MISTAKE: Stores are actually managed as sub-entities under retailers
```

### Correct pattern (RIGHT):
```
Plan suggests stores might need restructuring
→ INSPECT actual codebase: src/routes/dashboard/retailers/ exists
→ CHECK: How are stores currently handled? (grep for "stores" references)
→ VERIFY: Stores are sub-entities under retailers, not independent
→ IMPLEMENT: Store management as children under retailers route
```

---

## Rule 2: Cross-Reference Against Existing Patterns

Before implementing a new route/pattern:

1. Find similar existing implementations in the codebase
2. Study how those entities are structured (are they top-level or nested?)
3. Use existing patterns as the source of truth, not documentation
4. If documentation conflicts with actual codebase, the codebase wins

### Examples of pattern references:
- Claims table pattern: `/src/routes/dashboard/claims/` (study this for the "simple" pattern)
- Policies table pattern: `/src/routes/dashboard/policies/` (study this for the "full" pattern)
- Retailers implementation: `/src/routes/dashboard/retailers/` (study for actual route structure)

---

## Rule 3: Document Assumptions vs Facts

When creating implementation plans, clearly distinguish:

### ❌ WRONG:
```
Retailers Route - State: ✓ Exists
Stores Route - State: ✗ Route doesn't exist yet
```
(This mixes assumption with fact and creates confusion)

### ✅ CORRECT:
```
Retailers Route - State: ✓ Exists (verified in src/routes/dashboard/retailers/)
Stores Entity - Current Structure: UNVERIFIED (need to inspect codebase)
Stores Route - Assumption: If independent, would be /dashboard/stores/
             - Reality Check: MUST inspect how stores are currently used before implementing
```

---

## Rule 4: Use This Verification Checklist Before Implementing

**BEFORE you create any new route or modify file structure:**

- [ ] **Route exists check**: Does `src/routes/dashboard/[entity]/` exist in the actual filesystem?
- [ ] **Relationship check**: Is this entity top-level or nested under another entity? (Verify by finding where it's referenced)
- [ ] **Pattern check**: Are there similar entities already in the codebase? How are they organized?
- [ ] **Reference check**: Search grep for the entity name in the codebase - where is it used?
- [ ] **Structure check**: If entity is currently managed (e.g., in database), verify the actual schema and relationships
- [ ] **Anti-assumption**: Don't create new routes based on "should exist" - only implement based on "does exist" or "explicitly required by user"

**If you skip this checklist and make assumptions, you WILL create incorrect file structures.**

---

## Rule 5: When in Doubt, Ask or Verify

If any aspect of file structure, entity relationships, or existing patterns is unclear:
- Use grep/file search to find existing references
- Read existing implementation (e.g., see how claims are currently structured)
- Ask the user explicitly: "Should stores be a sub-section under retailers or an independent route?"

### Example question (if unsure):
```
"I see retailers exists at /src/routes/dashboard/retailers/.
Should I create stores as a new top-level route /dashboard/stores/,
or as a sub-section under retailers?
Let me verify the current codebase structure first..."
```

---

## Rule 6: Implementation Plan Must Match Reality

After inspecting the codebase, your implementation plan must:
1. Accurately reflect ACTUAL current file structure
2. Show VERIFIED entity relationships (not assumptions)
3. Include specific file paths that you've confirmed exist or will be created
4. Have clear approval from user before implementing anything new

**Anti-pattern**: Creating files/routes that don't match the actual app structure

**Correct pattern**: All created files align with how the codebase actually organizes entities

---

## Common Mistakes to Avoid

### Mistake 1: Creating Routes Based on Documentation
❌ **Wrong**: "The planning doc says we need a stores route, so I'll create it"
✅ **Right**: "Let me check if stores are already managed somewhere in the codebase first"

### Mistake 2: Assuming Entity Independence
❌ **Wrong**: "Stores are a separate table in the database, so they need their own route"
✅ **Right**: "Stores reference retailers in the schema. Let me verify if they're managed under retailers in the UI"

### Mistake 3: Ignoring Existing Patterns
❌ **Wrong**: "I'll organize this feature differently because it makes more sense"
✅ **Right**: "I'll follow the exact same pattern as claims/policies for consistency"

### Mistake 4: Not Verifying Before Starting
❌ **Wrong**: Start implementing immediately based on user request
✅ **Right**: Spend 2-3 minutes verifying actual file structure first, then implement

---

## Tools for Verification

### Check if route exists:
```bash
ls -la src/routes/dashboard/[entity]/
```

### Find where entity is referenced:
```bash
grep -r "[entity]" src/routes/dashboard/
```

### Explore directory structure:
```bash
find src/routes/dashboard -type d -maxdepth 2
```

### Check database schema:
```bash
grep -A 20 "model [Entity]" shared-prisma/prisma/schema/
```

---

## Summary

**Before implementing ANYTHING:**

1. ✅ Verify actual file structure
2. ✅ Check existing patterns
3. ✅ Document facts vs assumptions
4. ✅ Use verification checklist
5. ✅ Ask user if uncertain
6. ✅ Ensure plan matches reality

**The 5-minute rule**: Spend 5 minutes verifying before implementing. It will save hours of rework.
