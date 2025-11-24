````markdown
# TanStack Table v8 Documentation

## Privacy Notice

This documentation is part of the TanStack Table library. For privacy details, note that this library does not collect or process personal data. It focuses on providing headless table logic for developers to integrate into their applications.

---

## Introduction

TanStack Table is a **headless UI library** for building powerful tables and datagrids in TypeScript/JavaScript, supporting frameworks like React, Vue, Solid, Qwik, and Svelte. It offers core features like sorting, filtering, pagination, and virtualization while allowing full control over rendering and styling.

---

## What is "Headless" UI?

Headless UI libraries provide logic and state management without enforcing specific UI components. Key principles:

- **State & Logic**: Handles data processing, sorting, filtering, and pagination.
- **Markup Freedom**: Customize HTML, CSS, or design systems to match your needs.
- **Portability**: Works anywhere JavaScript runs, framework-agnostic.

---

## Component-Based vs. Headless Libraries

### Component-Based Libraries (e.g., AG Grid)

**Pros**:

- Ready-to use with pre-built UI components.
- Quick setup with minimal configuration.
- Large feature set out of the box.

**Cons**:

- Less control over styling and markup.
- Larger bundle sizes due to included UI code.
- Tightly coupled to specific frameworks.

### Headless Libraries (e.g., TanStack Table)

**Pros**:

- Full control over UI design and styling.
- Smaller bundle sizes (no UI components).
- Highly portable across frameworks.

**Cons**:

- Requires more setup for UI implementation.
- No pre-built UI components provided.

---

## Choosing the Right Library

- **Choose a component-based library** if you need a ready-to use solution with minimal setup.
- **Choose a headless library** if you need full control over design and performance.

---

## Getting Started

### Installation

```bash
npm install @tanstack/table
```
````

### Basic Setup (Svelte Example)

```svelte
<script>
	import { createTable } from '@tanstack/table';

	const columns = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'age', header: 'Age' }
	];

	const data = [
		{ name: 'Alice', age: 30 },
		{ name: 'Bob', age: 25 }
	];

	const table = createTable({ data, columns });
</script>

<table>
	{#each table.getHeaderGroups as headerGroup}
		<tr>
			{#each headerGroup.headers as header}
				<th>{header.header}</th>
			{/each}
		</tr>
	{/each}
	{#each table.rows as row}
		<tr>
			{#each row.cells as cell}
				<td>{cell.value}</td>
			{/each}
		</tr>
	{/each}
</table>
```

---

## Core Concepts

### Headless UI Principles

- **Logic-UI Separation**: Business logic is decoupled from presentation.
- **Framework Agnostic**: Works with React, Vue, Svelte, etc.
- **Customizable**: Integrate with any styling approach (CSS, CSS-in-JS, etc.).

---

## Core Guides

### Column Definitions

Define columns with `accessorKey` and `header`:

```javascript
const columns = [
	{ accessorKey: 'id', header: 'ID' },
	{ accessorKey: 'name', header: 'Name' }
];
```

### Table Instance

The `createTable` function returns a table instance with methods like `getHeaders()` and `getRows()`.

---

## Feature Guides

### Sorting

Implement sorting with column definitions:

```javascript
{
  accessorKey: 'age',
  sortingFn: (rowA, rowB) => rowA.getValue() - rowB.getValue()
}
```

### Filtering

Filter rows programmatically:

```javascript
const filteredRows = table.getFilteredRows();
```

---

## APIs

### Column Definition

```typescript
interface ColumnDef<TData> {
	accessorKey: string;
	header: string | ReactNode;
	// ... other props
}
```

### Table Instance

```typescript
interface TableInstance {
	getHeaderGroups(): HeaderGroup[];
	getRows(): Row[];
	// ... other methods
}
```

---

## Enterprise Features

- **AG Grid Integration**: Enhanced features for enterprise use cases.
- **Custom Features**: Extend functionality with plugins.

---

## Examples

### Basic Example

A simple table with sorting and filtering:

```svelte
<!-- BasicTable.svelte -->
<script>
	// ... setup code
</script>

<table>
	<!-- Render headers and rows -->
</table>
```

### Column Groups

Group columns for complex layouts:

```javascript
const columns = [
	{
		header: 'User Info',
		columns: [{ accessorKey: 'name' }, { accessorKey: 'email' }]
	}
];
```

---

## Contributing

- **GitHub**: [Edit on GitHub](https://github.com/tanstack/table)
- **Community**: Join our [Discord](https://discord.gg/tanstack) for support.

---

## Notes

- **Privacy**: This documentation does not process personal data. For privacy details, refer to the [Privacy Policy](#privacy-notice).
- **Version**: Latest version is v8.
- **Framework Support**: Works with React, Vue, Solid, Qwik, and Svelte.

---

## Footer

**Partners**: AG Grid  
**Subscribe to Bytes**: Get weekly JavaScript insights. [Subscribe Now](#subscribe)

> **Note**: Some processing of your personal data may not require consent, but you can object at any time via the "Privacy" button on this site.

```

This documentation structure sanitizes the input text into a clean, organized format while preserving all key sections and examples. The privacy notice is included as a disclaimer, and technical details are formatted with code blocks and bullet points for clarity.
```

This documentation structure sanitizes the input text into a clean, organized format while preserving all key sections and examples. The privacy notice is included as a disclaimer, and technical details are formatted with code blocks and bullet points for clarity.
