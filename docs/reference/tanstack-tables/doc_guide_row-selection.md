````markdown
# Row Selection Guide

The row selection feature tracks selected rows and provides utilities to toggle selections. Below are common use cases and implementation details.

---

## Access Row Selection State

Retrieve row selection state via the following APIs:

```typescript
// Access internal state
console.log(table.getState().rowSelection); // { 1: true, 2: false, ... }

// Get selected rows
console.log(table.getSelectedRowModel().rows); // All selected rows
console.log(table.getFilteredSelectedRowModel().rows); // Filtered selected rows
console.log(table.getGroupedSelectedRowModel().rows); // Grouped selected rows
```
````

**Note:** When using `manualPagination`, `getSelectedRowModel` returns only selected rows on the current page. The row selection state retains IDs even if rows are not visible.

---

## Manage Row Selection State

Manage selection state externally using React state:

```typescript
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

const table = useReactTable({
	// ...
	onRowSelectionChange: setRowSelection, // Hoist state
	state: { rowSelection } // Pass state back
});
```

---

## Useful Row Ids

Use a custom row ID for better state management:

```typescript
const table = useReactTable({
	// ...
	getRowId: (row) => row.original.id // Use a database ID
});
```

This produces a selection state like:

```json
{
	"13e79140-...": true,
	"f3e2a5c0-...": false
}
```

---

## Enable Row Selection Conditionally

Control row selection availability:

```typescript
const table = useReactTable({
	// ...
	enableRowSelection: (row) => row.original.age > 18 // Enable for adults only
});
```

Use `row.getCanSelect()` to disable UI elements for non-selectable rows:

```jsx
<Checkbox disabled={!row.getCanSelect()} />
```

---

## Single Row Selection

Restrict to one selected row:

```typescript
const table = useReactTable({
	// ...
	enableMultiRowSelection: false // Radio button behavior
});
```

---

## Sub-Row Selection

Disable automatic sub-row selection:

```typescript
const table = useReactTable({
	// ...
	enableSubRowSelection: false // Disable sub-row inheritance
});
```

---

## Render Row Selection UI

### Checkbox Inputs

```jsx
const columns = [
	{
		id: 'select-col',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllRowsSelected()}
				indeterminate={table.getIsSomeRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				disabled={!row.getCanSelect()}
				onChange={row.getToggleSelectedHandler()}
			/>
		)
	}
	// ...
];
```

### Clickable Rows

```jsx
<tbody>
	{table.getRowModel().rows.map((row) => (
		<tr
			key={row.id}
			className={row.getIsSelected() ? 'selected' : ''}
			onClick={row.getToggleSelectedHandler()}
		>
			{row.getVisibleCells().map((cell) => (
				<td key={cell.id}>{/* ... */}</td>
			))}
		</tr>
	))}
</tbody>
```

---

## API Reference

### Core APIs

- `getRowId(row: Row): string`  
  Define a unique identifier for rows.

- `getToggleSelectedHandler(): () => void`  
  Handler to toggle a row's selection.

- `getToggleAllRowsSelectedHandler(): () => void`  
  Handler to toggle all rows' selection.

### Row Methods

- `row.getIsSelected(): boolean`  
  Check if a row is selected.

- `row.getCanSelect(): boolean`  
  Check if a row can be selected.

- `row.toggleSelected(): void`  
  Programmatically toggle a row's selection.

---

## Examples

- [React Row Selection Example](#)
- [Vue Row Selection Example](#)
- [Single Selection with Radio Buttons](#)

---

### Related Features

- [Row Pinning](row-pinning.md)
- [Sorting](sorting.md)

> **Note:** This documentation is part of the TanStack Table v8 ecosystem. For updates, visit [GitHub](https://github.com/TanStack/table).

```

---

### Key Features
- **Custom Row IDs:** Use `getRowId` for database-friendly keys.
- **Conditional Logic:** Enable/disable selection via functions.
- **UI Integration:** Built-in handlers for checkboxes and row clicks.

---

### Important Notes
- **State Management:** External state management (e.g., React `useState`) is recommended for persistence.
- **Performance:** Large datasets may require optimized state handling.

---

### Contributing
Found an issue? [Edit this guide on GitHub](https://github.com/TanStack/table/edit/main/docs/row-selection.md).
```

This structure maintains all examples, uses proper markdown syntax, and organizes content into logical sections while preserving the original examples and API references.
