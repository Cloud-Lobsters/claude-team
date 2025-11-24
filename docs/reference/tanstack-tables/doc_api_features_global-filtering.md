````markdown
# Global Filtering

## Can-Filter

The ability for a column to be globally filtered is determined by the following conditions:

- The column was defined with a valid `accessorKey` or `accessorFn`.
- If provided, `options.getColumnCanGlobalFilter` returns `true` for the given column. If not provided, the column is assumed filterable if the value in the first row is a string or number type.
- `column.enableGlobalFilter` is not set to `false`.
- `options.enableColumnFilters` is not set to `false`.
- `options.enableFilters` is not set to `false`.

---

## State

The global filter state is stored in the table with the following shape:

```typescript
export interface GlobalFilterTableState {
	globalFilter: any;
}
```
````

---

## Filter Functions

Global filtering uses the same filter functions as column filtering. See [Column Filtering](#column-filtering) for details on filter functions.

### Using Filter Functions

You can define filter functions in three ways:

1. **Built-in filter function name** (e.g., `'includes'`).
2. **Custom function reference** passed directly to `globalFilterFn`.
3. **Custom function name** via `filterFns` option.

#### Example: Custom Filter Function with Meta

```typescript
import { sortingFns } from '@tanstack/[adapter]-table';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      (rowA.columnFiltersMeta[columnId]!, rowB.columnFiltersMeta[columnId]!);
  }
  return dir === 0
    ? sortingFns.alphanumeric(rowA, rowB, columnId)
    : dir;
};
```

---

## Filter Meta

Filter functions can return metadata via `addMeta` for downstream use (e.g., sorting). The `columnFiltersMeta` on rows stores this metadata.

---

## Column Def Options

### enableGlobalFilter

```typescript
enableGlobalFilter?: boolean
```

Enables/disables global filtering for the column.

---

## Table Options

### filterFns

```typescript
filterFns?: Record<string, FilterFn>
```

Define custom filter functions for reference in columns. Example:

```typescript
declare module '@tanstack/table-core' {
	interface FilterFns {
		myCustomFilter: FilterFn<unknown>;
	}
}

const column = columnHelper.accessor('key', {
	filterFn: 'myCustomFilter'
});

const table = useTable({
	columns: [column],
	filterFns: {
		myCustomFilter: (rows, ids, value) => {
			// Filtering logic
		}
	}
});
```

### globalFilterFn

```typescript
globalFilterFn?: FilterFn | keyof FilterFns | BuiltInFilterFn
```

Specifies the filter function for global filtering.

### enableGlobalFilter

```typescript
enableGlobalFilter?: boolean
```

Enables/disables the global filter for the table.

### getColumnCanGlobalFilter

```typescript
getColumnCanGlobalFilter?: (column: Column<TData>) => boolean
```

Determines if a column can be globally filtered.

---

## Column API

### getCanGlobalFilter

```typescript
getCanGlobalFilter(): boolean
```

Returns whether the column can be globally filtered.

---

## Row API

### columnFiltersMeta

```typescript
columnFiltersMeta: Record<string, any>;
```

Stores metadata from filter functions for each column.

---

## Table Options (Continued)

### filterFromLeafRows

```typescript
filterFromLeafRows?: boolean
```

Controls filtering direction (parent-first or leaf-first).

### maxLeafRowFilterDepth

```typescript
maxLeafRowFilterDepth?: number
```

Limits filtering depth for nested rows.

### enableFilters

```typescript
enableFilters?: boolean
```

Enables/disables all filters.

### manualFiltering

```typescript
manualFiltering?: boolean
```

Disables client-side filtering, useful for server-side handling.

### getFilteredRowModel

```typescript
getFilteredRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

Custom row model generator for filtered data.

---

## Table API

### getPreFilteredRowModel()

```typescript
getPreFilteredRowModel(): RowModel<TData>
```

Returns the row model before filtering.

### getFilteredRowModel()

```typescript
getFilteredRowModel(): RowModel<TData>
```

Returns the filtered row model.

### setGlobalFilter()

```typescript
setGlobalFilter(updater: Updater<any>): void
```

Updates the global filter state.

### resetGlobalFilter()

```typescript
resetGlobalFilter(defaultState?: boolean): void
```

Resets the global filter to its initial value.

### getGlobalAutoFilterFn()

```typescript
getGlobalAutoFilterFn(columnId: string): FilterFn<TData> | undefined
```

Returns the default filter function for a column.

### getGlobalFilterFn()

```typescript
getGlobalFilterFn(columnId: string): FilterFn<TData> | undefined
```

Returns the configured filter function for a column.

```

This documentation structure organizes the content into logical sections, includes all examples, and maintains the original information while improving readability. Each section is clearly separated with appropriate headers, and code examples are formatted using markdown code blocks.
```
