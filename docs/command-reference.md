# Command Reference

## Available Commands

This document lists all available commands in the shared repository.

### /create-modal

Create a new modal component following the centralized state pattern.

**Usage:**
```
/create-modal
```

Claude will ask for:
- Modal name
- Data requirements
- Location

---

### /create-table

Create a new table component with TanStack Table Core.

**Usage:**
```
/create-table
```

Claude will ask for:
- Table purpose
- Data source
- Columns
- Filters needed

---

### /create-form

Create a new form component with Superforms.

**Usage:**
```
/create-form
```

Claude will ask for:
- Form fields
- Validation rules
- Submit action

---

### /scaffold-crud

Scaffold complete CRUD interface for a resource.

**Usage:**
```
/scaffold-crud
```

Claude will create:
- List view with table
- Create form
- Edit form
- Delete confirmation

---

### /review-component

Review a component against team standards.

**Usage:**
```
/review-component
```

Invokes the component-reviewer agent.

---

## Adding New Commands

See [Contributing Guide](contributing.md) for instructions on adding new commands.
