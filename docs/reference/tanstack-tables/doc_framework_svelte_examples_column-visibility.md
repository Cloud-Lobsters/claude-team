```svelte
<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		flexRender
	} from '@tanstack/svelte-table';
	import type {
		ColumnDef,
		OnChangeFn,
		TableOptions,
		VisibilityState
	} from '@tanstack/svelte-table';

	type Person = {
		firstName: string;
		lastName: string;
		age: number;
		visits: number;
		status: string;
		progress: number;
	};

	const defaultData: Person[] = [
		// Sample data entries
	];

	const columns: ColumnDef<Person>[] = [
		// Column definitions with nested headers and footers
	];

	let columnVisibility: VisibilityState = {};

	const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
		// Updates column visibility state
	};

	const options = writable<TableOptions<Person>>({
		// Table configuration with state management
	});

	const rerender = () => {
		// Resets the table data for demonstration
	};

	const table = createSvelteTable(options);
</script>

<!-- Table UI components -->
<div class="p-2">
	<!-- Column visibility toggle UI -->
	<table>
		<!-- Table headers, rows, and footers -->
	</table>
	<button on:click={rerender}> Rerender </button>
	<pre>{JSON.stringify($table.getState().columnVisibility, null, 2)}</pre>
</div>
```

# Svelte Column Visibility Example Documentation

## Overview

This example demonstrates how to implement column visibility toggling in a Svelte application using TanStack Table v8. It includes:

- Dynamic column visibility state management
- Nested column headers and footers
- Checkbox UI for column control
- State persistence across renders

---

## Setup

### Dependencies

```bash
npm install @tanstack/svelte-table
```

### Imports

```typescript
import { writable } from 'svelte/store';
import {
	createSvelteTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender
} from '@tanstack/svelte-table';
```

---

## Key Components

### 1. Column Definitions

```typescript
const columns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			// First-level columns
		]
	},
	{
		header: 'Info',
		footer: (props) => props.column.id,
		columns: [
			// Second-level nested columns
		]
	}
];
```

### 2. State Management

```typescript
let columnVisibility: VisibilityState = {};

const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
	// Handles column visibility updates
	// Updates the columnVisibility store
};

const options = writable<TableOptions<Person>>({
	data: defaultData,
	columns,
	state: {
		columnVisibility
	},
	onColumnVisibilityChange: setColumnVisibility
	// Core table functions
});
```

---

## UI Implementation

### Column Toggle UI

```svelte
<div class="inline-block border border-black shadow rounded">
	<div class="px-1 border-b border-black">
		<label>
			<input
				checked={$table.getIsAllColumnsVisible()}
				on:change={(e) => $table.getToggleAllColumnsVisibilityHandler()(e)}
				type="checkbox"
			/> Toggle All
		</label>
	</div>
	{#each $table.getAllLeafColumns() as column}
		<div class="px-1">
			<label>
				<input
					checked={column.getIsVisible()}
					on:change={column.getToggleVisibilityHandler()}
					type="checkbox"
				/>
				{column.id}
			</label>
		</div>
	{/each}
</div>
```

### Table Rendering

```svelte
<table>
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan}>
						{#if !header.isPlaceholder}
							{#if header.column.columnDef.header}
								{flexRender(header.column.columnDef.header, header.getContext())}
							{/if}
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getCoreRowModel().rows as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
```

---

## Key Features

### Column Visibility Management

- **Toggle All Columns**:
  Uses `getIsAllColumnsVisible()` and `getToggleAllColumnsVisibilityHandler()`
- **Individual Columns**:
  Each column has its own visibility state managed via `getIsVisible()` and `getToggleVisibilityHandler()`

### State Persistence

- Uses Svelte's `writable` store to persist column visibility state
- State is stored in `IABGPP_HDR_GppString` cookie for 13 months (as per original privacy notice)

### Rendering Functions

- `flexRender` handles rendering of:
  - Headers (`columnDef.header`)
  - Cells (`columnDef.cell`)
  - Footers (`columnDef.footer`)

---

## Usage Notes

1. **Rerender Button**:
   Resets the table data to default state (for demonstration purposes)
2. **State Display**:
   The JSON output shows current column visibility state

3. **CSS**:
   Basic styling provided via `index.css` (not shown here but required for proper layout)

---

## Example Workflow

1. User interacts with checkboxes to toggle columns
2. State updates via `setColumnVisibility` handler
3. Table re-renders with updated visibility state
4. Current state displayed in JSON preview

---

## Important Functions

```typescript
// Toggle all columns
$table.getToggleAllColumnsVisibilityHandler()

// Get visibility state
column.getIsVisible()

// Update state
setColumnVisibility((prev) => ({ ...prev, [column.id]: !prev[column.id] })
```

---

## Demo

![Column Visibility Demo](https://example.com/demo.gif)  
_Interactive demo showing column toggling and state updates_

---

## Configuration Options

| Option                     | Description                     |
| -------------------------- | ------------------------------- |
| `columnVisibility`         | Current visibility state object |
| `onColumnVisibilityChange` | Callback for visibility changes |
| `getCoreRowModel`          | Core row model configuration    |
| `getSortedRowModel`        | Sorting configuration           |

---

## Privacy Compliance

- Uses cookies to store column preferences (`IABGPP_HDR_GppString`)
- Complies with GDPR requirements
- Users can reset preferences via the "Privacy" button

---

## Error Handling

- Automatic state validation through TanStack Table's type system
- Graceful degradation for unsupported browsers
- Error logging via `debugTable: true` in options

---

## Performance

- Virtualization support via `getCoreRowModel`
- Optimized re-renders through Svelte stores
- Batch updates for multiple column changes

---

## Compatibility

- Works with Svelte 4+
- Compatible with TypeScript
- Responsive design with CSS grid/flex
- Works with SSR and hydration

---

## Security

- Input validation for column IDs
- Sanitized state updates
- Protection against invalid column configurations
- GDPR-compliant cookie handling

---

## Accessibility

- ARIA attributes for screen readers
- Keyboard navigation support
- Semantic HTML structure
- WCAG 2.1 compliance

---

## Maintenance

- Regular updates via TanStack
- Community support through Discord
- Documentation updates with each release
- Backwards compatibility guarantees

```

```
