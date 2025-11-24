# Column Visibility Guide

The column visibility feature allows table columns to be hidden or shown dynamically. In v8, this feature uses a dedicated `columnVisibility` state and APIs for managing visibility.

---

## Column Visibility State

The `columnVisibility` state is a map of column IDs to boolean values. A column is hidden if its ID exists in the map with a `false` value. Columns not in the map or with `true` are visible.

### Example: Managing State with `useState`

```jsx
const [columnVisibility, setColumnVisibility] = useState({
	columnId1: true,
	columnId2: false, // Hidden by default
	columnId3: true
});

const table = useReactTable({
	state: {
		columnVisibility
	},
	onColumnVisibilityChange: setColumnVisibility
});
```

### Example: Using `initialState`

```jsx
const table = useReactTable({
	initialState: {
		columnVisibility: {
			columnId1: true,
			columnId2: false
		}
	}
});
```

**Note:** Do not provide `columnVisibility` to both `initialState` and `state`. The `state` takes precedence.

---

## Disable Hiding Columns

Prevent columns from being hidden by setting `enableHiding: false` in the column definition.

```jsx
const columns = [
	{
		header: 'ID',
		accessorKey: 'id',
		enableHiding: false // Cannot be hidden
	},
	{
		header: 'Name',
		accessor: 'name' // Can be hidden
	}
];
```

---

## Column Visibility Toggle APIs

### Useful Column Methods

- **`column.getCanHide()`**: Returns `true` if the column can be hidden.
- **`column.getIsVisible()`**: Returns the current visibility state.
- **`column.toggleVisibility()`**: Toggles the column's visibility.
- **`column.getToggleVisibilityHandler()`**: Returns a handler for UI events (e.g., checkboxes).

### Example: Toggle UI

```jsx
{
	table.getAllColumns().map((column) => (
		<label key={column.id}>
			<input
				checked={column.getIsVisible()}
				disabled={!column.getCanHide()}
				onChange={column.getToggleVisibilityHandler()}
				type="checkbox"
			/>
			{column.columnDef.header}
		</label>
	));
}
```

---

## Column Visibility-Aware Table APIs

When rendering headers, rows, or cells, use **visibility-aware APIs** to exclude hidden columns:

- **`table.getVisibleLeafColumns()`**: Replaces `getAllLeafColumns`.
- **`row.getVisibleCells()`**: Replaces `getAllCells`.

```jsx
<table>
	<thead>
		<tr>
			{table.getVisibleLeafColumns().map((column) => (
				<th key={column.id}>{column.header}</th>
			))}
		</tr>
	</thead>
	<tbody>
		{table.getRowModel().rows.map((row) => (
			<tr key={row.id}>
				{row.getVisibleCells().map((cell) => (
					<td key={cell.id}>{cell.getValue()}</td>
				))}
			</tr>
		))}
		)}
	</tbody>
</table>
```

**Note:** Header Group APIs (e.g., `headerGroups.headers`) automatically exclude hidden columns.

---

## Examples

- [column-visibility](#column-visibility-example)
- [column-ordering](#column-ordering-example)
- [sticky-column-pinning](#sticky-column-pinning-example)

---

## API Reference

### Column Visibility APIs

- **`column.getCanHide()`**: Checks if hiding is allowed.
- **`column.getIsVisible()`**: Gets current visibility.
- **`column.toggleVisibility()`**: Toggles visibility.
- **`column.getToggleVisibilityHandler()`**: Returns a click handler.

### Table State Management

- **`state.columnVisibility`**: The visibility map.
- **`onColumnVisibilityChange`**: Callback for state updates.

---

## Related Features

- [Column Sizing](column-sizing.md)
- [Column Filtering](column-filtering.md)

---

**Edit this page on GitHub**  
[https://github.com/TanStack/table/blob/main/docs/guides/column-visibility.md](https://github.com/TanStack/table/blob/main/docs/guides/column-visibility.md)

---

This documentation ensures columns are dynamically managed while maintaining clean state and UI integration.
