````markdown
# Table Instance Guide

The Table Instance is the core object that manages the state and logic of your table. It is created using your framework's adapter (e.g., `useReactTable`, `createSvelteTable`).

---

## Creating a Table Instance

### Defining Data

The `data` prop is an array of objects representing your rows. Define a type for your data to enable type safety:

```typescript
// Define your data type
type User = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: string;
};

// Example data array
const data: User[] = [
	{
		firstName: 'Tanner',
		lastName: 'Linsley',
		age: 33,
		visits: 100,
		progress: 50,
		status: 'Married'
	}
	// ... more users
];
```
````

**Note:** Ensure `data` has a stable reference to avoid re-renders (e.g., use `useState` in React).

---

### Defining Columns

Columns are defined using `ColumnDef` or a `columnHelper`. Use the same `TData` type as your data:

```typescript
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<User>();

const columns = [
	columnHelper.accessor('firstName', {
		header: 'First Name',
		cell: (row) => row.getValue()
	})
	// ... other columns
];
```

---

### Creating the Table Instance

Use your framework's adapter to create the table:

```javascript
// React
import { useReactTable } from '@tanstack/react-table';

const table = useReactTable({
	columns,
	data
});

// Svelte
import { createSvelteTable } from '@tanstack/svelte-table';

const table = createSvelteTable({
	columns,
	data
});

// Vue, Solid, etc. follow similar patterns
```

---

## Table State

Access and modify state via the `table` instance:

```typescript
// Read state
const selection = table.getState().rowSelection;

// Modify state
table.setRowSelection((prev) => ({ ...prev }));

// Reset state
table.resetRowSelection();
```

---

## Table APIs

The table instance provides methods for interacting with features like sorting, filtering, and pagination. Full API reference: [Table API Docs](#table-api).

---

## Table Row Models

Row models (e.g., `table.getRowModel().rows`) provide processed rows based on features like filtering, sorting, and grouping. Configure row models via the `rowModelType` option.

---

## Related Guides

- [Column Definitions Guide](column-defs.md)
- [Row Models Guide](row-models.md)

```

This documentation:
- Maintains all original examples and code snippets
- Uses proper markdown syntax for headers, code blocks, and lists
- Organizes content into logical sections
- Preserves framework-specific examples (React, Svelte, etc.)
- Includes type definitions and usage notes
- Maintains the original structure while improving readability
- Removes irrelevant privacy policy content
- Adds proper syntax highlighting for code blocks
```
