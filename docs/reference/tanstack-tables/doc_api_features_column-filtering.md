````ts
// TanStack Table v8 Column Filtering Documentation

## Can-Filter
A column can be filtered if:
- It has a valid `accessorKey`/`accessorFn`.
- `column.enableColumnFilter` is not `false`.
- `options.enableColumnFilters` is not `false`.
- `options.enableFilters` is not `false`.

---

## State
Filter state is stored in the table's state as:
```ts
export interface ColumnFiltersTableState {
  columnFilters: ColumnFilter[];
}

export interface ColumnFilter {
  id: string;
  value: unknown;
}
````

---

## Filter Functions

### Built-in Filter Functions

- `includesString`: Case-insensitive string inclusion.
- `includesStringSensitive`: Case-sensitive string inclusion.
- `equalsString`: Case-insensitive equality.
- `equalsStringSensitive`: Case-sensitive equality.
- `arrIncludes`: Array inclusion.
- `arrIncludesAll`: All array items included.
- `arrIncludesSome`: Some array items included.
- `equals`: Referential equality (`===`).
- `weakEquals`: Loose equality (`==`).
- `inNumberRange`: Number range inclusion.

---

### FilterFn Type

```ts
export type FilterFn<TData extends AnyData> = {
	(row: Row<TData>, columnId: string, filterValue: any, addMeta: (meta: any) => void): boolean;
	resolveFilterValue?: TransformFilterValueFn<TData>;
	autoRemove?: ColumnFilterAutoRemoveTestFn<TData>;
};

export type CustomFilterFns<TData extends AnyData> = Record<string, FilterFn<TData>>;
```

---

### `filterFn.resolveFilterValue`

Transforms the filter value before applying it:

```ts
const exampleFilter: FilterFn = {
	// ...filter function
	resolveFilterValue: (value, column) => value.trim().toLowerCase()
};
```

---

### `filterFn.autoRemove`

Automatically removes filters with certain values:

```ts
const booleanFilter: FilterFn = {
	// ...filter function
	autoRemove: (value) => value === false
};
```

---

### Using Filter Functions

#### Built-in Usage

```ts
const column = columnHelper.accessor('name', {
	filterFn: 'includesString'
});
```

#### Custom Filter

```ts
// Define a custom filter
const myFilter: FilterFn = (row, id, value, addMeta) => {
	// Implementation
	return true;
};

// Use it in a column
const column = columnHelper.accessor('custom', {
	filterFn: myFilter
});
```

---

### Filter Meta Example

Using `addMeta` to store filter metadata for sorting:

```ts
import { sortingFns } from '@tanstack/react-table';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  if (rowA.columnFiltersMeta[columnId] && rowB.columnFiltersMeta[columnId]) {
    return compareItems(
      (rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
  }
  return sortingFns.alphanumeric(rowA, rowB, columnId);
};
```

---

## Column Definition Options

### `filterFn`

```ts
filterFn?: FilterFn | keyof FilterFns | BuiltInFilterFn;
```

### `enableColumnFilter`

```ts
enableColumnFilter?: boolean;
```

---

## Column API

### Methods

- `getCanFilter()`: Checks if filtering is enabled.
- `getFilterIndex()`: Returns the filter's index in `columnFilters`.
- `getIsFiltered()`: Checks if the column has active filters.
- `getFilterValue()`: Retrieves the current filter value.
- `setFilterValue(updater)`: Updates the filter value.
- `getAutoFilterFn()`: Gets the auto-detected filter function.
- `getFilterFn()`: Gets the current filter function.

---

## Row API

### Properties

- `columnFilters`: Map of filter pass/fail statuses.
- `columnFiltersMeta`: Stores metadata from filters.

---

## Table Options

### `filterFns`

Define custom filters:

```ts
declare module '@tanstack/table-core' {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
  }
}

const table = useTable({
  filterFns: {
    myCustomFilter: (row, id, value) => /* ... */,
  },
});
```

### `filterFromLeafRows`

```ts
filterFromLeafRows?: boolean;
```

### `maxLeafRowFilterDepth`

```ts
maxLeafRowFilterDepth?: number;
```

### `enableFilters`

```ts
enableFilters?: boolean;
```

### `manualFiltering`

```ts
manualFiltering?: boolean;
```

### `onColumnFiltersChange`

```ts
onColumnFiltersChange?: (updater: Updater<ColumnFiltersState>) => void;
```

### `enableColumnFilters`

```ts
enableColumnFilters?: boolean;
```

---

## Table API

### Methods

- `setColumnFilters(updater)`: Updates column filters.
- `resetColumnFilters(defaultState?)`: Resets filters.
- `getPreFilteredRowModel()`: Returns unfiltered rows.
- `getFilteredRowModel()`: Returns filtered rows.

---

## Example: Custom Filter Setup

```ts
// Define custom filter
const myFilter: FilterFn = (row, id, value, addMeta) => {
	// Logic here
	return true;
};

// Usage in column
const columns = [
	columnHelper.accessor('age', {
		filterFn: 'inNumberRange'
	}),
	columnHelper.accessor('tags', {
		filterFn: 'arrIncludes'
	})
];
```

---

## Important Notes

- **Server-Side Filtering**: Set `manualFiltering={true}` to handle filtering externally.
- **Metadata Usage**: Use `addMeta` to store sorting/ranking data during filtering.
- **State Management**: Use `setColumnFilters` to programmatically update filters.

For more details, refer to the official [TanStack Table documentation](https://tanstack.com/table).

```

This documentation structure organizes the technical details into clear sections, includes examples, and maintains the original API references while omitting non-technical content like privacy notices and navigation links.
```
