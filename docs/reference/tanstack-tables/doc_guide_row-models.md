# TanStack Table v8 Row Models Guide

## What are Row Models?

Row models in TanStack Table are functions that transform your original data into structured row formats required for features like filtering, sorting, and pagination. They ensure the data is processed according to enabled features before rendering.

---

## Importing Row Models

Import only the row models you need. Example imports for all available row models:

```typescript
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel
} from '@tanstack/table-core';

const table = useReactTable({
	columns,
	data,
	getCoreRowModel: getCoreRowModel(),
	getExpandedRowModel: getExpandedRowModel()
	// ... other row models
});
```

---

## Customizing/Forking Row Models

You can fork and modify row models by copying their source code. For example, to customize `getSortedRowModel`:

```typescript
// Custom sorting logic example
const getCustomSortedRowModel = (originalRowModel) => {
	// Implement custom sorting logic here
	return originalRowModel;
};
```

---

## Using Row Models

Access row models via the table instance. The primary method is `table.getRowModel()` for rendering:

```javascript
// Render rows using the final processed row model
table.getRowModel().rows.forEach((row) => <div>{row.original.data}</div>);
```

---

## Available Row Models on Table Instance

| Method                       | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `getRowModel()`              | Final processed rows (combines all enabled features) |
| `getCoreRowModel()`          | Raw data rows (1:1 with input data)                  |
| `getFilteredRowModel()`      | Rows after filtering                                 |
| `getPreFilteredRowModel()`   | Rows before filtering                                |
| `getGroupedRowModel()`       | Rows with grouping and sub-rows                      |
| `getPreGroupedRowModel()`    | Rows before grouping                                 |
| `getSortedRowModel()`        | Rows after sorting                                   |
| `getPreSortedRowModel()`     | Rows before sorting                                  |
| `getExpandedRowModel()`      | Rows including expanded sub-rows                     |
| `getPreExpandedRowModel()`   | Only root rows (no expanded sub-rows)                |
| `getPaginationRowModel()`    | Paginated rows                                       |
| `getPrePaginationRowModel()` | All rows (pre-pagination)                            |
| `getSelectedRowModel()`      | Selected rows (post-core processing)                 |
| `getPreSelectedRowModel()`   | Rows before selection applied                        |

---

## Order of Row Model Execution

Row models are applied in this sequence when features are enabled:

1. `getCoreRowModel` (base data)
2. `getFilteredRowModel` (applies filters)
3. `getGroupedRowModel` (applies grouping)
4. `getSortedRowModel` (applies sorting)
5. `getExpandedRowModel` (handles expansion)
6. `getPaginationRowModel` (applies pagination)
7. Final `getRowModel()` output

**Note:** If a feature is disabled (via `manualPagination: true`), the `getPre*RowModel` version is used instead.

---

## Row Model Data Structure

Each row model returns an object with three formats:

```typescript
{
  rows: Row[], // Nested rows (e.g., with sub-rows for grouping)
  flatRows: Row[], // Flattened array of all rows (no nesting)
  rowsById: Record<string, Row> // Rows keyed by their `id` property
}

// Example usage:
console.log(table.getRowModel().rows); // Nested rows
console.log(table.getRowModel().flatRows); // Flattened array
console.log(table.getRowModel().rowsById['row-123']); // Access by ID
```

---

## Key Concepts

- **Modularity**: Only import row models you use to optimize bundle size.
- **Chaining**: Features are applied in a specific order (filter → group → sort → expand → paginate).
- **Performance**: Use `rowsById` for fast lookups by row ID.

For more details, refer to the [TanStack Table documentation](https://tanstack.com/table/v8/docs/).)

---

This documentation focuses on the core concepts and usage patterns of row models in TanStack Table v8, ensuring clarity on how data transformations occur and how to leverage them effectively in your applications.
