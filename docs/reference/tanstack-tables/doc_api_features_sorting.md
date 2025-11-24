````markdown
# Sorting Guide

## State

The sorting state is stored in the table using the following types:

```typescript
export type SortDirection = 'asc' | 'desc';

export type ColumnSort = {
	id: string;
	desc: boolean;
};

export type SortingState = ColumnSort[];

export type SortingTableState = {
	sorting: SortingState;
};
```
````

---

## Sorting Functions

### Built-in Sorting Functions

The following sorting functions are built-in:

- **alphanumeric**: Sorts mixed alphanumeric values without case-sensitivity. Slower but accurate for numeric strings.
- **alphanumericCaseSensitive**: Case-sensitive alphanumeric sorting.
- **text**: Sorts strings without case-sensitivity. Faster but less accurate for numeric strings.
- **textCaseSensitive**: Case-sensitive text sorting.
- **datetime**: Sorts Date objects.
- **basic**: Basic comparison for custom logic. Fastest but least accurate.

---

## Using Sorting Functions

### Defining Sorting Functions

Sorting functions can be referenced or defined via:

1. Built-in function name (e.g., `'alphanumeric'`).
2. Custom function via `sortingFns` option:

```typescript
// Define a custom sorting function
const table = useReactTable({
	columns: [column],
	sortingFns: {
		myCustomSorting: (rowA, rowB, columnId) =>
			rowA.getValue(columnId).value < rowB.getValue(columnId).value ? 1 : -1
	}
});
```

---

## Column Definition Options

### `sortingFn`

- **Type**: `SortingFn | keyof SortingFns | keyof BuiltInSortingFns`
- **Description**: Specifies the sorting function for the column.
- **Example**:

```typescript
const column = columnHelper.accessor('name', {
	sortingFn: 'alphanumeric'
});
```

### `sortDescFirst`

- **Type**: `boolean`
- **Description**: Starts sorting in descending order when toggled.

### `enableSorting`

- **Type**: `boolean`
- **Description**: Enables/disables sorting for the column.

### `enableMultiSort`

- **Type**: `boolean`
- **Description**: Enables multi-sorting for the column.

### `invertSorting`

- **Type**: `boolean`
- **Description**: Inverts sort order for inverted scales (e.g., rankings).

### `sortUndefined`

- **Type**: `'first' | 'last' | false | -1 | 1`
- **Description**: Controls placement of undefined values. Defaults to `1` (treat as higher than defined values).
- **Note**: `'first'` and `'last'` were added in v8.16.0.

---

## Column API Methods

### `getAutoSortingFn()`

- **Returns**: Inferred sorting function based on column values.

### `getAutoSortDir()`

- **Returns**: Inferred sort direction (asc/desc).

### `toggleSorting()`

- **Usage**: `toggleSorting(desc?, isMulti?)` to programmatically toggle sorting.

---

## Table Options

### `sortingFns`

- **Type**: `Record<string, SortingFn>`
- **Example**:

```typescript
// Extend built-in sorting functions
declare module '@tanstack/table-core' {
	interface SortingFns {
		myCustomSorting: SortingFn<unknown>;
	}
}
```

### `manualSorting`

- **Type**: `boolean`
- **Description**: Enables manual sorting (server-side use).

### `enableMultiSort`

- **Type**: `boolean`
- **Description**: Enables multi-sorting for the table.

### `sortDescFirst`

- **Type**: `boolean`
- **Description**: Defaults to descending sort on first toggle.

---

## Table API Methods

### `setSorting()`

- **Usage**: `setSorting(updater)` to programmatically set sorting state.

### `getSortedRowModel()`

- **Returns**: Row model after sorting is applied.

---

## Custom Sorting Example

```typescript
// Custom sorting function example
const customSort: SortingFn = (rowA, rowB, columnId) => {
	const a = rowA.getValue(columnId);
	const b = rowB.getValue(columnId);
	return a.localeCompare(b);
};

// Usage in column definition
const column = columnHelper.accessor('name', {
	sortingFn: customSort
});
```

---

## Notes

- **Undefined Values**: Use `sortUndefined` to control placement of `undefined` values.
- **Multi-Sort**: Use `enableMultiSort` to allow sorting by multiple columns.
- **Server-Side**: Set `manualSorting` to `true` for server-side sorting.

For more details, refer to the [GitHub repository](https://github.com/TanStack/table).

```

This documentation structure organizes the content into logical sections, includes all examples, and maintains clarity. It uses markdown syntax for headers, code blocks, and bullet points while preserving the original examples and notes.
```
