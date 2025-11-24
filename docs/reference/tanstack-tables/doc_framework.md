````markdown
# TanStack Table Documentation

## Introduction

TanStack Table is a powerful, flexible, and performant table library for modern JavaScript frameworks. It provides core features like sorting, filtering, and pagination, along with framework-specific adapters for seamless integration.

---

## Supported Frameworks

TanStack Table supports the following frameworks:

- **React**
- **Vue**
- **Angular**
- **Solid**
- **Lit**
- **Svelte**
- **Qwik**
- **Vanilla JS**

---

## Features

### Core Features

- **Column Definitions (Column Defs):** Define columns with customizable headers, cells, and metadata.
- **Row Models:** Manage row data with built-in or custom row models.
- **Global Filtering:** Search across all columns with customizable logic.
- **Sorting:** Sort rows by one or more columns.
- **Pagination:** Control row display with pagination support.

### Advanced Features

- **Column Ordering:** Reorder columns dynamically.
- **Column Pinning:** Fix columns to the start or end of the table.
- **Column Sizing:** Adjust column widths manually or automatically.
- **Row Selection:** Select rows with checkboxes or other UI elements.
- **Virtualization:** Optimize rendering for large datasets.

---

## Examples

### Svelte Examples

- **Basic Table:** Simple table setup with core features.
- **Column Groups:** Group related columns for better organization.
- **Column Ordering:** Demonstrate dynamic column reordering.
- **Column Pinning:** Fix columns in place while scrolling.
- **Filtering:** Implement global and column-specific filters.

### Other Framework Examples

- **React:** Examples for React-specific integrations.
- **Vue:** Vue-specific usage patterns and examples.

---

## Core APIs

### Core Components

- **Column Defs:** Define columns with `accessorKey`, `header`, and `Cell` components.
- **Table Instance:** The main table object providing state and methods (e.g., `getTableInstance()`).
- **Row Models:** Access row data via `rows`, `allRows`, and `flatRows`.
- **Header Groups:** Manage hierarchical headers with `headerGroups`.

### Core Elements

- **Rows:** Individual row data and metadata.
- **Cells:** Render cell content with access to row and column data.
- **Headers:** Customize header components and behavior.

---

## Feature-Specific APIs

- **Sorting:** Use `sortingFns` and `column.sortable` to enable sorting.
- **Filtering:** Implement `filterFns` and `column.filter` for filtering logic.
- **Pagination:** Control pagination with `pageOptions` and `gotoPage`.

---

## Enterprise Features

- **AG Grid Integration:** Enhanced enterprise features via AG Grid compatibility.

---

## Getting Started

### Installation

```bash
npm install @tanstack/table-core @tanstack/svelte-table
```
````

### Basic Setup (Svelte Example)

```svelte
<script>
	import { useTable } from '@tanstack/svelte-table';

	const columns = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'age', header: 'Age' }
	];

	const data = [
		{ id: 1, name: 'Alice', age: 30 },
		{ id: 2, name: 'Bob', age: 25 }
	];

	const table = useTable({
		columns,
		data
	});
</script>

{#each table.getRowModel().rows as row}
	<tr>
		{#each table.getHeaderGroups() as headerGroup}
			<th>{headerGroup.header}</th>
		{/each}
	</tr>
{/each}
```

---

## Guides

### Core Guides

- **Column Definitions:** Configure columns with `accessorKey` and custom renderers.
- **Row Models:** Work with row data and state management.

### Feature Guides

- **Global Filtering:** Implement search functionality across all columns.
- **Virtualization:** Optimize rendering for large datasets.

---

## API Reference

### Core APIs

- **`useTable` (Svelte):** Hook to initialize the table instance.
- **`getTableInstance()`:** Access the table's state and methods.

### Feature APIs

- **Sorting API:** `column.getToggleSortingHandler()`
- **Filtering API:** `column.getFilterToggleProps()`

---

## Community & Resources

- **GitHub:** [TanStack Table GitHub](https://github.com/TanStack/table)
- **Discord:** Join the community for support and discussions.
- **Subscribe to Bytes:** Weekly JavaScript news and updates.

---

## Privacy & Consent

This documentation is designed to help developers implement TanStack Table. For privacy considerations, refer to the library's data-handling practices and user consent management features.

---

## Contributing

Contribute to the project on GitHub or join the Discord community for collaboration.

```

This documentation structure organizes the provided content into clear sections, includes all examples and features, and maintains the technical focus. The privacy notice is mentioned briefly but prioritizes the core documentation needs.
```
