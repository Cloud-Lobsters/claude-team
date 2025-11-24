# Data Table

Powerful table and datagrids built using TanStack Table.

---

## Installation

Add the `<Table />` component to your project along with the data-table helpers. These helpers enable TanStack Table v8 to work with Svelte 5 Snippets, Components, etc.

```bash
pnpm dlx shadcn-svelte@latest add table data-table
```

Add `@tanstack/table-core` as a dependency:

```bash
pnpm i @tanstack/table-core
```

---

## Introduction

Data tables are difficult to componentize because of the wide variety of features they support, and the uniqueness of every data set. We'll start with a basic table and build up to a fully-featured example.

---

## Table of Contents

- [Installation](#installation)
- [Column Definitions](#column-definitions)
- [Basic Table](#basic-table)
- [Cell Formatting](#cell-formatting)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)
- [Reusable Components](#reusable-components)

---

## Column Definitions

Define columns using `ColumnDef` from `@tanstack/table-core`:

```typescript
// columns.ts
import type { ColumnDef } from '@tanstack/table-core';

export type Payment = {
	id: string;
	amount: number;
	status: 'Pending' | 'Processing' | 'Success' | 'Failed';
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'amount',
		header: 'Amount'
	}
];
```

---

## Basic Table

### `<DataTable />` Component

```svelte
<!-- data-table.svelte -->
<script lang="ts">
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table';
	import * as Table from '$lib/components/ui/table';

	type DataTableProps<TData, TValue> = {
		data: TData[];
		columns: ColumnDef<TData, TValue>[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	const table = createSvelteTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups as headerGroup}
				<Table.Row>
					{#each headerGroup.headers as header}
						<Table.Head colspan={header.colSpan}>
							<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row}
				<Table.Row>
					{#each row.getVisibleCells() as cell}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
```

---

## Cell Formatting

Format cells using `createRawSnippet` and `renderSnippet`:

```typescript
// columns.ts
import { createRawSnippet, renderSnippet } from "$lib/components/ui/data-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: () => {
      const headerSnippet = createRawSnippet(() => ({
        render: () => `<div class="text-right">Amount</div>`
      }));
      return renderSnippet(headerSnippet, "");
    },
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
      return renderSnippet(
        createRawSnippet((getAmount) => ({
          render: () => `<div class="text-right font-medium">${getAmount()}</div>`
        }),
        formatter.format(row.getValue("amount"))
      );
    },
  },
];
```

---

## Row Actions

### Create Actions Component

```svelte
<!-- data-table-actions.svelte -->
<script>
	import { DropdownMenu } from '$lib/components/ui/dropdown-menu';
	import { EllipsisIcon } from '@lucide/svelte/icons';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<button class="relative size-8 p-0">
			<EllipsisIcon />
		</button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item>View Details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
```

Add to columns:

```typescript
// columns.ts
{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id }),
}
```

---

## Pagination

### Update `<DataTable />`

```svelte
<script>
  let pagination = $state({ pageIndex: 0, pageSize: 10 });

  const table = createSvelteTable({
    // ... existing config
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination;
      } else {
        pagination = updater;
      }
    },
  });
</script>

<!-- Pagination Controls -->
<Button on:click={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
	Previous
</Button>
<Button on:click={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
```

---

## Sorting

### Define Sortable Header

```svelte
<!-- data-table-email-button.svelte -->
<script>
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDownIcon } from '@lucide/svelte/icons';
</script>

<Button on:click={column.getToggleSortingHandler()}>
	Email
	<ArrowUpDownIcon class="ml-2" />
</Button>
```

---

## Filtering

Add a filter input:

```svelte
<Input
  placeholder="Filter emails..."
  value={table.getColumn("email")?.getFilterValue() ?? ""}
  on:input={(e) => table.getColumn("email")?.setFilterValue(e.currentTarget.value}
/>
```

---

## Visibility

Add a column visibility toggle:

```svelte
<DropdownMenu.Root>
	<DropdownMenu.Content>
		{#each table.getAllColumns().filter((col) => col.getCanHide()) as column}
			<DropdownMenu.CheckboxItem
				bind:checked={column.getIsVisible()}
				on:change={() => column.toggleVisibility()}
			>
				{column.id}
			</DropdownMenu.CheckboxItem>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
```

---

## Row Selection

Add selection column:

```typescript
// columns.ts
{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      on:change={() => table.toggleAllPageRowsSelected()}
    />
  ),
  cell: ({ row }) => (
    <Checkbox checked={row.getIsSelected()} on:change={() => row.toggleSelected()} />
  ),
}
```

---

## Reusable Components

### DataTable Checkbox

```svelte
<!-- data-table-checkbox.svelte -->
<script>
	import { Checkbox } from '$lib/components/ui/checkbox';
</script>

<Checkbox {checked} {indeterminate} on:checkedChange={onCheckedChange} aria-label="Select row" />
```

---

## Project Structure

```plaintext
routes
└── payments
    ├── columns.ts
    ├── data-table.svelte
    ├── data-table-actions.svelte
    ├── data-table-checkbox.svelte
    ├── data-table-email-button.svelte
    └── +page.svelte
```

---

## Full Example

```svelte
<script>
	// Full implementation with all features
	// (See code in original example for complete implementation)
</script>
```

---

## API

### `createSvelteTable`

```typescript
createSvelteTable({
  data: TData[],
  columns: ColumnDef[],
  // ... TanStack Table options
});
```

---

## Tips

- Use `FlexRender` to render custom components in headers/cells
- Use `createRawSnippet` for simple HTML snippets
- Use `renderComponent` to render Svelte components

---

## Contributing

This component was ported to Svelte by [Huntabyte](https://github.com/huntabyte) and [CokaKoala](https://github.com/cokakola). Contributions welcome!
