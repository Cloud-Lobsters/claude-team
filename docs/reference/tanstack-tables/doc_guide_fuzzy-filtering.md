````markdown
# Fuzzy Filtering Guide

Fuzzy filtering allows filtering data based on approximate matches, useful for search-like functionality. This guide explains how to implement it with TanStack Table v8 using the `@tanstack/match-sorter-utils` library.

---

## Installation

To use fuzzy filtering, install the required package:

```bash
npm install @tanstack/match-sorter-utils
```
````

---

## Fuzzy Filtering Guide

### Defining a Custom Fuzzy Filter Function

Create a custom filter function using `rankItem` from `@tanstack/match-sorter-utils`:

```typescript
import { rankItem } from '@tanstack/match-sorter-utils';
import type { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);
	addMeta({ itemRank });
	return itemRank.passed;
};
```

### Using Fuzzy Filtering with Global Filtering

Apply the filter globally by configuring the table instance:

```typescript
const table = useReactTable({
	columns,
	data,
	filterFns: {
		fuzzy: fuzzyFilter
	},
	globalFilterFn: 'fuzzy',
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getSortedRowModel: getSortedRowModel()
});
```

### Using Fuzzy Filtering with Column Filtering

Define the filter for a specific column:

```typescript
const columns = [
	{
		accessorFn: (row) => `${row.firstName} ${row.lastName}`,
		id: 'fullName',
		header: 'Full Name',
		cell: (info) => info.getValue(),
		filterFn: 'fuzzy'
	}
	// Other columns...
];
```

### Sorting with Fuzzy Filtering

Sort rows based on fuzzy match rankings:

```typescript
import { compareItems } from '@tanstack/match-sorter-utils';
import { sortingFns } from '@tanstack/table';

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  if (rowA.columnFiltersMeta[columnId] && rowB.columnFiltersMeta[columnId]) {
    return compareItems(
      rowA.columnFiltersMeta[columnId].itemRank!,
      rowB.columnFiltersMeta[columnId].itemRank!
    );
  }
  return sortingFns.alphanumeric(rowA, rowB, columnId);
};

// Apply the sort function to a column
{
  accessorFn: row => row.name,
  id: 'name',
  sortFn: fuzzySort,
}
```

---

## API Reference

### `rankItem` (from `@tanstack/match-sorter-utils`)

- **Purpose**: Ranks a value's match against a search query.
- **Parameters**:
  - `value`: The data value to rank.
  - `input`: The search query.
- **Returns**: An object with `score`, `indexOf`, `exactMatch`, and `passed` properties.

### `compareItems` (from `@tanstack/match-sorter-utils`)

- **Purpose**: Compares two ranked items for sorting.
- **Parameters**:
  - `a`: First ranked item.
  - `b`: Second ranked item.
- **Returns**: A numeric value indicating sort order.

---

## Examples

### Example 1: Global Fuzzy Search

```typescript
// Configure global fuzzy filtering
const table = useReactTable({
	// ... other options
	globalFilterFn: 'fuzzy'
});
```

### Example 2: Column-Specific Fuzzy Filter

```typescript
// Apply to a specific column
{
  accessorFn: row => row.email,
  id: 'email',
  filterFn: 'fuzzy',
}
```

---

## Notes

- **Client-Side Only**: Fuzzy filtering requires client-side filtering (`getFilteredRowModel`).
- **Optional Sorting**: Use `compareItems` to sort results by relevance.
- **Installation**: Ensure `@tanstack/match-sorter-utils` is installed for fuzzy logic.

---

## More Resources

- [TanStack Table Documentation](https://tanstack.com/table)
- [Match-Sorter Utils GitHub](https://github.com/tanstack/match-sorter-utils)

```

This documentation structure maintains all original examples and code snippets while organizing them into a clear, navigable format. Key functions and setup steps are highlighted with code blocks, and important notes are emphasized for clarity.
```
