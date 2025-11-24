# Svelte Table Adapter Documentation

## Overview

The `@tanstack/svelte-table` adapter wraps the core table logic to manage state in a Svelte-friendly way. It provides type definitions and rendering implementations for cells, headers, and footers.

---

## Installation

Install the adapter via npm or yarn:

```bash
npm install @tanstack/svelte-table
# or
yarn add @tanstack/svelte-table
```

---

## Getting Started

### `createSvelteTable`

Initialize the table instance with `createSvelteTable`:

```svelte
<script>
  import { createSvelteTable } from '@tanstack/svelte-table';  

  // Define your column definitions and data here  
  const columns = [...];  
  const data = [...];  

  const table = createSvelteTable({  
    columns,  
    data,  
    // Other options (e.g., state management, features)  
  });
</script>
```

_Example: [Edit on GitHub](https://github.com/tanstack/svelte-table) for full implementation details._

---

## Features

- **State Management**: Manages table state (sorting, filtering, etc.) using Svelte reactivity.
- **Type Safety**: Strong TypeScript support for column definitions and table instances.
- **Rendering**: Provides components for headers, footers, and cells.

---

## Examples

### Basic Usage

A minimal example of rendering a table:

```svelte
<!-- Table.svelte -->
<table>
	<thead>
		{#each table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th>{header.isPlaceholder ? null : header.column.header}</th>
				{/each}
			</tr>
			{#each headerGroup.headers as header}
				<td>
					{#each row.getCells() as cell}
						{cell.getValue()}
					{/each}
				</td>
			{/each}
		{/each}
	</thead>
	<tbody>
		{#each table.getRowModel().rows as row}
			<tr>
				{#each row.getCells() as cell}
					<td>{cell.getValue()}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
```

### Key Examples

- **Column Groups**: Group columns hierarchically.
- **Column Ordering**: Reorder columns dynamically.
- **Column Pinning**: Pin columns to the start/end of the table.
- **Filtering/Sorting**: Implement global or column-specific filters and sorters.
- **Pagination**: Control row display with pagination controls.

---

## API Reference

### Core APIs

- **`createSvelteTable(options)`**: Creates a table instance with Svelte-specific state management.
- **Column Definitions (`ColumnDef`)**: Define columns with headers, accessors, and metadata.
- **Table Instance**: Provides methods like `getTableInstance()` and state properties like `getRowModel()`.

### Feature-Specific APIs

- **Sorting**: Use `enableSorting` and `sortingFns` for custom sort logic.
- **Filtering**: Enable global or column-level filtering with `filterFns`.
- **Pagination**: Configure pagination with `pageSizeOptions` and `gotoPage()`.

---

## FAQ

**Q: How does state management work?**  
A: The adapter uses Svelte stores/reactivity to track state like sorting, filtering, and pagination.

**Q: Can I use this with SvelteKit?**  
A: Yes, the adapter is framework-agnostic and works with SvelteKit, SSR, and SPAs.

---

## Version & Framework Support

- **Framework**: Svelte (latest version)
- **Core Compatibility**: Works with TanStack Table Core v8.

For more details, refer to the [GitHub repository](https://github.com/tanstack/svelte-table).

---

_Note: This documentation focuses on the Svelte adapter. Core logic (e.g., `Row`, `Column`, `Header`) is inherited from TanStack Table Core._
