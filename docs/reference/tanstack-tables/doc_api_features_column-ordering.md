````markdown
# TanStack Table v8 - Column Ordering Guide (Svelte Adapter)

## Introduction

Column ordering in TanStack Table allows users to rearrange columns dynamically. This guide covers the state management, options, and APIs related to column ordering in the Svelte adapter.

---

## State

The column order state is stored in the table's state as an array of column IDs.

### `ColumnOrderTableState` Type

```typescript
export type ColumnOrderTableState = {
	columnOrder: ColumnOrderState;
};

export type ColumnOrderState = string[];
```
````

---

## Table Options

### `onColumnOrderChange`

A callback function triggered when the column order changes. Use this to manage state externally (e.g., persisting to a backend).

**Type:**

```typescript
onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
```

**Example Usage:**

```svelte
<script>
	let state = { columnOrder: [] };

	function handleColumnOrderChange(updater) {
		setState((prev) => ({
			...prev,
			columnOrder: updater(prev.columnOrder)
		}));
	}
</script>

<Table onColumnOrderChange={handleColumnOrderChange} {state} />
```

---

## Table API

### `setColumnOrder(updater)`

Updates the column order state.

**Parameters:**

- `updater`: A function or value to update the column order (e.g., `['id', 'name', 'age']`).

**Example:**

```svelte
<script>
	// Set a new column order
	table.setColumnOrder(['name', 'age', 'id']);

	// Update using a function
	table.setColumnOrder((old) => [...old, 'newColumn']);
</script>
```

### `resetColumnOrder(defaultState?)`

Resets the column order to its initial state or an empty array.

**Parameters:**

- `defaultState` (boolean): If `true`, resets to an empty array instead of the initial state.

**Example:**

```svelte
<button on:click={() => table.resetColumnOrder()}>Reset to Initial Order</button>
<button on:click={() => table.resetColumnOrder(true)}>Reset to Empty Order</button>
```

---

## Column API

### `getColumn.getIndex(position?)`

Gets the current index of the column in the visible columns list.

**Parameters:**

- `position?`: Optional pinning position (`'left'`, `'right'`) to scope the index to pinned columns.

**Example:**

```svelte
{#each table.getAllColumns() as column}
	<div>
		Index: {column.getIndex()}
		Pinned Left Index: {column.getIndex('left')}
	</div>
{/each}
```

### `getColumn.getIsFirstColumn(position?)`

Checks if the column is the first in the visible list or a pinned section.

**Example:**

```svelte
{#each table.getHeaderGroups() as headerGroup}
	<tr>
		{#each headerGroup.headers as header}
			<th>
				{header.isPlaceholder ? null : `Is First: ${header.column.getIsFirstColumn()}`}
			</th>
		{/each}
	</tr>
{/each}
```

### `getColumn.getIsLastColumn(position?)`

Checks if the column is the last in the visible list or a pinned section.

**Example:**

```svelte
{#each table.getFooterGroups() as footerGroup}
	<tr>
		{#each footerGroup.footer as footer}
			<td>
				{footer.isPlaceholder ? null : `Is Last: ${footer.column.getIsLastColumn()}`}
			</td>
		{/each}
	</tr>
{/each}
```

---

## Example Usage

### Basic Column Reordering

```svelte
<script>
	import { useTable } from '@tanstack/svelte-table';

	const columns = [{ accessorKey: 'id' }, { accessorKey: 'name' }, { accessorKey: 'age' }];

	const table = useTable({
		data,
		columns,
		state: {
			columnOrder: ['name', 'id', 'age']
		}
	});
</script>

<!-- Drag-and-drop implementation example -->
{#each table.getHeaders() as column}
	<div
		draggable
		on:dragstart={() => (draggingColumn = column)}
		on:dragover={(e) => e.preventDefault()}
		on:drop={() => {
			const newOrder = table.columnOrder
				.filter((id) => id !== draggingColumn.id)
				.slice(0, e.targetIndex)
				.concat([draggingColumn.id])
				.concat(table.columnOrder.slice(e.targetIndex));
			table.setColumnOrder(newOrder);
		}}
	>
		{column.id}
	</div>
{/each}
```

---

## Related Guides

- [Column Pinning](column-pinning.md)
- [Column Sizing](column-sizing.md)

```

This documentation structure organizes the information into clear sections, includes code examples, and maintains the original content's technical details while removing extraneous menu items and promotional text. All examples from the original text are preserved and formatted for clarity.
```
