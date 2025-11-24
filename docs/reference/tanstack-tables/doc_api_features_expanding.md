````markdown
# Expanding APIs

## State

### ExpandedState

The expanding state is stored on the table using the following shape:

```typescript
export type ExpandedState = true | Record<string, boolean>;

export type ExpandedTableState = {
	expanded: ExpandedState;
};
```
````

---

## Row API

### toggleExpanded

```typescript
toggleExpanded: (expanded?: boolean) => void
```

Toggles the expanded state of the row. If `expanded` is provided, sets the state to that value.

### getIsExpanded

```typescript
getIsExpanded: () => boolean;
```

Returns whether the row is currently expanded.

### getIsAllParentsExpanded

```typescript
getIsAllParentsExpanded: () => boolean;
```

Returns whether all parent rows of the row are expanded.

### getCanExpand

```typescript
getCanExpand: () => boolean;
```

Returns whether the row can be expanded.

### getToggleExpandedHandler

```typescript
getToggleExpandedHandler: () => () => void
```

Returns a function to toggle the expanded state of the row. Useful for binding to event handlers (e.g., buttons).

---

## Table Options

### manualExpanding

```typescript
manualExpanding?: boolean
```

Enables manual row expansion. When `true`, the table will not automatically expand rows; you must manage expansion in your own data model. Useful for server-side expansion.

### onExpandedChange

```typescript
onExpandedChange?: OnChangeFn<ExpandedState>
```

A callback triggered when the expanded state changes. If provided, you must manage the state externally and pass it back via `tableOptions.state.expanded`.

### autoResetExpanded

```typescript
autoResetExpanded?: boolean
```

When `true`, resets the expanded state when the underlying data changes.

### enableExpanding

```typescript
enableExpanding?: boolean
```

Enables or disables expanding for all rows.

### getExpandedRowModel

```typescript
getExpandedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

Defines how expanded rows are rendered. Use `getExpandedRowModel()` for the default behavior or provide a custom implementation.

### getIsRowExpanded

```typescript
getIsRowExpanded?: (row: Row<TData>) => boolean
```

Overrides the default logic for checking if a row is expanded.

### getRowCanExpand

```typescript
getRowCanExpand?: (row: Row<TData>) => boolean
```

Overrides the default logic for determining if a row can be expanded.

### paginateExpandedRows

```typescript
paginateExpandedRows?: boolean
```

- **`true`**: Expanded rows are paginated with the parent rows (may span multiple pages).
- **`false`**: Expanded rows always render on the parent's page (ignores pagination for children).

---

## Table API

### setExpanded

```typescript
setExpanded: (updater: Updater<ExpandedState>) => void
```

Updates the expanded state using a value or function.

### toggleAllRowsExpanded

```typescript
toggleAllRowsExpanded: (expanded?: boolean) => void
```

Toggles the expanded state for all rows. Optionally set a specific value.

### resetExpanded

```typescript
resetExpanded: (defaultState?: boolean) => void
```

Resets the expanded state to its initial value. If `defaultState` is provided, resets to an empty object `{}`.

### getCanSomeRowsExpand

```typescript
getCanSomeRowsExpand: () => boolean;
```

Returns whether any rows can be expanded.

### getToggleAllRowsExpandedHandler

```typescript
getToggleAllRowsExpandedHandler: () => (event: unknown) => void
```

Returns a handler to toggle all rows' expanded state. Intended for checkboxes.

### getIsSomeRowsExpanded

```typescript
getIsSomeRowsExpanded: () => boolean;
```

Returns whether any rows are currently expanded.

### getIsAllRowsExpanded

```typescript
getIsAllRowsExpanded: () => boolean;
```

Returns whether all rows are expanded.

### getExpandedDepth

```typescript
getExpandedDepth: () => number;
```

Returns the maximum depth of expanded rows.

### getExpandedRowModel

```typescript
getExpandedRowModel: () => RowModel<TData>;
```

Returns the row model after expansion is applied.

### getPreExpandedRowModel

```typescript
getPreExpandedRowModel: () => RowModel<TData>;
```

Returns the row model before expansion is applied.

---

## Examples

### Basic Usage

```svelte
<script>
  import { useTable } from '@tanstack/svelte-table';

  const columns = /* define columns */;
  const data = /* your data */;

  const table = useTable({
    data,
    columns,
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
  });
});
</script>

{#each table.getExpandedRowModel() as row}
	<div>
		{row.original.title}
		{#if row.getCanExpand()}
			<button on:click={row.getToggleExpandedHandler()}>
				{row.getIsExpanded() ? 'Collapse' : 'Expand'}
			</button>
		{/if}
	</div>
	{#if row.getIsExpanded()}
		<div>{row.subRows}</div>
	{/if}
{/each}
```

---

## Related Guides

- [Grouping](grouping.md)
- [Pagination](pagination.md)

```

This documentation format organizes the content into clear sections, includes all examples, and maintains the technical details while omitting non-technical sections like privacy notices. The code snippets are formatted with syntax highlighting, and key functions/options are described with their parameters and return types.
```
