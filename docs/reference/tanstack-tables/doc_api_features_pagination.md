```typescript
/* Pagination Documentation for TanStack Table v8 (Svelte) */

// State
/**
 * Represents the pagination state structure.
 */
export type PaginationState = {
	pageIndex: number;
	pageSize: number;
};

/**
 * The table state including pagination.
 */
export type PaginationTableState = {
	pagination: PaginationState;
};

/**
 * Initial state for pagination, allowing partial values.
 */
export type PaginationInitialTableState = {
	pagination?: Partial<PaginationState>;
};
```

---

### Table Options

#### `manualPagination`

```typescript
manualPagination?: boolean;
```

**Description**: Enables manual pagination. When `true`, the table expects manually paginated rows. Useful for server-side pagination.  
**Default**: `false`

---

#### `pageCount`

```typescript
pageCount?: number;
```

**Description**: Manually set the total page count. Use `-1` if unknown; `rowCount` can be used instead.  
**Default**: Calculated from `rowCount` and `pageSize`.

---

#### `rowCount`

```typescript
rowCount?: number;
```

**Description**: Total row count used to calculate `pageCount` internally.  
**Default**: Derived from the current data length.

---

#### `autoResetPageIndex`

```typescript
autoResetPageIndex?: boolean;
```

**Description**: Resets `pageIndex` to `0` when data/filtering changes.  
**Note**: Defaults to `false` if `manualPagination` is `true`.

---

#### `onPaginationChange`

```typescript
onPaginationChange?: OnChangeFn<PaginationState>;
```

**Description**: Callback for state changes. Use to manage external state via `tableOptions.state.pagination`.

---

#### `getPaginationRowModel`

```typescript
getPaginationRowModel?: (table: Table<TData>) => () => RowModel<TData>;
```

**Description**: Returns the row model after pagination is applied.

---

### Table API

#### `setPagination`

```typescript
setPagination(updater: Updater<PaginationState>): void;
```

**Description**: Updates pagination state using a value or function.

---

#### `resetPagination`

```typescript
resetPagination(defaultState?: boolean): void;
```

**Description**: Resets pagination to initial state. Use `defaultState: true` to reset to `0` pageIndex and default pageSize.

---

#### `setPageIndex`

```typescript
setPageIndex(updater: Updater<number>): void;
```

**Description**: Updates the current page index.

---

#### `resetPageIndex`

```typescript
resetPageIndex(defaultState?: boolean): void;
```

**Description**: Resets page index to initial value or `0` if `defaultState` is `true`.

---

#### `setPageSize`

```typescript
setPageSize(updater: Updater<number>): void;
```

**Description**: Adjusts the number of items per page.

---

#### `resetPageSize`

```typescript
resetPageSize(defaultState?: boolean): void;
```

**Description**: Resets page size to initial value or default `10` if `defaultState` is `true`.

---

#### `getPageOptions`

```typescript
getPageOptions(): number[];
```

**Description**: Returns an array of available page indices (zero-indexed).

---

#### `getCanPreviousPage`

```typescript
getCanPreviousPage(): boolean;
```

**Description**: Checks if a previous page is available.

---

#### `getCanNextPage`

```typescript
getCanNextPage(): boolean;
```

**Description**: Checks if a next page is available.

---

#### `previousPage`

```typescript
previousPage(): void;
```

**Description**: Moves to the previous page if possible.

---

#### `nextPage`

```typescript
nextPage(): void;
```

**Description**: Moves to the next page if possible.

---

#### `firstPage`

```typescript
firstPage(): void;
```

**Description**: Jumps to the first page (index `0`).

---

#### `lastPage`

```typescript
lastPage(): void;
```

**Description**: Jumps to the last available page.

---

#### `getPageCount`

```typescript
getPageCount(): number;
```

**Description**: Returns total pages. Uses `pageCount` option or calculates from `rowCount` and `pageSize`.

---

#### `getPrePaginationRowModel`

```typescript
getPrePaginationRowModel(): RowModel<TData>;
```

**Description**: Returns rows before pagination is applied.

---

#### `getPaginationRowModel`

```typescript
getPaginationRowModel(): RowModel<TData>;
```

**Description**: Returns rows after pagination is applied.

---

### Example Usage

```svelte
<script>
	import { useTable } from 'tanstack-table';

	const [state, setState] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

	const table = useTable({
		data,
		columns,
		manualPagination: true,
		rowCount: 100, // Total rows (e.g., from server)
		onPaginationChange: (newState) => setState(newState)
	});

	// Navigate to next page
	function nextPage() {
		table.nextPage();
	}
</script>

<button on:click={table.previousPage} disabled={!table.getCanPreviousPage()}> Previous </button>
<button on:click={table.nextPage} disabled={!table.getCanNextPage()}> Next </button>
```

---

### Notes

- **Manual Pagination**: When `manualPagination` is enabled, rows must be paginated externally before passing to the table.
- **State Management**: Use `onPaginationChange` to sync with external state (e.g., Redux, local storage).
- **Server-Side**: Pair `manualPagination` with `rowCount` to display correct page counts.

This documentation covers all pagination-related features, options, and methods for TanStack Table v8 in Svelte, including manual and automatic pagination workflows.
