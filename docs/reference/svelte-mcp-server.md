# Svelte MCP Server - Usage Guide

This guide explains how to use the Svelte MCP server tools available in Claude Code for accessing comprehensive Svelte 5 and SvelteKit documentation.

---

## Available MCP Tools

### 1. list-sections

**Purpose**: Discover all available documentation sections

**When to use**: ALWAYS use this FIRST when asked about Svelte or SvelteKit topics at the start of a chat

**Returns**: Structured list with:
- Section titles
- Use cases (keywords describing when this documentation is useful)
- File paths

**Example**:
```typescript
// Lists all available Svelte 5 and SvelteKit documentation sections
// with use_cases field for each section
```

---

### 2. get-documentation

**Purpose**: Retrieve full documentation content for specific sections

**When to use**: After calling `list-sections` to fetch relevant documentation

**Key Requirements**:
- Accepts single section name OR array of section names
- Can search by title (e.g., "$state", "load functions") or file path (e.g., "cli/overview")
- After calling `list-sections`, you MUST:
  1. Analyze the returned documentation sections
  2. Pay special attention to the `use_cases` field
  3. Use `get-documentation` to fetch ALL relevant sections at once

**Example**:
```typescript
// Fetch single section
get_documentation({ section: "$state" })

// Fetch multiple sections
get_documentation({ section: ["$state", "$derived", "$effect"] })
```

---

### 3. svelte-autofixer

**Purpose**: Analyze Svelte code and return issues/suggestions

**When to use**: MUST use this tool whenever writing Svelte code BEFORE sending it to the user

**Process**:
1. Write Svelte component/module code
2. Call `svelte-autofixer` with the code
3. Review issues and suggestions
4. Fix the code
5. Keep calling `svelte-autofixer` until no issues or suggestions are returned

**Parameters**:
- `code` (required): The Svelte component or module code
- `desired_svelte_version` (required): Target Svelte version (check package.json, default to 5)
- `filename` (optional): Component filename with .svelte or .svelte.ts extension
- `async` (optional): Set to true for async components/modules (Svelte 5 only)

**Example**:
```typescript
svelte_autofixer({
  code: componentCode,
  desired_svelte_version: 5,
  filename: "MyComponent.svelte"
})
```

---

### 4. playground-link

**Purpose**: Generate a Svelte Playground link with the provided code

**When to use**:
- After completing code
- Ask user if they want a playground link
- Only call after user confirmation
- NEVER use if code was written to files in the user's project

**Parameters**:
- `name` (required): Name of the playground (should reflect the task)
- `tailwind` (required): Boolean - only true if code uses Tailwind classes
- `files` (required): Object with filenames as keys and file content as values

**Example**:
```typescript
playground_link({
  name: "User Authentication Form",
  tailwind: true,
  files: {
    "Component.svelte": "<script>...</script>",
    "utils.js": "export function ..."
  }
})
```

**Note**: The playground accepts multiple files, so include all imported files at the root level.

---

## Workflow Example

### Scenario: User asks to create an interactive counter

1. **Call `list-sections`** to discover available documentation
2. **Analyze use_cases** in the returned sections (look for "state", "reactivity", "interactive")
3. **Call `get-documentation`** to fetch ALL relevant sections:
   - `$state` (for reactive state)
   - `$derived` (if computed values needed)
   - `$effect` (if side effects needed)
4. **Write the component** following the documentation
5. **Call `svelte-autofixer`** with the code
6. **Fix any issues** reported
7. **Call `svelte-autofixer` again** until clean
8. **Ask user** if they want a playground link
9. **Call `playground-link`** if user confirms

---

## Best Practices

### Always Start with list-sections
```typescript
// ✅ Correct workflow
1. list-sections() // Discover available docs
2. Analyze use_cases
3. get-documentation({ section: [...] }) // Fetch ALL relevant sections
4. Write code
5. svelte-autofixer() // Validate

// ❌ Incorrect workflow
1. Write code without checking documentation
2. Skip svelte-autofixer
```

### Fetch Multiple Sections at Once
```typescript
// ✅ Correct - fetch all related sections together
get_documentation({
  section: ["$state", "$derived", "$effect", "component-props"]
})

// ❌ Incorrect - multiple separate calls
get_documentation({ section: "$state" })
get_documentation({ section: "$derived" })
get_documentation({ section: "$effect" })
```

### Always Use svelte-autofixer Before Sending Code
```typescript
// ✅ Correct
1. Write component
2. Call svelte-autofixer()
3. Fix issues
4. Call svelte-autofixer() again
5. Repeat until no issues
6. Send to user

// ❌ Incorrect
1. Write component
2. Send to user without validation
```

### Only Offer Playground Link After User Confirmation
```typescript
// ✅ Correct
1. Complete code
2. "Would you like a playground link to test this?"
3. Wait for user response
4. Call playground-link() if confirmed

// ❌ Incorrect
1. Complete code
2. Immediately call playground-link() without asking
```

---

## Common Use Cases

### Building Interactive Components
- Fetch: `$state`, `$derived`, `$effect`, `$props`
- Use cases: state management, reactivity, interactivity

### Building Forms
- Fetch: `$state`, form handling, validation, superforms
- Use cases: forms, user input, validation

### Building E-commerce Features
- Fetch: `$state`, `$derived`, shopping cart patterns, product listings
- Use cases: e-commerce, shopping, cart

### Building Animations
- Fetch: transitions, animations, motion
- Use cases: animations, transitions, motion

---

## Reference

- Official Svelte 5 Docs: https://svelte-5-preview.vercel.app/
- SvelteKit Docs: https://kit.svelte.dev/
- Svelte REPL/Playground: https://svelte.dev/repl
