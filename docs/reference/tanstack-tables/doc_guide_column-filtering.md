````markdown
# Column Filtering Guide

## Client-Side vs Server-Side Filtering

TanStack Table supports both client-side and manual server-side filtering. Choose based on your data size and performance needs.

### Manual Server-Side Filtering

To implement server-side filtering, disable client-side filtering and manage data on the server:

```jsx
const table = useReactTable({
	data,
	columns,
	getCoreRowModel: getCoreRowModel(),
	manualFiltering: true // Disable client-side filtering
});
```
````

### Client-Side Filtering

Enable client-side filtering with:

```jsx
import { getFilteredRowModel } from '@tanstack/svelte-table';

const table = useReactTable({
	getFilteredRowModel: getFilteredRowModel()
});
```

---

## Column Filter State Management

### Accessing Column Filter State

```jsx
const columnFilters = table.getState.columnFilters;
```

### Controlled Column Filter State

```jsx
const [columnFilters, setColumnFilters] = useState([]);

const table = useReactTable({
	state: { columnFilters },
	onColumnFiltersChange: setColumnFilters
});
```

### Initial Column Filter State

```jsx
const table = useReactTable({
	initialState: {
		columnFilters: [{ id: 'name', value: 'John' }]
	}
});
```

---

## Filter Functions (FilterFns)

### Built-in Filter Functions

- `includesString` (case-insensitive string inclusion)
- `inNumberRange` (number range filtering)
- etc.

### Custom Filter Functions

Define custom filter logic:

```ts
const startsWithFilterFn = (row, columnId, filterValue) => {
	const value = row.getValue(columnId)?.toString().toLowerCase().trim();
	return value?.startsWith(filterValue?.toLowerCase().trim());
};

// Add to table options
filterFns: {
	startsWith: startsWithFilterFn;
}
```

### Customizing Filter Behavior

```ts
// Auto-remove empty values
startsWithFilterFn.autoRemove = (val) => !val;

// Sanitize input values
startsWithFilterFn.resolveFilterValue = (val) => val?.toString().trim();
```

---

## Customizing Column Filtering

### Disabling Column Filtering

```jsx
const columns = [
	{
		header: 'ID',
		accessorKey: 'id',
		enableColumnFilter: false // Disable filtering for this column
	}
];
```

### Filtering Sub-Rows

Control how sub-rows are filtered with:

```jsx
filterFromLeafRows: true; // Include sub-rows in filtering
maxLeafRowFilterDepth: 0; // Only filter root rows
```

---

## Column Filter APIs

### Key APIs

- `table.setColumnFilters()` - Set multiple filters
- `table.resetColumnFilters()` - Clear all filters
- `column.getFilterValue()` - Get current filter value
- `column.getIsFiltered()` - Check if column is filtered

---

## Examples

### Basic Column Filter Setup

```jsx
import { getFilteredRowModel } from '@tanstack/svelte-table';

const table = useReactTable({
	getFilteredRowModel: getFilteredRowModel(),
	columns: [
		{
			filterFn: 'includesString'
			// Column configuration
		}
	]
});
```

### Custom Filter Function Example

```ts
const customFilter = (row, columnId, value) => {
  return row.getValue(columnId) === value;
};

// Usage in column definition
{
  filterFn: customFilter,
  //...
}
```

---

## Important Notes

- **Performance Considerations**: Client-side filtering can handle thousands of rows efficiently
- **State Management**: Use `manualFiltering: true` for server-side implementations
- **Sub-Row Filtering**: Use `filterFromLeafRows` and `maxLeafRowFilterDepth` for nested data

For more details on API references, see the [Column Filtering API Reference](#column-filter-apis).

```

This documentation structure retains all original examples while organizing the content into logical sections with proper code formatting. The privacy notice and unrelated menu items have been omitted as per sanitization requirements. Framework-specific code examples are preserved as they appear in the original text.
```
