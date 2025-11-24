````markdown
# Column Pinning

## Can-Pin

A column can be pinned if the following conditions are met:

- `options.enablePinning` is not set to `false`
- `options.enableColumnPinning` is not set to `false`
- `columnDefinition.enablePinning` is not set to `false`

---

## State

Pinning state is stored in the table's state with the following structure:

```typescript
export type ColumnPinningPosition = false | 'left' | 'right';

export type ColumnPinningState = {
	left?: string[];
	right?: string[];
};

export type ColumnPinningTableState = {
	columnPinning: ColumnPinningState;
};
```
````

---

## Table Options

### enableColumnPinning

Type: `boolean`  
Enables or disables column pinning for all columns in the table.

### onColumnPinningChange

Type: `(updaterFn: (s: ColumnPinningState) => ColumnPinningState) => void`  
A callback triggered when the pinning state changes. Overrides internal state management. Requires manual state management via `state.columnPinning`.

---

## Column Def Options

### enablePinning

Type: `boolean`  
Enables or disables pinning for an individual column.

---

## Table API

### setColumnPinning

```typescript
setColumnPinning(updater: Updater<ColumnPinningState>): void;
```

Updates the column pinning state.

### resetColumnPinning

```typescript
resetColumnPinning(defaultState?: boolean): void;
```

Resets pinning to initial state. Pass `true` to reset to `{ left: [], right: [] }`.

### getIsSomeColumnsPinned

```typescript
getIsSomeColumnsPinned(position?: ColumnPinningPosition): boolean;
```

Checks if any columns are pinned. Optional `position` parameter to check a specific side.  
**Note:** Does not account for column visibility.

### Header/Column Groups

- `getLeftHeaderGroups()`: Returns left-pinned header groups.
- `getCenterHeaderGroups()`: Returns center (unpinned) header groups.
- `getRightHeaderGroups()`: Returns right-pinned header groups.
- Footer equivalents: `getLeftFooterGroups()`, `getCenterFooterGroups()`, `getRightFooterGroups()`.

### Flat Headers/Columns

- `getLeftFlatHeaders()`: All left-pinned headers (including parents).
- `getCenterFlatHeaders()`: All center headers.
- `getRightFlatHeaders()`: All right-pinned headers.
- Leaf variants: `getLeftLeafHeaders()`, `getCenterLeafHeaders()`, `getRightLeafHeaders()`.

### Leaf Columns

- `getLeftLeafColumns()`: Left-pinned leaf columns.
- `getCenterLeafColumns()`: Center leaf columns.
- `getRightLeafColumns()`: Right-pinned leaf columns.

---

## Column API

### getCanPin

```typescript
getCanPin(): boolean;
```

Returns whether the column can be pinned.

### getPinnedIndex

```typescript
getPinnedIndex(): number;
```

Returns the numeric index of the column within its pinned group.

### getIsPinned

```typescript
getIsPinned(): ColumnPinningPosition;
```

Returns the column's pinned position (`'left'`, `'right'`, or `false`).

### pin

```typescript
pin(position: ColumnPinningPosition): void;
```

Pins the column to a side or unpin by passing `false`.

---

## Row API

### getLeftVisibleCells

```typescript
getLeftVisibleCells(): Cell<TData>[];
```

Returns visible left-pinned cells in the row.

### getCenterVisibleCells

```typescript
getCenterVisibleCells(): Cell<TData>[];
```

Returns visible center (unpinned) cells.

### getRightVisibleCells

```typescript
getRightVisibleCells(): Cell<TData>[];
```

Returns visible right-pinned cells.

---

## Usage Example

```svelte
<script>
	import { useTable } from 'tanstack-table';

	const columns = [
		{ accessor: 'name', enablePinning: true },
		{ accessor: 'age', enablePinning: true },
		{ accessor: 'email', enablePinning: false }
	];

	const table = useTable({
		columns,
		data,
		enableColumnPinning: true
	});

	function togglePin(columnId, position) {
		const column = table.getColumn(columnId);
		column.pin(position);
	}
</script>

<button on:click={() => togglePin('name', 'left')}> Pin Name to Left </button>

{#each table.getLeftHeaderGroups() as headerGroup}
	<div>{headerGroup.headers.map((h) => h.id)}</div>
{/each}
```

---

## Notes

- Pinned state persists in `state.columnPinning`
- Use `getIsSomeColumnsPinned()` to check pin status
- Footer groups follow the same pinning logic as headers

```

This documentation maintains all original examples and technical details while organizing them into a structured format. The code snippets are preserved and formatted for clarity, with additional usage example added to demonstrate practical implementation. The note about visibility in `getIsSomeColumnsPinned` is explicitly called out in the documentation.
```
