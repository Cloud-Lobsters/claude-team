---
argument-hint: <reference-folder-name>
---

# Add Reference Documentation

Register newly added reference documentation in the `.claude` team standards repository.

**Usage:**

```bash
/cmd-add-reference authjs
/cmd-add-reference drizzle
/cmd-add-reference zod
```

**Arguments:**

- `$1` (required): Name of the reference folder added to `.claude/docs/reference/`
  - Example: `authjs`, `drizzle`, `lucia-auth`, etc.

---

## Your Task

Properly integrate newly added reference documentation into the `.claude` team standards by:

1. Verifying the reference folder exists
2. Counting documentation files
3. Updating `.claude/CLAUDE.md` to list the reference
4. Providing guidance on optional enhancements

**Reference Folder:** `$1`

---

## Step 1: Verify Reference Folder Exists

Check that the reference documentation folder exists and contains files:

```bash
# Check if folder exists
ls -la .claude/docs/reference/$1/

# Count documentation files
find .claude/docs/reference/$1 -type f -name "*.md" | wc -l
```

**Expected Result:**
- Folder exists at `.claude/docs/reference/$1/`
- Contains at least 1 `.md` file

**If folder doesn't exist:**
- ❌ Stop and inform user that reference folder not found
- Provide correct path format: `.claude/docs/reference/[folder-name]/`

---

## Step 2: Read Current CLAUDE.md Reference Section

Read the "Reference Documentation > Framework Documentation" section from `.claude/CLAUDE.md`:

```bash
# Read the reference documentation section (around lines 213-225)
cat .claude/CLAUDE.md | sed -n '213,225p'
```

**Check for:**
- Is `$1` already listed?
- Where should it be inserted (alphabetical or logical grouping)?
- What format are other references using?

**Format Pattern:**
```markdown
- **Name** - [`docs/reference/folder/`](docs/reference/folder/) (N files/docs/guides)
```

---

## Step 3: Update .claude/CLAUDE.md

Add the new reference to the "Framework Documentation" section in `.claude/CLAUDE.md`.

**Location:** Lines ~213-225 (after "Framework Documentation" heading)

**Insert new line in appropriate position:**

```markdown
- **$1** - [`docs/reference/$1/`](docs/reference/$1/) (N reference docs)
```

**Positioning Guidelines:**
- If authentication-related (auth, lucia, clerk): Near Auth.js or after security-related items
- If database-related (drizzle, prisma, postgres): Group with database items
- If validation-related (zod, yup): Group with form/validation items
- Otherwise: Alphabetical order

**Replace placeholders:**
- `$1` = reference folder name (e.g., "Auth.js", "Drizzle ORM", "Zod")
- `N` = actual file count from Step 1

**Capitalization:**
- Use proper product name capitalization
- Examples: "Auth.js", "Drizzle ORM", "Zod", "Lucia Auth"

---

## Step 4: Verify Update

After updating, verify the change:

```bash
# Read updated section
cat .claude/CLAUDE.md | sed -n '213,230p'

# Verify new entry is present
grep -n "$1" .claude/CLAUDE.md
```

**Confirmation:**
- ✅ New reference appears in Framework Documentation list
- ✅ Correct file count displayed
- ✅ Link format matches other entries
- ✅ Proper capitalization and spacing

---

## Step 5: Provide Optional Enhancement Recommendations

Based on how other major references are integrated, provide suggestions for complete integration:

### Compare with Similar References

**Check how comprehensive references are integrated:**

1. **Superforms** (17 guides):
   - Listed in Reference Documentation ✅
   - Has "Form Pattern" section in Component Patterns ✅
   - Has `/cmd-create-form` command ✅
   - Referenced in implementation guides ✅

2. **TanStack Tables** (70 API docs):
   - Listed in Reference Documentation ✅
   - Has "Table Pattern" section in Component Patterns ✅
   - Has `/cmd-create-table` command ✅
   - Has dedicated implementation guide ✅

3. **Auth.js** (282 reference docs):
   - Listed in Reference Documentation ✅
   - Mentioned in project CLAUDE.md ✅
   - No dedicated command ❌
   - No pattern section ❌

### Recommend Based on Reference Importance

**If reference is a CORE technology** (used across multiple projects):

Recommend:
1. ✅ Add to Reference Documentation (required - just completed)
2. 🔶 Create Pattern Section in Component Patterns (recommended)
   - Location: `.claude/CLAUDE.md` under "## Component Patterns"
   - Include: Key principles, best practices, anti-patterns
   - Example: See "Modal Pattern" or "Form Pattern" sections

3. 🔶 Create Command (recommended)
   - File: `.claude/commands/cmd-create-[name].md`
   - Purpose: Standardize setup/implementation
   - Example: `/cmd-create-form`, `/cmd-create-table`

4. 🔶 Create Template (optional)
   - Folder: `.claude/templates/[name]-setup/`
   - Include: Boilerplate files, configuration examples
   - Example: See `templates/support-modal/`

**If reference is a UTILITY library** (used occasionally):

Recommend:
1. ✅ Add to Reference Documentation (required - just completed)
2. ℹ️ Document common patterns in project CLAUDE.md if used
3. ℹ️ No need for dedicated command or template

---

## Step 6: Generate Integration Summary

Provide a summary report:

```markdown
## Reference Documentation Integration Complete

### ✅ What Was Done

- **Reference Added**: $1
- **Location**: `.claude/docs/reference/$1/`
- **File Count**: N documentation files
- **CLAUDE.md Updated**: Line ~XXX in Framework Documentation section

### 📋 Current Integration Status

- ✅ Reference folder exists
- ✅ Listed in Framework Documentation
- ⬜ Pattern section in Component Patterns (not created)
- ⬜ Dedicated command (not created)
- ⬜ Template/boilerplate (not created)

### 🔄 Recommended Next Steps

Based on how similar references are integrated, consider:

#### If $1 is a CORE technology:

1. **Create Pattern Section** (recommended)
   - Add to `.claude/CLAUDE.md` under "## Component Patterns"
   - Document key principles, best practices, anti-patterns
   - Reference: See "Form Pattern" or "Table Pattern" sections

2. **Create Setup Command** (recommended)
   - File: `.claude/commands/cmd-create-$1.md`
   - Standardize setup/implementation across projects
   - Reference: See `/cmd-create-form` or `/cmd-create-table`

3. **Create Template** (optional)
   - Folder: `.claude/templates/$1-setup/`
   - Provide boilerplate and configuration examples

#### If $1 is a UTILITY library:

- No further integration needed
- Document common usage patterns in project CLAUDE.md if needed

### 📚 Similar References

Compare integration with similar technologies:

- **Superforms**: Has pattern section + command + listed in docs
- **TanStack Tables**: Has pattern section + command + listed in docs + implementation guide
- **Auth.js**: Listed in docs + mentioned in project files (no command/pattern yet)

### ✅ Integration Complete

The reference documentation for **$1** is now properly registered in the `.claude` team standards.

Claude Code will now reference this documentation when answering questions about $1.
```

---

## Important Notes

### File Count Description

Choose appropriate description based on file count:
- 1-10 files: "N reference docs"
- 10-50 files: "N guides" or "N reference docs"
- 50-100 files: "N API docs" or "N reference docs"
- 100+ files: "N reference docs" or "comprehensive documentation"

### Reference Name Formatting

Use official product/library capitalization:
- ✅ "Auth.js" (not "authjs" or "AuthJS")
- ✅ "Drizzle ORM" (not "drizzle")
- ✅ "Zod" (not "ZOD" or "zod")
- ✅ "Lucia Auth" (not "lucia")

### Link Format

Always use relative paths:
- ✅ [`docs/reference/authjs/`](docs/reference/authjs/)
- ❌ [`.claude/docs/reference/authjs/`](.claude/docs/reference/authjs/)

Paths are relative to `.claude/` folder root.

---

## Example Output

When running `/cmd-add-reference authjs`:

```markdown
## Reference Documentation Integration Complete

### ✅ What Was Done

- **Reference Added**: Auth.js
- **Location**: `.claude/docs/reference/authjs/`
- **File Count**: 282 reference docs
- **CLAUDE.md Updated**: Line 224 in Framework Documentation section

### 📋 Current Integration Status

- ✅ Reference folder exists (282 .md files)
- ✅ Listed in Framework Documentation
- ⬜ Pattern section in Component Patterns (not created)
- ⬜ Dedicated command (not created)
- ⬜ Template/boilerplate (not created)

### 🔄 Recommended Next Steps

Based on how similar references are integrated, consider:

#### Auth.js is a CORE technology - Full integration recommended:

1. **Create Authentication Pattern Section** (recommended)
   - Add to `.claude/CLAUDE.md` under "## Component Patterns"
   - Document: Session management, route protection, provider setup
   - Reference: See "Form Pattern (Superforms)" section

2. **Create Setup Command** (recommended)
   - File: `.claude/commands/cmd-create-auth.md`
   - Automate: Provider setup, session config, route protection
   - Reference: See `/cmd-create-form` command

3. **Create Template** (optional)
   - Folder: `.claude/templates/auth-setup/`
   - Include: Boilerplate for common auth patterns (credentials, OAuth, etc.)

### 📚 Similar References

Auth.js should follow pattern of:
- **Superforms**: Has pattern section + `/cmd-create-form` + reference docs
- **TanStack Tables**: Has pattern section + `/cmd-create-table` + reference docs

### ✅ Integration Complete

The reference documentation for **Auth.js** is now properly registered.

Claude Code will reference this documentation when answering authentication questions.
```

---

## Error Handling

### Reference Folder Not Found

If folder doesn't exist:

```markdown
❌ Reference folder not found: `.claude/docs/reference/$1/`

**Possible Issues:**
1. Folder not created yet
2. Incorrect folder name
3. Files not committed to repository

**Expected Structure:**
```
.claude/
└── docs/
    └── reference/
        └── $1/           ← Should exist
            └── *.md      ← Should contain .md files
```

**Next Steps:**
1. Verify reference documentation was downloaded/created
2. Check folder name matches argument (case-sensitive)
3. Ensure files are committed to git
```

### Reference Already Listed

If reference already exists in CLAUDE.md:

```markdown
⚠️ Reference already listed in CLAUDE.md

**Current Entry:**
- **$1** - [`docs/reference/$1/`](docs/reference/$1/) (N docs)

**No changes made.**

If you need to update the file count or description, edit `.claude/CLAUDE.md` directly.
```

---

## Follow-Up Commands

After adding reference:

- Use `/cmd-review-structure` to audit project structure
- Use `/cmd-create-modal`, `/cmd-create-table`, `/cmd-create-form` for component patterns
- Create new command if reference needs standardized setup pattern

---

## Summary

After completing this command, you will have:

1. ✅ Verified reference folder exists with documentation files
2. ✅ Updated `.claude/CLAUDE.md` Framework Documentation section
3. ✅ Provided integration summary and recommendations
4. ✅ Claude Code can now reference this documentation automatically

The reference is now properly integrated into the `.claude` team standards repository.
