# TanStack Table v8 Svelte Example: Column Ordering

This example demonstrates how to implement column ordering, visibility, and dynamic data in a Svelte table using TanStack Table v8. It includes features like column reordering, visibility toggling, and data regeneration.

---

## Setup

### Dependencies

- `@tanstack/svelte-table`: Core table functionality
- `@faker-js/faker`: For generating mock data
- `svelte/store`: State management

---

## Code Documentation

### 1. Imports & Setup

```typescript
import { writable } from 'svelte/store';
import {
	getCoreRowModel,
	createSvelteTable,
	getSortedRowModel,
	flexRender
} from '@tanstack/svelte-table';
import { makeData, type Person } from './makeData';
import { faker } from '@faker-js/faker';
```

### 2. Column Definitions

```typescript
const columns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: 'firstName',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id
			},
			{
				accessorFn: (row) => row.lastName,
				id: 'lastName',
				header: () => 'Last Name',
				footer: (props) => props.column.id
			}
		]
	},
	{
		header: 'Info',
		footer: (props) => props.column.id,
		columns: [
			{ accessorKey: 'age', header: () => 'Age', footer: (props) => props.column.id },
			{
				header: 'More Info',
				columns: [
					{ accessorKey: 'visits', footer: (props) => props.column.id },
					{ accessorKey: 'status', footer: (props) => props.column.id },
					{
						accessorKey: 'progress',
						header: 'Profile Progress',
						footer: (props) => props.column.id
					}
				]
			}
		]
	}
];
```

### 3. State Management

```typescript
let columnOrder: ColumnOrderState = [];
let columnVisibility: VisibilityState = {};

const setColumnOrder: OnChangeFn<ColumnOrderState> = (updater) => {
	// Updates column order state
};

const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
	// Updates column visibility state
};

const options = writable<TableOptions<Person>>({
	data: makeData(5000),
	columns,
	state: { columnOrder, columnVisibility },
	onColumnOrderChange: setColumnOrder,
	onColumnVisibilityChange: setColumnVisibility,
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: getSortedRowModel(),
	debugTable: true
});

const table = createSvelteTable(options);
```

### 4. Utility Functions

```typescript
const randomizeColumns = () => {
	$table.setColumnOrder((old) =>
		faker.helpers.shuffle($table.getAllLeafColumns().map((d) => d.id))
	);
};

const regenerate = () => {
	options.update((opts) => ({ ...opts, data: makeData(5000) }));
};
```

---

## UI Components

### Column Visibility Controls

```svelte
<div class="inline-block border shadow rounded">
	<div class="px-1 border-b">
		<label>
			<input
				checked={$table.getIsAllColumnsVisible()}
				on:change={$table.getToggleAllColumnsVisibilityHandler()}
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

### Action Buttons

```svelte
<div class="flex gap-2">
	<button on:click={regenerate} class="border p-1">Regenerate</button>
	<button on:click={randomizeColumns} class="border p-1">Shuffle Columns</button>
</div>
```

### Table Rendering

```svelte
<table class="border-2">
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan}>
						{#if !header.isPlaceholder}
							{@const headerFn = header.column.columnDef.header}
							{#if headerFn}
								{flexRender(headerFn, header.getContext())}
							{/if}
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getCoreRowModel().rows.slice(0, 20) as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>{@html flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
```

---

## Key Features

### Column Ordering

- Columns can be reordered via `setColumnOrder`
- Uses `faker` to shuffle columns randomly

### Column Visibility

- Toggle individual columns using checkboxes
- Toggle all columns with the "Toggle All" checkbox

### Dynamic Data

- `regenerate` button refreshes data using `makeData(5000)`
- State persists across data regeneration

### Rendering

- Uses `flexRender` for rendering headers/cells
- Limits row display to first 20 rows for performance

---

## Styling (index.css)

```css
/* Example styling for table and controls */
.inline-block {
	display: inline-block;
}
.border {
	border: 1px solid #ccc;
}
.shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
/* ... (additional styles) */
```

---

## Usage

1. **Column Management**:

   - Toggle columns via checkboxes
   - Shuffle columns with "Shuffle Columns" button

2. **Data Management**:

   - Regenerate mock data with "Regenerate" button

3. **State Persistence**:
   - Column order/visibility stored in Svelte stores
   - State updates trigger reactive re-renders

---

## Example Output

```json
{
  "columnOrder": ["firstName", "lastName", "age", "visits", "status", "progress"],
  "columnVisibility": { "firstName": true, "lastName": true, ... }
}
```

---

## API References

- `createSvelteTable`: Creates a table instance with Svelte reactivity
- `flexRender`: Renders header/cell components
- `getCoreRowModel`: Core row data accessor
- `faker.helpers.shuffle`: Shuffles column order

---

This example demonstrates advanced column manipulation while maintaining reactivity and state management in Svelte. The code is fully interactive and demonstrates real-world usage of TanStack Table with Svelte's reactive stores.
