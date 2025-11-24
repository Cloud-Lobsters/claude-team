````markdown
# Sorting Guide

TanStack Table provides comprehensive sorting capabilities, including client-side sorting, custom sorting functions, and multi-column sorting. This guide covers configuration options and APIs for managing sorting behavior.

---

## Sorting State

### Sorting State Shape

The sorting state is an array of objects defining the sort configuration:

```typescript
type ColumnSort = {
	id: string;
	desc: boolean;
};
type SortingState = ColumnSort[];
```
````

### Accessing Sorting State

Retrieve the current sorting state via the table instance:

```typescript
const table = useReactTable({
	columns,
	data
	// ...
});
console.log(table.getState.sorting);
```

### Controlled Sorting State

Manage sorting externally using React state:

```typescript
const [sorting, setSorting] = useState<SortingState>([]);
const table = useReactTable({
	state: { sorting },
	onSortingChange: setSorting
});
```

### Initial Sorting State

Set default sorting:

```typescript
const table = useReactTable({
	initialState: {
		sorting: [{ id: 'name', desc: true }]
	}
});
```

---

## Client-Side vs Server-Side Sorting

### Manual Server-Side Sorting

Disable client-side sorting for server handling:

```typescript
const table = useReactTable({
	manualSorting: true
	// ... other options
});
```

### Client-Side Sorting

Enable client-side sorting with row model:

```typescript
import { getSortedRowModel } from '@tanstack/table-core';

const table = useReactTable({
	getSortedRowModel: getSortedRowModel()
	// ... other options
});
```

---

## Sorting Functions

### Built-in Sorting Functions

Available options:

- `alphanumeric` (default for strings)
- `alphanumericCaseSensitive`
- `text`
- `textCaseSensitive`
- `datetime`
- `basic` (default for numbers)

### Custom Sorting Functions

Define custom sorting logic:

```typescript
const mySortFn: SortingFn = (rowA, rowB, columnId) => {
	return rowA.original[columnId] > rowB.original[columnId] ? 1 : -1;
};

const table = useReactTable({
	sortingFns: { custom: mySortFn },
	columns: [
		{
			sortingFn: 'custom'
			// ...
		}
	]
});
```

---

## Sorting Configuration Options

### Disable Sorting

```typescript
// Per-column
enableSorting: false;

// Table-wide
enableSorting: false;
```

### Sorting Direction

Set default sort direction:

```typescript
// Column-level
sortDescFirst: true;

// Table-level
sortDescFirst: true;
```

### Invert Sorting

Reverse sort order for specific columns:

```typescript
invertSorting: true;
```

### Undefined Values Handling

Control undefined value placement:

```typescript
sortUndefined: 'first' | 'last' | 1 | -1 | false;
```

---

## Multi-Sorting

### Enable/Disable Multi-Sorting

```typescript
// Per-column
enableMultiSort: false;

// Table-wide
enableMultiSort: false;
```

### Multi-Sorting Trigger Key

Customize the key used for multi-sort:

```typescript
isMultiSortEvent: (e) => e.ctrlKey || e.shiftKey;
```

### Multi-Sorting Limits

Limit the number of sortable columns:

```typescript
maxMultiSortColCount: 3;
```

---

## Sorting APIs

### Key APIs

- `table.setSorting(...)`: Set sorting state directly
- `column.getToggleSortingHandler()`: Generate sorting handler
- `column.getIsSorted()`: Check current sort state
- `column.getSortIndex()`: Get sort priority in multi-sort

---

## Examples

### Basic Sorting

```typescript
const table = useReactTable({
	getSortedRowModel: getSortedRowModel()
	// ... other options
});
```

### Custom Sorting Function

```typescript
const columns = [
	{
		accessorKey: 'rank',
		invertSorting: true,
		sortingFn: 'alphanumeric'
	}
];
```

---

## Notes

- **Multi-Sorting Removal**:\*\* Use `enableMultiRemove` to disable removing multi-sorts.
- **Manual Sorting:** When `manualSorting` is enabled, data must be pre-sorted.
- **Undefined Values:** Default `sortUndefined` behavior sorts `undefined` last for ascending, first for descending.

For full API details, see the [Sorting API Reference](#sorting-apis).

```

This documentation structure retains all examples and key configuration points while sanitizing non-essential content like privacy notices and UI elements. It uses markdown syntax for code blocks, headers, and notes, ensuring clarity and readability.
```
