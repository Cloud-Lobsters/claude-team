````markdown
# TanStack Table v8 Documentation for Svelte

## Getting Started

### Introduction

TanStack Table's core is **framework-agnostic**, meaning its API remains consistent across frameworks. Adapters are provided to simplify integration with specific frameworks. Refer to the [Adapters menu](#) for available options.

---

### TypeScript

While TanStack Table is written in TypeScript, using TypeScript in your application is **optional** (but recommended for enhanced code quality and developer experience).

---

### Headless

TanStack Table operates in a **headless** manner, meaning it does not render DOM elements. Instead, it provides state and API, allowing you to customize the UI. This flexibility supports frameworks like React, Vue, Solid, Svelte, Qwik, and even JS-to-native platforms like React Native.

---

## Core Concepts

### Core Objects and Types

The table core uses the following abstractions (exposed via adapters):

- **Column Defs**: Configure columns, data models, and display templates.
- **Table**: Central object containing state and API.
- **Table Data**: The raw data array provided to the table.
- **Columns**: Mirrors column defs and provides column-specific APIs.
- **Rows**: Represents row data with row-specific APIs.
- **Header Groups**: Computed header hierarchies containing header groups.
- **Headers**: Associated with columns, offering header-specific APIs.
- **Cells**: Represents row-column intersections with cell-specific APIs.

Additional structures exist for features like filtering, sorting, and grouping, detailed in the [Features section](#).

---

### Key Features

- **Column Ordering**
- **Column Pinning**
- **Column Sizing**
- **Column Visibility**
- **Filtering** (global, fuzzy, faceting)
- **Grouping & Expanding**
- **Pagination**
- **Row Selection**
- **Virtualization**

---

## Installation

```bash
npm install @tanstack/table-core @tanstack/svelte-table
```
````

---

## Usage Example

```svelte
<script>
	import { createTable } from '@tanstack/svelte-table';

	const columns = [
		{
			accessorKey: 'name',
			header: 'Name'
		}
		// ... other columns
	];

	const data = [
		{ name: 'Alice', age: 30 }
		// ... other rows
	];

	const table = createTable({
		data,
		columns
	});
</script>

{#each table.getRowModel().rows as row}
	<tr>
		{#each row.getVisibleCells() as cell}
			<td>{@html cell.renderValue()}</td>
		{/each}
	</tr>
{/each}
```

---

## Features

Explore feature-specific guides:

- [Column Filtering](column-filtering.md)
- [Global Sorting](sorting.md)
- [Virtualization](virtualization.md)

---

## Contributing

- **GitHub**: [Contribute to the core](https://github.com/TanStack/table)
- **Community**: Join the [Discord](https://discord.gg/tanstack) for support.

---

### Notes

- **Framework Adapters**: Use the `@tanstack/svelte-table` adapter for Svelte.
- **Enterprise Features**: AG Grid integration available in the [Enterprise section](enterprise.md).

---

**Edit on GitHub**: [Contribute to this documentation](https://github.com/TanStack/table/edit/main/docs/svelte.md)

```

---

### Key Changes:
1. **Structure**: Organized content into logical sections (Installation, Core Concepts, Features, etc.).
2. **Examples**: Included a Svelte usage example and code snippets.
3. **Formatting**: Used markdown headers, lists, and code blocks for clarity.
4. **Sanitization**: Removed privacy policy text, UI elements (e.g., "AGREE", "MORE OPTIONS"), and irrelevant menu links.
5. **Links**: Added placeholder links (e.g., `#`, GitHub, Discord) for navigation.
6. **Emphasis**: Highlighted key terms (e.g., "headless", "framework-agnostic") for readability.
7. **Consistency**: Maintained the original terminology (e.g., "Column Defs", "Header Groups").
```
