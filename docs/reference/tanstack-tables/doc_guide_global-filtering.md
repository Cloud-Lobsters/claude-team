````markdown
# Global Filtering Guide

## Client-Side vs Server-Side Filtering

When deciding between client-side and server-side filtering, consider the following factors:

- **Client-Side Filtering**: TanStack Table can handle thousands of rows efficiently. Test with your dataset to ensure performance.
- **Server-Side Filtering**: Use when dealing with very large datasets or when server-side logic is required.

## Manual Server-Side Global Filtering

To implement manual server-side filtering:

```jsx
const table = useReactTable({
	data,
	columns,
	manualFiltering: true // Disable built-in filtering
});
```
````

**Note**: When using `manualFiltering`, the table assumes data is pre-filtered.

---

## Client-Side Global Filtering

Enable client-side filtering by adding:

```jsx
import { useReactTable, getFilteredRowModel } from '@tanstack/react-table';

const table = useReactTable({
	getFilteredRowModel: getFilteredRowModel()
});
```

---

## Global Filter Function

### Built-in Filter Functions

Choose from built-in functions like `includesString` (case-insensitive) or `equalsStringSensitive` (case-sensitive).

### Custom Filter Function

Define a custom function and pass it to `globalFilterFn`:

```jsx
const customFilterFn = (row, columnId, filterValue) => {
	// Custom logic here
};

const table = useReactTable({
	globalFilterFn: customFilterFn
});
```

---

## Global Filter State Management

### Accessing State

```jsx
const globalFilter = table.getState().globalFilter;
```

### Controlled Input Example

```jsx
<input
	value={globalFilter || ''}
	onChange={(e) => table.setGlobalFilter(e.target.value || undefined)}
	placeholder="Search..."
/>
```

### Managing State Externally

```jsx
const [globalFilter, setGlobalFilter] = useState('');

const table = useReactTable({
	state: { globalFilter },
	onGlobalFilterChange: setGlobalFilter
});
```

---

## Initial Global Filter State

Set an initial value via `initialState` or controlled state:

```jsx
const table = useReactTable({
	initialState: { globalFilter: 'initial search term' }
});
```

**Note**: Do not use both `initialState.globalFilter` and `state.globalFilter` simultaneously.

---

## Disabling Global Filtering

### Per-Column Disable

```jsx
const columns = [
	{
		accessorKey: 'id',
		enableGlobalFilter: false
	}
];
```

### Disable All Global Filtering

```jsx
const table = useReactTable({
	enableGlobalFilter: false
});
```

---

## Example Usage

### Basic Setup with Input

```jsx
function Table({ data, columns }) {
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		data,
		columns,
		getFilteredRowModel: getFilteredRowModel(),
		state: { globalFilter },
		onGlobalFilterChange: setGlobalFilter
	});

	return (
		<div>
			<input
				value={globalFilter || ''}
				onChange={(e) => setGlobalFilter(e.target.value)}
				placeholder="Search..."
			/>
			{/* Table implementation */}
		</div>
	);
}
```

---

## API References

### `GlobalFilter` State Shape

```jsx
interface GlobalFilter {
  globalFilter: any;
}
```

### Key Options

- `globalFilterFn`: Function to determine filtering logic
- `manualFiltering`: Bypass built-in filtering
- `enableGlobalFilter`: Enable/disable filtering globally or per-column

---

For more details, refer to the [TanStack Table documentation](https://tanstack.com/table).

```

This documentation format retains all examples, uses proper markdown syntax, and organizes content into logical sections while omitting non-technical content like privacy notices and unrelated UI elements.
```
