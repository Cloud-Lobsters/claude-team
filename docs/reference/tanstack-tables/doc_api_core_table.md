````markdown
# TanStack Table v8 Svelte Adapter Documentation

## Options

### `data`

- **Type**: `TData[]`
- **Description**: The data array to display. Changes trigger reprocessing of the table.
- **Example**:
  ```typescript
  // Ensure data stability to avoid unnecessary re-renders
  const [data, setData] = useState(initialData);
  ```
````

### `columns`

- **Type**: `ColumnDef<TData>[]`
- **Description**: Column definitions defining headers, cells, and footers.

### `defaultColumn`

- **Type**: `Partial<ColumnDef<TData>>`
- **Description**: Default settings for all columns (e.g., sorting, filtering).

### `initialState`

- **Type**: `Partial<TableState>`
- **Description**: Initial state for features like sorting, pagination, etc.

### `autoResetAll`

- **Type**: `boolean`
- **Description**: Whether to auto-reset all state features on data/column changes.

### `meta`

- **Type**: `TableMeta`
- **Description**: Arbitrary metadata accessible via `table.options.meta`.

### `state`

- **Type**: `Partial<TableState>`
- **Description**: Manually controlled state (overrides internal state).

### `onStateChange`

- **Type**: `(updater: Updater<TableState>) => void`
- **Description**: Callback for state changes when manually managing state.

### Debugging Options

- **`debugAll`, `debugTable`, `debugHeaders`, `debugColumns`, `debugRows`**  
  Enable debug logs for different components (only in dev mode).

---

## Table API

### `initialState`

- **Type**: `TableState`  
  The resolved initial state of the table.

### `reset()`

- **Description**: Resets the table to its initial state.

### `getState()`

- **Returns**: `TableState`  
  Gets the current merged state (internal + manual state).

### `setState(updater)`

- **Parameters**: `(prevState) => newState` or `Partial<TableState>`  
  Updates the table state.

### `getCoreRowModel()`

- **Returns**: Core row model (pre-processed data).

### `getRowModel()`

- **Returns**: Final row model (post-processing).

### `getAllColumns()`

- **Returns**: All columns (including nested groups).

### `getHeaderGroups()`

- **Returns**: Header groups for rendering.

### `getFlatHeaders()`

- **Returns**: Flattened headers (including parents).

### `getLeafHeaders()`

- **Returns**: Only leaf (non-grouped) headers.

---

## Example Usage

### Basic Setup

```svelte
<script>
	import { createTable } from '@tanstack/svelte-table';

	const columns = [
		// Column definitions
	];

	const table = createTable({
		data,
		columns
		// Options...
	});
</script>

{#each table.getRowModel().rows as row}
	<!-- Render rows -->
{/each}
```

### Controlling State Manually

```typescript
// Using onStateChange to sync state externally
function handleStateChange(newState) {
	localStorage.setItem('tableState', JSON.stringify(newState));
}

const table = createTable({
	onStateChange: handleStateChange,
	state: JSON.parse(localStorage.getItem('tableState') || '{}')
});
```

---

## Features

### Core Row Model

- **`getCoreRowModel()`**: Raw data without feature processing.
- **`getRowModel()`**: Final data after sorting, filtering, etc.

### State Management

- **Auto-reset**: Features like pagination reset on data changes if `autoResetPageIndex` is enabled.
- **Custom IDs**: Use `getRowId` to define stable row identifiers.

---

## Advanced Options

### `getSubRows`

```typescript
// For nested rows
const getSubRows = (row, index) => row.children;
```

### `getRowId`

```typescript
// Stable row IDs
const getRowId = (row, index, parent) => row.id || `${parent?.id}-${index}`;
```

---

## API Reference

### `createTable(options)`

- **Parameters**: Table options (data, columns, etc.)
- **Returns**: Table instance with methods like `getTableInstance()`.

### `ColumnDef<TData>`

- **Properties**:
  - `accessorKey`: Data accessor path (e.g., `user.name`).
  - `header`: Header component/renderer.
  - `cell`: Cell component/renderer.

---

## Notes

- **Performance**: Avoid re-creating `columns` or `data` on every render to prevent unnecessary re-renders.
- **State Persistence**: Use `initialState` for default values and `state` for manual control.
- **Debugging**: Enable debug logs with `debugAll={true}` for development troubleshooting.

```

This documentation structure organizes the provided content into clear sections, highlights key options and methods, includes code examples, and maintains the original warnings/notes. All examples from the input are preserved, and the formatting ensures readability with proper syntax highlighting for code snippets.
```
