```svelte
<script lang="ts">
	// Import necessary functions and types from TanStack Table and Svelte
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		flexRender
	} from '@tanstack/svelte-table';
	import type { ColumnDef, OnChangeFn, SortingState, TableOptions } from '@tanstack/svelte-table';
	import { makeData, type Person } from './makeData';

	// Define column definitions with headers, footers, and accessors
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
				{
					accessorKey: 'age',
					header: () => 'Age',
					footer: (props) => props.column.id
				},
				{
					header: 'More Info',
					columns: [
						{ accessorKey: 'visits', header: () => 'Visits', footer: (props) => props.column.id },
						{ accessorKey: 'status', header: 'Status', footer: (props) => props.column.id },
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

	// Generate sample data
	const data = makeData(100_000);

	// State management for sorting
	let sorting: SortingState = [];
	const setSorting: OnChangeFn<SortingState> = (updater) => {
		sorting = typeof updater === 'function' ? updater(sorting) : updater;
		options.update((prev) => ({
			...prev,
			state: { ...prev.state, sorting }
		}));
	};

	// Configure the table options
	const options = writable<TableOptions<Person>>({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	// Table instance
	const table = createSvelteTable(options);

	// Utility functions
	const refreshData = () => {
		options.update(() => ({ data: makeData(100_000) }));
	};

	const rerender = () => {
		options.update((prev) => ({ ...prev, data }));
	};
</script>

<!-- Table structure -->
<table>
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colspan={header.colSpan}>
						{#if !header.isPlaceholder}
							<div
								on:click={header.column.getToggleSortingHandler()}
								class:cursor-pointer={header.column.getCanSort()}
								class:select-none={header.column.getCanSort()}
							>
								{#await flexRender(header.column.columnDef.header, header.getContext())}
									{flexRender(header.column.columnDef.header, header.getContext())}
								{/await}
								{#if header.column.getIsSorted() === 'asc'}
									🔼
								{:else if header.column.getIsSorted() === 'desc'}
									🔽
								{/if}
							</div>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows.slice(0, 10) as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>
						{#await flexRender(cell.column.columnDef.cell, cell.getContext())}
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						{/await}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		{#each $table.getFooterGroups() as footerGroup}
			<tr>
				{#each footerGroup.headers as header}
					<th colspan={header.colSpan}>
						{#if !header.isPlaceholder}
							{#await flexRender(header.column.columnDef.footer, header.getContext())}
								{flexRender(header.column.columnDef.footer, header.getContext())}
							{/await}
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</tfoot>
</table>

<!-- Controls and debug info -->
<div>{$table.getRowModel().rows.length} Rows</div>
<button on:click={rerender}>Force Rerender</button>
<button on:click={refreshData}>Refresh Data</button>
<pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
```

---

### Documentation for TanStack Table v8 Svelte Example: Sorting

#### Overview

This example demonstrates how to implement a sortable table using TanStack Table v8 with Svelte. It includes nested columns, sorting indicators, and dynamic data updates.

---

#### Key Components

1. **Column Definitions**

   - Define nested columns with `header`, `footer`, and `accessor` properties
   - Example of a nested column group:
     ```typescript
     {
       header: 'Name',
       footer: props => props.column.id,
       columns: [
         { accessorKey: 'firstName', cell: info => info.getValue() },
         {
           accessorFn: row => row.lastName,
           id: 'lastName',
           header: () => 'Last Name'
         }
       ]
     }
     ```

2. **Sorting State Management**

   - Uses Svelte's `writable` store to manage sorting state
   - Sorting logic handled via `onSortingChange` callback
   - Sorting indicators (🔼/🔽) displayed in headers

3. **Table Instance**
   - Created using `createSvelteTable` with:
     - Core row model
     - Sorting row model
     - Debug mode enabled

---

#### Usage

1. **Initialization**

   ```typescript
   const table = createSvelteTable({
   	data: makeData(100_000),
   	columns,
   	state: { sorting },
   	onSortingChange: setSorting,
   	getCoreRowModel: getCoreRowModel(),
   	getSortedRowModel: getSortedRowModel()
   });
   ```

2. **Rendering**
   - Headers:
     ```svelte
     <th on:click={header.column.getToggleSortingHandler()}>
     	{flexRender(header.column.columnDef.header, header.getContext())}
     	{#if header.column.getIsSorted() === 'asc'}🔼{:else if header.column.getIsSorted() === 'desc'}🔽{/if}
     </th>
     ```
   - Rows:
     ```svelte
     {#each $table.getRowModel().rows.slice(0, 10) as row}
       <tr>{@html row.getVisibleCells().map(cell => /* render cell */)}</tr>
     {/each}
     ```

---

#### Features Demonstrated

| Feature          | Implementation Details                         |
| ---------------- | ---------------------------------------------- |
| Sorting          | Clickable headers with visual indicators       |
| Nested Columns   | Multi-level column groups (Name/Info sections) |
| Dynamic Data     | `refreshData()` regenerates 100k rows          |
| State Management | Uses Svelte stores for reactive state updates  |

---

#### Example Workflow

1. **Sorting Interaction**

   - Clicking a header toggles sorting state
   - Sorting state is persisted in `sorting` store
   - Table re-renders with sorted data

2. **Data Refresh**
   - `refreshData()` generates new dataset
   - Table updates without losing current sorting state

---

#### Configuration Options

```typescript
// Table Options
{
  data: Person[],
  columns: ColumnDef<Person>[],
  state: { sorting: SortingState },
  onSortingChange: (updater: OnChangeFn<SortingState>) => void,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  debugTable: boolean
}
```

---

#### Helper Functions

1. **makeData(count: number): Person[]**

   - Generates sample data with properties: `firstName`, `lastName`, `age`, `visits`, `status`, `progress`

2. **flexRender()**
   - Renders header/cell/footer components dynamically
   - Used with `getContext()` to pass rendering context

---

#### Styling

- Basic table styling using CSS classes (example classes shown in template)
- Sorting indicators use Unicode arrows (🔼/🔽) for visual feedback

---

#### Debugging

- `debugTable: true` enables debug mode for easier state inspection
- Current sorting state displayed in JSON format at the bottom of the component

---

#### Performance Notes

- Handles 100k rows efficiently through virtualization (not explicitly shown here)
- Only renders first 10 rows in this example for demonstration purposes

---

#### Example Use Cases

1. **Basic Sorting**

   ```svelte
   <th on:click={header.column.toggleSorting()}>
   	{header.column.headerTitle}
   	{header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? '↑' : '↓') : ''}
   </th>
   ```

2. **Column Definitions**
   ```typescript
   // Example of a leaf column
   {
     accessorKey: 'visits',
     header: 'Visits',
     footer: props => props.column.id,
   }
   ```

---

#### API References

| Function/Method             | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `createSvelteTable()`       | Creates the table instance              |
| `getSortedRowModel()`       | Enables sorting functionality           |
| `flexRender()`              | Renders components based on column defs |
| `getToggleSortingHandler()` | Returns sorting toggle handler          |

---

#### Customization Points

1. **Column Headers**

   - Modify `header` functions to customize header content
   - Add sorting indicators via `getIsSorted()`

2. **Cell Formatting**

   - Customize `cell` functions for value formatting
   - Example: Add conditional styling based on cell values

3. **Footer Content**
   - Update `footer` functions in column definitions
   - Implement aggregation functions for footer values

```

```
