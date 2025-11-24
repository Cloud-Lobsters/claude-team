````markdown
# Pagination Guide

## Introduction

TanStack Table provides robust support for both client-side and server-side pagination. This guide explains how to implement and configure pagination effectively.

---

## Client-Side Pagination

### Should You Use Client-Side Pagination?

Client-side pagination is ideal for datasets with up to ~10,000 rows. For larger datasets, consider server-side pagination or virtualization.

### Should You Use Virtualization Instead?

For very large datasets, use [TanStack Virtual](https://tanstack.com/virtual) to render only visible rows, improving performance.

### Pagination Row Model

Enable client-side pagination by adding the `getPaginationRowModel`:

```jsx
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';

const table = useReactTable({
	columns,
	data,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel()
});
```
````

---

## Manual Server-Side Pagination

### Page Count and Row Count

For server-side pagination, provide `rowCount` or `pageCount` to inform the table of total data:

```jsx
const table = useReactTable({
	columns,
	data,
	manualPagination: true, // Disable client-side logic
	rowCount: dataQuery.data?.rowCount // Or pageCount: dataQuery.data?.pageCount,
});
```

---

## Pagination State Management

### Managing State

Control pagination state with React state hooks:

```jsx
const [pagination, setPagination] = useState({
	pageIndex: 0,
	pageSize: 10
});

const table = useReactTable({
	state: { pagination },
	onPaginationChange: setPagination
});
```

### Initial State

Set default values via `initialState`:

```jsx
const table = useReactTable({
	initialState: {
		pagination: {
			pageIndex: 2,
			pageSize: 25
		}
	}
});
```

> **Note:** Do not use both `state` and `initialState` together. Choose one approach.

---

## Pagination Options

### Auto Reset Page Index

Control automatic page reset on state changes:

```jsx
const table = useReactTable({
	autoResetPageIndex: false // Disable automatic reset
});
```

---

## Pagination APIs

### Pagination Button APIs

Implement navigation controls:

```jsx
<Button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
  {'<<'}
</Button>
<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
  {'<'}
</Button>
<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
  {'>'}
</Button>
<Button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
  {'>>'}
</Button>

<select
  value={table.getState().pagination.pageSize}
  onChange={(e) => table.setPageSize(Number(e.target.value))}
>
  {[10, 20, 30, 40, 50].map(size => (
    <option key={size} value={size}>
      {size}
    </option>
  ))}
</select>
```

### Pagination Info APIs

Display pagination details:

- `table.getPageCount()` → Total pages
- `table.getPrePaginationRowModel().rows.length` → Total rows

---

## Examples

- **Client-Side**:\*\* Use `getPaginationRowModel` for automatic client-side logic.
- **Server-Side:** Set `manualPagination: true` and provide `rowCount`/`pageCount`.
- **State Management:** Use `useState` or `initialState` for page/index control.

---

## API Reference

### Core APIs

- `getCanPreviousPage()`: Check if previous page is available.
- `getCanNextPage()`: Check if next page is available.
- `previousPage()`: Navigate to previous page.
- `nextPage()`: Navigate to next page.
- `setPageSize(size)`: Update page size.
- `setPageIndex(index)`: Set current page index.

### State Management

- `state.pagination`: Current pagination state.
- `onPaginationChange`: Callback for state updates.

### Options

- `manualPagination`: Enable server-side pagination.
- `rowCount`: Total rows in dataset.
- `pageCount`: Total pages in dataset.
- `autoResetPageIndex`: Reset page index on state changes.

---

## Considerations

- **Performance:** Test with large datasets to ensure client-side performance.
- **State Persistence:** Use `initialState` for default values.
- **Server Sync:** For server-side, ensure `data` is already paginated.

> **Note:** Server-side pagination requires manual data fetching and state synchronization.

```

This documentation structure:
- Organizes content into logical sections
- Preserves all code examples and key APIs
- Highlights important notes and warnings
- Uses markdown formatting for readability
- Removes irrelevant content (privacy notice, navigation menu, etc.)
- Maintains the original example code snippets
- Adds clear section headers and API references
- Includes usage notes and best practices
- Uses markdown syntax for code blocks and notes
```
