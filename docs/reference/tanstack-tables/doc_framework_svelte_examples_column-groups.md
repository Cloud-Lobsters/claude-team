````markdown
# Svelte Example: Column Groups

This example demonstrates how to create a table with nested column groups using TanStack Table v8 and Svelte.

---

## Overview

This example showcases:

- Nested column groups with headers and footers
- Dynamic rendering of headers, rows, and footers
- Svelte store integration for reactive updates
- TypeScript support with column definitions

---

## Setup

### Dependencies

```bash
npm install @tanstack/svelte-table
```
````

### Key Imports

```typescript
import { writable } from 'svelte/store';
import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
```

---

## Usage

### Column Definitions

```typescript
const defaultColumns: ColumnDef<Person>[] = [
	{
		header: 'Name',
		footer: (props) => props.column.id,
		columns: [
			{ accessorKey: 'firstName', cell: (info) => info.getValue() },
			{
				accessorFn: (row) => row.lastName,
				id: 'lastName',
				header: () => 'Last Name'
			}
		]
	},
	{
		header: 'Info',
		footer: (props) => props.column.id,
		columns: [
			{ accessorKey: 'age', header: () => 'Age' },
			{
				header: 'More Info',
				columns: [
					{ accessorKey: 'visits', header: () => 'Visits' },
					{ accessorKey: 'status', header: 'Status' },
					{ accessorKey: 'progress', header: 'Profile Progress' }
				]
			}
		]
	}
];
```

### Table Initialization

```typescript
const options = writable<TableOptions<Person>>({
	data: defaultData,
	columns: defaultColumns,
	getCoreRowModel: getCoreRowModel()
});

const table = createSvelteTable(options);
```

---

## Example Code

### App.svelte

```svelte
<script lang="ts">
	// ... (imports and data definitions)

	const rerender = () => {
		options.update((options) => ({ ...options, data: defaultData }));
	};

	const table = createSvelteTable(options);
</script>

<div class="p-2">
	<table>
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colspan={header.colSpan} class={header.column.className}>
							{#if !header.isPlaceholder}
								{@html flexRender(header.column.columnDef.header, header.getContext())}
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td>{@html flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th colspan={header.colSpan}>
							{@html flexRender(header.column.columnDef.footer, header.getContext())}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
	<button on:click={rerender} class="border p-2">Rerender</button>
</div>
```

---

## Key Features

### Nested Column Groups

- Parent headers like "Name" and "Info" create hierarchical column groups
- Child columns are defined under the `columns` property of parent columns
- Automatic colspan management via `header.colSpan`

### Footer Rendering

- Footers use the same pattern as headers
- Access column ID in footer components: `props.column.id`

### Dynamic Updates

- Uses Svelte stores for reactive updates
- Rerender button triggers data refresh while preserving state

---

## CSS (index.css)

```css
/* Basic table styling example */
table {
	width: 100%;
	border-collapse: collapse;
}

th,
td {
	border: 1px solid #ddd;
	padding: 12px;
	text-align: left;
}

th {
	background-color: #f5f5f5;
}
```

---

## Explanation

1. **Column Definitions**:

   - Parent columns contain `columns` arrays for child columns
   - `accessorKey`/`accessorFn` define data access patterns
   - `header`/`footer` slots for custom rendering

2. **Table Creation**:

   - Uses reactive `writable` store for dynamic updates
   - `createSvelteTable` initializes the table instance

3. **Rendering Logic**:

   - `getHeaderGroups()` renders hierarchical headers
   - `getFooterGroups()` handles footer rendering
   - `flexRender` renders header/cell/footer components

4. **Reactivity**:
   - `rerender` function demonstrates data refresh
   - Automatic reactivity through Svelte stores

---

## Running the Example

1. Install dependencies
2. Update `index.css` with desired styling
3. Mount the component in your app
4. Test dynamic updates using the "Rerender" button

This implementation provides a fully functional table with nested column groups while maintaining reactivity and TypeScript support.

```

This documentation maintains all original examples and code while adding explanations and structure. The key components and patterns are highlighted with code excerpts and explanations of important concepts like column grouping, reactivity, and rendering logic.
```
