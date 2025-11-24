````markdown
# Custom Features Guide

## Introduction

TanStack Table v8 allows developers to extend its functionality by creating custom features. This guide walks through creating a custom "Density" feature to adjust table cell padding, demonstrating how to integrate custom state, options, and APIs into the table instance.

---

## TanStack Table's Lean Architecture

TanStack Table is designed to be lightweight, with core features like sorting and filtering. Custom features can be added via the `_features` option, enabling advanced functionality without bloating the core library.

---

## How TanStack Table Features Work

Features are defined using the `TableFeature` type, which includes methods to:

- **State Management**: `getInitialState`, `getDefaultOptions`, `getDefaultColumnDef`
- **API Creation**: `createTable`, `createColumn`, `createRow`, `createHeader`, `createCell`

### Key Methods Explained:

1. **`getInitialState`**: Sets default state values (e.g., `density`).
2. **`getDefaultOptions`**: Defines default options (e.g., `enableDensity`).
3. **`createTable`**: Adds methods to the table instance (e.g., `setDensity`, `toggleDensity`).

---

## Step-by-Step Guide to Creating a Custom Feature

### Step 1: Define TypeScript Types

Define types for state, options, and APIs:

```typescript
export type DensityState = 'sm' | 'md' | 'lg';
export interface DensityTableState {
	density: DensityState;
}

export interface DensityOptions {
	enableDensity?: boolean;
	onDensityChange?: (updater: Updater<DensityState>) => void;
}

export interface DensityInstance {
	setDensity: (updater: Updater<DensityState>) => void;
	toggleDensity: (value?: DensityState) => void;
}
```
````

### Step 2: Merge Types with TanStack Table

Use TypeScript declaration merging to extend existing types:

```typescript
declare module '@tanstack/svelte-table' {
	// Adjust for your framework
	interface TableState extends DensityTableState {}
	interface TableOptions<TData> extends DensityOptions {}
	interface Table<TData> extends DensityInstance {}
}
```

**Caveat**: Declaration merging affects all tables globally. For isolated features, consider alternative type extensions.

### Step 3: Create the Feature Object

Implement the `TableFeature` interface:

```typescript
export const DensityFeature: TableFeature<any> = {
	getInitialState: (state: DensityTableState) => ({
		density: 'md',
		...state
	}),

	getDefaultOptions: (table) => ({
		enableDensity: true,
		onDensityChange: makeStateUpdater('density', table)
	}),

	createTable: (table) => {
		table.setDensity = (updater) => {
			const safeUpdater = (old: DensityState) => functionalUpdate(updater, old);
			table.options.onDensityChange?.(safeUpdater);
		};

		table.toggleDensity = (value) => {
			table.setDensity((old) => value || ['lg', 'md', 'sm'].find((d) => d !== old) || 'md');
		};
	}
};
```

### Step 4: Add the Feature to the Table

Include the feature when initializing the table:

```typescript
const table = useSvelteTable({
	_features: [DensityFeature],
	columns,
	data,
	state: { density },
	onDensityChange: setDensity
});
```

### Step 5: Use the Feature in Your App

Access the feature's state and methods:

```svelte
<script>
  const { density } = table.getState;
</script>

<table>
  <tr>
    <td style:padding={density === 'sm' ? '4px' : density === 'md' ? '8px' : '16px'}>
      {#each rows as row}
        {flexRender(row.getCanExpand ? row.getExpanded ? '-' : '+', 'Cell')}
        {row.renderCells()}
      {/each}
    </td>
  </tr>
</table>
<button on:click={() => table.toggleDensity()}>Toggle Density</button>
```

---

## Alternative Approaches

While integrating features via `_features` is powerful, simpler use cases can use external state management (e.g., React state hooks). However, the `_features` approach ensures seamless integration with the table's lifecycle.

---

## Example: Density Feature Implementation

### Full Feature Code

```typescript
// DensityFeature.ts
export const DensityFeature: TableFeature<any> = {
	// ... (as shown in Step 3)
};
```

### Usage in a Component

```svelte
<script>
	import { useSvelteTable } from '@tanstack/svelte-table';
	import { DensityFeature } from './DensityFeature';

	let density = 'md';
	const table = useSvelteTable({
		_features: [DensityFeature],
		state: { density },
		onDensityChange: (newDensity) => setDensity(newDensity)
		// ... other options
	});
</script>
```

---

## Conclusion

Custom features allow deep integration with TanStack Table's internals. While declaration merging provides type safety, consider alternatives for isolated features. Explore the [Custom Features Example](#) for a full implementation.

```

This documentation structure:
- Organizes content into logical sections with clear headings
- Highlights code examples with syntax highlighting
- Explains each step of creating a custom feature
- Includes caveats and alternative approaches
- Maintains all original examples and explanations
- Uses markdown formatting for readability
- Ensures TypeScript types are properly declared
- Shows integration in both feature definition and component usage

The final documentation provides a clear, step-by-step guide to creating custom features while maintaining type safety and integration with TanStack Table's core functionality.
```
