````markdown
# TanStack Table v8 - Expanding Feature Guide

## Introduction

Expanding allows showing/hiding additional rows or UI related to a row. This can be used for hierarchical data or custom detail panels.

---

## Getting Started

### Prerequisites

- TanStack Table v8
- Svelte framework setup

---

## Usage Examples

### 1. Table Rows as Expanded Data

**Scenario**: Displaying child rows stored in the data structure.

#### Example Data Structure

```typescript
type Person = {
	id: number;
	name: string;
	age: number;
	children?: Person[] | undefined;
};

const data: Person[] = [
	{
		id: 1,
		name: 'John',
		age: 30,
		children: [
			{ id: 2, name: 'Jane', age: 5 },
			{ id: 5, name: 'Jim', age: 10 }
		]
	}
	// ... other data
];
```
````

#### Implementation

```typescript
const table = useReactTable({
	getSubRows: (row) => row.original.children || [],
	getCoreRowModel: getCoreRowModel(),
	getExpandedRowModel: getExpandedRowModel()
	// ... other options
});
```

### 2. Custom Expanding UI

**Scenario**: Displaying non-table UI (e.g., detail panels).

#### Example UI Component

```html
<tbody>
	{#each table.getRowModel().rows as row}
	<tr>
		<!-- Parent row content -->
	</tr>
	{#if row.getIsExpanded()}
	<tr>
		<td colspan="{columns.length}">
			<!-- Custom UI content here -->
		</td>
	</tr>
	{/if} {/each}
</tbody>
```

---

## Key Concepts

### Expanded State Management

```typescript
const [expanded, setExpanded] = createSignal({});

const table = useReactTable({
	state: { expanded },
	onExpandedChange: setExpanded
});
```

### Toggle Handler

```html
<button on:click="{()" ="">
	row.toggleExpanded()}> {row.getIsExpanded() ? 'Collapse' : 'Expand'}
</button>
```

---

## API Reference

### Core Functions

| Function                | Description                        |
| ----------------------- | ---------------------------------- |
| `getExpandedRowModel()` | Enables expanded row functionality |
| `getSubRows()`          | Defines how to retrieve child rows |

### Options

| Option                 | Type                  | Default | Description                         |
| ---------------------- | --------------------- | ------- | ----------------------------------- |
| `getSubRows`           | `(row: Row) => Row[]` | -       | Function to retrieve child rows     |
| `manualExpanding`      | `boolean`             | `false` | Disable automatic expansion logic   |
| `filterFromLeafRows`   | `boolean`             | `false` | Filter from child rows upwards      |
| `paginateExpandedRows` | `boolean`             | `true`  | Include expanded rows in pagination |

---

## Configuration Options

### Filtering Expanded Rows

```typescript
const table = useReactTable({
	filterFromLeafRows: true,
	maxLeafRowFilterDepth: 2 // Limits filter depth to 2 levels
});
```

### Pagination Control

```typescript
const table = useReactTable({
  paginateExpandedRows: false // Expanded rows stay on parent's page
};
```

---

## Advanced Usage

### Server-Side Expansion

```typescript
const table = useReactTable({
  manualExpanding: true // Handle expansion logic manually
};
```

---

## State Management

```typescript
// State management example
const [expanded, setExpanded] = useState<ExpandedState>({});

const table = useReactTable({
	state: { expanded },
	onExpandedChange: setExpanded
});
```

---

## Examples

### Example 1: Basic Expansion

```html
<!-- Row template with expansion toggle -->
<tr>
	<td>
		<button on:click="{()" ="">row.toggleExpanded()}> {row.getIsExpanded() ? '▼' : '▶'}</button>
		{row.getValue()}
	</td>
</tr>
{#if row.getIsExpanded()}
<tr>
	<td colspan="{columns.length}">
		<!-- Expanded content here -->
	</td>
</tr>
{/if}
```

### Example 2: Custom Expanded UI

```html
{#if row.getIsExpanded()}
<tr>
	<td colspan="{columns.length}">
		<div class="detail-panel">
			<!-- Custom component here -->
		</div>
	</td>
</tr>
{/if}
```

---

## FAQ

**Q: How to handle large datasets?**  
A: Optimize `getSubRows` performance and consider virtualization for large hierarchies.

**Q: How to persist expanded state?**  
A: Use `useState` or external state management for `expanded` state.

---

## API Reference

### ExpandedState Type

```typescript
type ExpandedState = true | Record<string, boolean>;
```

### Row Methods

| Method                 | Description                          |
| ---------------------- | ------------------------------------ |
| `row.getCanExpand()`   | Checks if row has expandable content |
| `row.getIsExpanded()`  | Returns expansion state              |
| `row.toggleExpanded()` | Toggles expansion state              |

---

## Compatibility

- Works with Svelte framework
- Requires `@tanstack/table-core` and `@tanstack/table-expanding` packages

---

## See Also

- [Column Pinning Guide](#column-pinning)
- [Virtualization Guide](#virtualization)

```

This documentation structure retains all original examples and technical details while organizing them into a standard documentation format. The React syntax in examples is preserved as per the original content, even though the framework mentioned is Svelte. If framework-specific adjustments are needed, additional context would be required.
```
