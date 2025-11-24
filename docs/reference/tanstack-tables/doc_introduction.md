````markdown
# TanStack Table v8 for Svelte Documentation

## Introduction

TanStack Table is a headless UI library designed to handle the logic, state, and processing for building powerful tables and datagrids in TypeScript/JavaScript frameworks like Svelte. It focuses on providing core functionality while allowing full control over UI implementation.

---

## What is "Headless" UI?

Headless UI libraries provide logic and state management without enforcing specific UI components or styles. Key benefits include:

- Decoupling logic from presentation
- Full control over markup, styles, and design systems
- Smaller bundle sizes due to no pre-built UI components
- Portability across any JavaScript environment

---

## Component-Based vs. Headless Libraries

### Component-Based Table Libraries (e.g., AG Grid)

**Pros**:

- Ready-to-use components with styles/themes
- Lower initial setup effort
- Feature-rich out-of-the-box

**Cons**:

- Less control over markup
- Larger bundle sizes
- Styles/themes may require heavy customization

### Headless Table Libraries (TanStack Table)

**Pros**:

- Full control over UI implementation
- Smaller bundle size
- Highly customizable
- Works with any styling approach (CSS, CSS-in-JS, etc.)

**Cons**:

- Requires more setup
- No pre-built UI components provided

---

## Getting Started

### Installation

```bash
npm install @tanstack/table-core @tanstack/svelte-table
```
````

### Basic Usage

```svelte
<script>
  import { createTable } from '@tanstack/svelte-table';

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' }
  ];

  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age 25 }
  ];

  const table = createTable({
    data,
    columns
  });
</script>

<table>
	{#each table.getHeaderGroups() as headerGroup}
		<tr>
			{#each headerGroup.headers as header}
				<th>{header.isPlaceholder ? null : header.column.header}</th>
			{/each}
		</tr>
	{/each}

	{#each table.getRowModel().rows as row}
		<tr>
			{#each row.getVisibleCells() as cell}
				<td>{cell.getValue()}</td>
			{/each}
		</tr>
	{/each}
</table>
```

---

## Core Features

### Guides

- **Column Definitions**: Define columns with `accessorKey`, headers, and footers
- **Row Models**: Access processed row data with `table.getRowModel()`
- **State Management**: Built-in handling for sorting, filtering, and pagination state
- **Virtualization**: Opt-in row and column virtualization for large datasets

### APIs

- `createTable()`: Initialize table instance
- `getTableInstance()`: Get core table state
- `getHeaderGroups()`: Get header hierarchy
- `getFilteredRowModel()`: Access filtered data
- `getSortedRowModel()`: Access sorted data

---

## Feature Guides

### Column Management

- Ordering: Reorder columns programmatically
- Pinning: Fix columns to start/end of table
- Sizing: Auto-resize or set fixed column widths
- Visibility: Toggle column visibility

### Data Processing

- Sorting: Multi-column sorting with custom comparators
- Filtering:
  - Global filtering with `getFilteredRowModel()`
  - Column-specific filtering
  - Fuzzy search capabilities
- Pagination: Customizable pagination with row counts and page sizes

### Advanced Features

- Grouping: Hierarchical data grouping
- Expanding: Toggle row expansion for nested data
- Selection: Row selection with checkbox controls

---

## Examples

Explore these example implementations:

- [Basic Table](#)
- [Column Groups](#)
- [Column Ordering](#)
- [Column Pinning](#)
- [Column Visibility](#)
- [Filtering](#)
- [Sorting](#)
- [Pagination](#)
- [Row Selection](#)

---

## Ecosystem

- **AG Grid**: Recommended component-based grid for full UI solutions
- **GitHub**: [Source Code](https://github.com/TanStack/table)
- **Community**: Join the [TanStack Discord](https://discord.gg/tanstack)

```

This documentation format:
- Removes all privacy policy content
- Organizes core concepts into logical sections
- Retains all example references
- Maintains key technical details from original content
- Uses proper markdown formatting for readability
- Highlights framework-specific implementation (Svelte)
- Preserves comparison between component-based and headless approaches
- Includes code examples and API references
```

Let me know if you'd like me to expand any specific section or adjust the structure further!
