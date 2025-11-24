# Create Table Component

Create a new table component with **TanStack Table Core** following the team's table pattern documented in CLAUDE.md.

## Instructions

First, ask the user for:
1. **Table purpose** (what data is being displayed? e.g., "Claims list", "Users table")
2. **Data source** (database table name or API endpoint)
3. **Columns** (what columns to display with their types)
4. **Filters needed** (global search, status filters, date range, etc.)
5. **Pagination** (client-side or server-side? usually client-side for < 10k rows)
6. **Location** (e.g., `src/routes/dashboard/claims/+page.svelte`)

Then follow these steps:

---

## Step 1: Read the Table Pattern

Read the **Table Pattern (TanStack Table)** section from `.claude-team/CLAUDE.md`.

Key principles:
- Server loads data in `+page.server.ts`
- Client handles filtering/sorting with TanStack Table
- Use `TableFilterManager` for centralized filter logic
- Client-side for < 10k rows, server-side for > 10k rows

---

## Step 2: Create Server Load Function

Create or update `+page.server.ts` with data loading:

```typescript
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db'; // Adjust to your db import

export const load: PageServerLoad = async ({ locals }) => {
	try {
		// TODO: Adjust query based on your schema
		const items = await db.{tableName}.findMany({
			include: {
				// Add relations if needed
			},
			orderBy: {
				createdAt: 'desc' // Adjust default sorting
			}
		});

		return {
			items
		};
	} catch (error) {
		console.error('Failed to load {tableName}:', error);
		return {
			items: [],
			error: 'Failed to load data'
		};
	}
};
```

**Example (Claims table):**
```typescript
export const load: PageServerLoad = async ({ locals }) => {
	const claims = await db.claim.findMany({
		include: {
			policy: true,
			owner: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { claims };
};
```

---

## Step 3: Define TypeScript Types

Create types for your table data:

```typescript
import type { {TableName} } from '@prisma/client'; // Or your type source

// If using relations, create a type with relations
type {TableName}WithRelations = {TableName} & {
	// Add relation types
};
```

---

## Step 4: Define Column Configuration

In `+page.svelte`, define column definitions:

```svelte
<script lang="ts">
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { {DataType} } from './types'; // Adjust import

	let { data } = $props();

	const columns: ColumnDef<{DataType}>[] = [
		{
			accessorKey: '{fieldName}',
			header: '{Column Header}',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: '{anotherField}',
			header: '{Another Header}',
			cell: (info) => {
				const value = info.getValue();
				// Format value if needed
				return value;
			}
		},
		// Add more columns
		{
			id: 'actions',
			header: 'Actions',
			cell: (info) => {
				const row = info.row.original;
				// Return action buttons component
				return ''; // Use snippet or component
			}
		}
	];
</script>
```

**Example with formatting:**
```typescript
const columns: ColumnDef<Claim>[] = [
	{
		accessorKey: 'id',
		header: 'Claim ID',
		cell: (info) => `#${info.getValue()}`
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => {
			const status = info.getValue() as string;
			// Return badge component with status color
			return status;
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: (info) => {
			const date = info.getValue() as Date;
			return new Date(date).toLocaleDateString();
		}
	}
];
```

---

## Step 5: Create Table Filter Manager (if filters needed)

If filters are needed, create a filter manager class:

```typescript
class TableFilterManager {
	globalFilter = $state('');
	statusFilter = $state<string[]>([]);
	dateRange = $state<{ from: Date | null; to: Date | null }>({ from: null, to: null });

	get hasActiveFilters() {
		return (
			this.globalFilter !== '' ||
			this.statusFilter.length > 0 ||
			this.dateRange.from !== null
		);
	}

	clearFilters() {
		this.globalFilter = '';
		this.statusFilter = [];
		this.dateRange = { from: null, to: null };
	}

	// Add custom filter function if needed
	customFilter(row: any) {
		// Implement custom filtering logic
		return true;
	}
}

const filterManager = new TableFilterManager();
```

---

## Step 6: Create Table Instance

Set up the TanStack Table instance:

```svelte
<script lang="ts">
	import {
		createSvelteTable,
		getCoreRowModel,
		getFilteredRowModel,
		getSortedRowModel,
		getPaginationRowModel,
		flexRender
	} from '@tanstack/svelte-table';

	// ... columns definition ...

	const table = createSvelteTable({
		data: data.items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			get globalFilter() {
				return filterManager?.globalFilter ?? '';
			}
		},
		onGlobalFilterChange: (value) => {
			if (filterManager) {
				filterManager.globalFilter = typeof value === 'function' ? value(filterManager.globalFilter) : value;
			}
		},
		initialState: {
			pagination: {
				pageSize: 20 // Adjust page size
			}
		}
	});
</script>
```

---

## Step 7: Create Filter Toolbar (if needed)

Create filter UI components:

```svelte
<div class="flex items-center gap-4 mb-4">
	<!-- Global Search -->
	<div class="flex-1">
		<Input
			type="text"
			placeholder="Search..."
			bind:value={filterManager.globalFilter}
			class="max-w-sm"
		/>
	</div>

	<!-- Status Filter (example) -->
	<Select.Root bind:value={filterManager.statusFilter}>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Filter by status" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="active">Active</Select.Item>
			<Select.Item value="pending">Pending</Select.Item>
			<Select.Item value="completed">Completed</Select.Item>
		</Select.Content>
	</Select.Root>

	<!-- Clear Filters -->
	{#if filterManager.hasActiveFilters}
		<Button variant="ghost" onclick={() => filterManager.clearFilters()}>
			Clear Filters
		</Button>
	{/if}
</div>
```

---

## Step 8: Create Table Markup

Render the table:

```svelte
<div class="rounded-md border">
	<Table>
		<TableHeader>
			{#each table.getHeaderGroups() as headerGroup}
				<TableRow>
					{#each headerGroup.headers as header}
						<TableHead>
							{#if !header.isPlaceholder}
								<button
									class:cursor-pointer={header.column.getCanSort()}
									onclick={header.column.getToggleSortingHandler()}
								>
									{@render flexRender(header.column.columnDef.header, header.getContext())}
									{{
										asc: ' 🔼',
										desc: ' 🔽'
									}[header.column.getIsSorted() as string] ?? ''}
								</button>
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			{/each}
		</TableHeader>

		<TableBody>
			{#if table.getRowModel().rows.length}
				{#each table.getRowModel().rows as row}
					<TableRow>
						{#each row.getVisibleCells() as cell}
							<TableCell>
								{@render flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						{/each}
					</TableRow>
				{/each}
			{:else}
				<TableRow>
					<TableCell colspan={columns.length} class="h-24 text-center">
						No results found.
					</TableCell>
				</TableRow>
			{/if}
		</TableBody>
	</Table>
</div>
```

---

## Step 9: Add Pagination (if needed)

Add pagination controls:

```svelte
<div class="flex items-center justify-between px-2 py-4">
	<div class="text-sm text-muted-foreground">
		Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to
		{Math.min(
			(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
			table.getFilteredRowModel().rows.length
		)}
		of {table.getFilteredRowModel().rows.length} results
	</div>

	<div class="flex items-center space-x-2">
		<Button
			variant="outline"
			size="sm"
			onclick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			onclick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			Next
		</Button>
	</div>
</div>
```

---

## Complete Example Structure

```svelte
<script lang="ts">
	import { createSvelteTable, /* ... */ } from '@tanstack/svelte-table';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	// Filter Manager
	class TableFilterManager {
		globalFilter = $state('');
		// ... other filters
	}
	const filterManager = new TableFilterManager();

	// Column Definitions
	const columns = [/* ... */];

	// Table Instance
	const table = createSvelteTable({/* ... */});
</script>

<!-- Filter Toolbar -->
<div class="mb-4">
	<!-- Filters -->
</div>

<!-- Table -->
<div class="rounded-md border">
	<Table.Root>
		<!-- Header & Body -->
	</Table.Root>
</div>

<!-- Pagination -->
<div class="mt-4">
	<!-- Pagination controls -->
</div>
```

---

## Important Notes

### ✅ Best Practices:
- Client-side filtering for < 10k rows
- Server-side pagination for > 10k rows
- Use `TableFilterManager` for complex filtering
- Implement global search + column-specific filters
- Add clear filters button when filters are active
- Show row count and pagination info
- Make column headers sortable where appropriate

### ❌ Avoid:
- Loading too much data client-side (> 10k rows)
- Blocking UI during data loads
- Not showing loading states
- Missing error handling
- Not handling empty states

---

## Pattern Reference

See `.claude-team/CLAUDE.md` > Component Patterns > Table Pattern (TanStack Table)

---

## Summary

After completing these steps, you will have:
1. ✅ Server-side data loading in `+page.server.ts`
2. ✅ Column definitions with proper typing
3. ✅ TanStack Table instance configured
4. ✅ Filter toolbar (if needed)
5. ✅ Table markup with sorting
6. ✅ Pagination controls
7. ✅ Clean, performant table implementation
