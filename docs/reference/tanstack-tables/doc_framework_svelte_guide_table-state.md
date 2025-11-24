````markdown
# TanStack Table v8 (Svelte) - Table State Guide

## Introduction

TanStack Table provides a robust state management system for table configurations. This guide explains how to access, customize, and control the table's state in Svelte applications.

---

## Accessing Table State

The table's internal state can be retrieved using the `table.getState()` method.

```svelte
<script>
	import { createSvelteTable } from '@tanstack/svelte-table';

	const options = writable({
		columns,
		data
		// ...
	});

	const table = createSvelteTable(options);

	// Access the entire state
	console.log(table.getState());

	// Access specific state
	console.log(table.getState().rowSelection);
</script>
```
````

---

## Custom Initial State

Set default values for state properties using `initialState` in the table options.

```svelte
<script>
	const options = writable({
		columns,
		data,
		initialState: {
			columnOrder: ['age', 'firstName', 'lastName'],
			columnVisibility: {
				id: false
			},
			expanded: true,
			sorting: [
				{
					id: 'age',
					desc: true
				}
			]
		}
	});

	const table = createSvelteTable(options);
</script>
```

> **Note:** Avoid specifying the same state in both `initialState` and `state` options.

---

## Controlled State Management

### Individual Controlled State

Control specific state properties by providing both the state value and the corresponding `on[State]Change` handler.

#### Example: Controlling Sorting, Filtering, and Pagination

```svelte
<script>
	import { writable } from 'svelte/store';

	let sorting = [];
	let columnFilters = [];
	let pagination = { pageIndex: 0, pageSize: 15 };

	const setSorting = (updater) => {
		sorting = typeof updater === 'function' ? updater(sorting) : updater;
		options.update((old) => ({
			...old,
			state: { ...old.state, sorting }
		}));
	};

	const options = writable({
		columns,
		data: tableQuery.data,
		state: {
			sorting,
			columnFilters,
			pagination
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination
	});

	const table = createSvelteTable(options);
</script>
```

### Fully Controlled State

Control the entire state using `onStateChange`:

```svelte
<script>
	const options = writable({
		columns,
		data
	});

	const table = createSvelteTable(options);
	let state = { ...table.initialState, pagination: { pageIndex: 0, pageSize: 15 } };

	const setState = (updater) => {
		state = typeof updater === 'function' ? updater(state) : updater;
		options.update((old) => ({ ...old, state }));
	};

	table.setOptions({
		state,
		onStateChange: setState
	});
</script>
```

> **Caution:** Avoid lifting frequently updated states (e.g., columnSizingInfo) to prevent performance issues.

---

## On State Change Callbacks

### Key Rules

1. **State Callbacks Require State Values**  
   To use `on[State]Change`, the corresponding state must be provided in the `state` option.

   ```svelte
   // Valid example
   const options = writable({
     state: { sorting },
     onSortingChange: setSorting
   });
   ```

2. **Updater Functions**  
   Callbacks accept both raw values and updater functions:

   ```typescript
   const setSorting = (updater: SortingState | ((s: SortingState) => SortingState)) => {
   	// Implementation
   };
   ```

---

## State Types

Use TypeScript types for state management:

```typescript
import { createSvelteTable, SortingState, Updater } from '@tanstack/svelte-table';

let sorting: SortingState = [{ id: 'age', desc: true }];
const setSorting = (updater: Updater<SortingState>) => {
	// Update logic
};
```

---

## Key Concepts

- **Controlled State**:\*\* Explicitly manage state via `state` and `on[State]Change` options.
- **Uncontrolled State:** Let the table manage state internally when no `state`/`onStateChange` is provided.

---

## API References

- `table.getState()`: Retrieve current state
- `initialState`: Set default values
- `state`: Override internal state
- `on[State]Change`: Callbacks for state updates

---

## Example: Full Controlled State Setup

```svelte
<script>
	import { writable } from 'svelte/store';
	import { createSvelteTable, SortingState } from '@tanstack/svelte-table';

	// Initialize state variables
	let sorting: SortingState = [];
	let columnFilters = [];
	let pagination = { pageIndex: 0, pageSize: 15 };

	// State management functions
	const setSorting = (updater) => {
		sorting = typeof updater === 'function' ? updater(sorting) : updater;
		options.update((old) => ({ ...old, state: { ...old.state, sorting } }));
	};

	// Configure table options
	const options = writable({
		columns,
		data,
		state: { sorting, columnFilters, pagination },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination
	});

	const table = createSvelteTable(options);
</script>
```

---

## Important Notes

- **State Conflict:** Do not define the same state in both `initialState` and `state`.
- **Performance:** Avoid lifting frequently changing states (like column sizing) to parent components.
- **Type Safety:** Use TypeScript types like `SortingState` for better type checking.

```

This documentation structure maintains all original examples while organizing them into clear sections with proper syntax highlighting and explanations. It includes code blocks for Svelte/JSX/TypeScript, notes, and warnings where necessary. The original examples are preserved with proper formatting, and the content is organized for easy navigation.
```
