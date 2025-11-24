````markdown
# Svelte Example: Column Pinning and Visibility Control

This example demonstrates how to implement column pinning, ordering, and visibility control using TanStack Table v8 in a Svelte application. The example includes dynamic UI elements for toggling column visibility, pinning columns to left/right, and shuffling column order.

---

## Setup

### Dependencies

```bash
npm install @tanstack/svelte-table @faker-js/faker
```
````

### Imports

```typescript
import { writable } from 'svelte/store';
import {
	createSvelteTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender
} from '@tanstack/svelte-table';
import type {
	ColumnDef,
	ColumnOrderState,
	ColumnPinningState,
	OnChangeFn,
	TableOptions
} from '@tanstack/svelte-table';
import { makeData, type Person } from './makeData';
import { faker } from '@faker-js/faker';
```

---

## Column Definitions

```typescript
const columns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			{ accessorKey: 'firstName', cell: (info) => info.getValue() },
			{
				accessorFn: (row) => row.lastName,
				id: 'lastName',
				header: () => 'Last Name',
				footer: (props) => props.column.id
			}
		]
	}
	// ... other column definitions
];
```

---

## State Management

```typescript
let columnOrder: ColumnOrderState = [];
let columnPinning: ColumnPinningState = {};
let columnVisibility: VisibilityState = {};

// State update handlers
const setColumnOrder: OnChangeFn<ColumnOrderState> = (updater) => {
	// Update logic
};

// Similar handlers for pinning and visibility
```

---

## Table Initialization

```typescript
const options = writable<TableOptions<Person>>({
	data: makeData(5000),
	columns,
	state: { columnOrder, columnPinning, columnVisibility },
	onColumnOrderChange: setColumnOrder
	// ... other options
});

const table = createSvelteTable(options);
```

---

## Key Features

### Column Pinning Controls

```svelte
{#each headerGroup.headers as header}
	<div class="flex gap-1 justify-center">
		{#if !header.isPlaceholder && header.column.getCanPin()}
			<button on:click={() => header.column.pin('left')}>
				{'<='}
			</button>
			<button on:click={() => header.column.pin(false)}> X </button>
			<button on:click={() => header.column.pin('right')}> '=>' </button>
		{/if}
	</div>
{/each}
```

### Column Visibility Controls

```svelte
<div class="px-1">
	<label>
		<input
			checked={$table.getIsAllColumnsVisible()}
			on:change={(e) => $table.getToggleAllColumnsVisibilityHandler()(e)}
			type="checkbox"
		/>
		Toggle All
	</label>
</div>
```

---

## UI Components

### Column Visibility Panel

```svelte
<div class="inline-block border border-black shadow rounded">
	<div class="px-1 border-b border-black">Toggle Columns</div>
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
<table class="border-2 border-black">
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan}>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getCoreRowModel().rows.slice(0, 20) as row}
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

## Key Features Explained

### Dynamic Column Order

```typescript
const randomizeColumns = () => {
  $table.setColumnOrder(
    (old => faker.helpers.shuffle($table.getAllLeafColumns().map(d => d.id)))
}
```

### Split View Mode

```svelte
{#if isSplit}
  <!-- Left table section -->
{#else}
  <!-- Full-width table -->
{/if}
```

---

## Styling

```css
/* Example styles from index.css */
.table-container {
	display: flex;
	gap: 1rem;
}

th {
	padding: 8px;
	background: #f0f0f0;
}

td {
	padding: 4px;
}
```

---

## Usage

1. **Column Pinning**: Click the `<=>`/`X`/`=>` buttons to pin columns
2. **Visibility**: Check/uncheck columns in the control panel
3. **Split View**: Toggle between split and single-table views
4. **Regenerate Data**: Button to refresh sample data
5. **Shuffle Columns**: Randomize column order

---

## Full Example Code

```svelte
<!-- App.svelte -->
<script>
	// ... (all script code from the example)
</script>

<!-- Full HTML template from the example -->
```

---

## Key APIs Used

| Feature           | TanStack API                        |
| ----------------- | ----------------------------------- |
| Core Row Model    | getCoreRowModel()                   |
| Column Pinning    | column.pin()                        |
| Column Visibility | column.getToggleVisibilityHandler() |
| Dynamic Rendering | flexRender()                        |

---

## Demo Features

- Real-time column visibility updates
- Persistent column order/pin state
- Responsive column pinning controls
- Dynamic data regeneration
- Split view mode for pinned columns
- 5000 row dataset rendering

```

This documentation structure provides a clear breakdown of the example's components, key features, and implementation details while preserving all original code examples. The explanations highlight important patterns like state management, dynamic rendering, and reactive updates in Svelte with TanStack Table.
```
