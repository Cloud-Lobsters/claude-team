````markdown
# TanStack Table v8 Svelte Example: Fuzzy Filtering

This example demonstrates how to implement fuzzy filtering in a Svelte table using the TanStack Table library. The example includes global and column-level fuzzy filtering capabilities.

---

## Setup

### Dependencies

```bash
npm install @tanstack/svelte-table @tanstack/match-sorter-utils
```
````

---

## Key Components

### 1. Fuzzy Filter Function

```typescript
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);
	addMeta({ itemRank });
	return itemRank.passed;
};
```

### 2. Column Definitions

```typescript
let columns: ColumnDef<Person>[] = [
	{
		accessorFn: (row) => `${row.firstName} ${row.lastName}`,
		id: 'fullName',
		header: 'Name',
		cell: (info) => info.getValue(),
		filterFn: 'fuzzy'
	}
];
```

### 3. Table Configuration

```typescript
const options = writable<TableOptions<any>>({
	data: makeData(25),
	columns,
	filterFns: { fuzzy: fuzzyFilter },
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	globalFilterFn: fuzzyFilter,
	getPaginationRowModel: getPaginationRowModel()
});
```

---

## Usage

### Template Code

```svelte
<!-- Global Filter Input -->
<input
	type="text"
	placeholder="Global filter"
	class="border w-full p-1"
	bind:value={globalFilter}
	on:keyup={handleKeyUp}
/>

<!-- Table Structure -->
<table class="w-full">
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th>{flexRender(header.column.columnDef.header, header.getContext())}</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
```

---

## Features Explained

### Fuzzy Filtering

- Uses `rankItem` from `@tanstack/match-sorter-utils` for fuzzy matching
- Applied both globally and per-column
- Real-time filtering on input change via `handleKeyUp`

### Pagination

- Built-in pagination with `getPaginationRowModel()`
- Automatically handles page size and navigation

### Column Configuration

- Custom `fullName` column combining first/last names
- Column-level filtering via `filterFn: 'fuzzy'`

---

## Example Workflow

1. **Global Filter**:

   - Type in the input field to filter all columns
   - Uses fuzzy matching for partial matches

2. **Column Filtering**:
   - Column-specific filtering can be added via column filters
   - Current example shows column filtering on the `fullName` column

---

## State Management

- Table state stored in a Svelte store via `writable<TableOptions>`
- State includes:
  - Data
  - Column definitions
  - Filter functions
  - Pagination settings

---

## Styling

```css
/* From index.css */
/* Add your custom styles here */
```

---

## Example Data

```typescript
// makeData.ts example
export function makeData(count: number) {
	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		firstName: `First ${i + 1}`,
		lastName: `Last ${i + 1}`
	}));
}
```

---

## Key APIs Used

- `createSvelteTable`: Creates the table instance
- `flexRender`: Renders header/cell components
- `getFilteredRowModel`: Handles filtered row calculations
- `getPaginationRowModel`: Manages pagination state

---

## Usage Notes

- The `enableMultiRowSelection` option allows row selection
- The `globalFilter` state is bound to the input field
- The `fuzzyFilter` function is registered in `filterFns`

---

## Output Preview

![Example Output](https://example.com/table-screenshot.png) _(Example visualization)_

The table will display filtered results in real-time as you type in the search input, with pagination controls automatically generated.

```

This documentation retains all original code examples while organizing them into a structured reference. The privacy notice and unrelated UI elements from the original text have been omitted as per sanitization requirements.
```
