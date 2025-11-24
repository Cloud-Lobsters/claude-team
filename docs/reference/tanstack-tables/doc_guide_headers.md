````markdown
# Headers Guide

## Where to Get Headers From

### HeaderGroup Headers

Headers are retrieved from `HeaderGroups`, which represent rows in the `<thead>` section. Access headers via `headerGroup.headers`:

```jsx
<thead>
	{table.getHeaderGroups().map((headerGroup) => (
		<tr key={headerGroup.id}>
			{headerGroup.headers.map((header) => (
				<th key={header.id} colSpan={header.colSpan}>
					{/* Render header content */}
				</th>
			))}
		</tr>
	))}
</thead>
```
````

### Header Table Instance APIs

Use table instance methods to retrieve headers:

- `table.getFlatHeaders()`: Returns a flat list of all headers.
- `table.getLeftLeafHeaders()`: Headers for pinned columns.
- `table.getRightFlatHeaders()`: Headers for non-pinned columns.

---

## Header Objects

### Header IDs

- **id**: Unique identifier for the header.
- For simple headers, `header.id` matches `header.column.id`. Complex headers (e.g., grouped) have composite IDs.

### Nested Grouped Headers Properties

- **colSpan**: Number of columns the header spans.
- **rowSpan**: Not yet implemented in TanStack Table.
- **depth**: Header group "row index".
- **isPlaceholder**: `true` for placeholder headers (e.g., for hidden columns).
- **placeholderId**: Unique ID for placeholder headers.
- **subHeaders**: Array of child headers (empty for leaf headers).

### Header Parent Objects

- **header.column**: Associated column definition.
- **header.headerGroup**: Parent header group.

---

## Header Rendering

Use `flexRender` to handle header content (strings, JSX, or functions):

```jsx
{
	headerGroup.headers.map((header) => (
		<th key={header.id} colSpan={header.colSpan}>
			{flexRender(header.column.columnDef.header, header.getContext())}
		</th>
	));
}
```

---

## Key Notes

- **header.index**: Position within the header group (left-to-right).
- **header.depth**: Header group row index (not the same as `header.index`).

---

## API Reference

### Header Properties

| Property        | Description                            |
| --------------- | -------------------------------------- |
| `id`            | Unique header identifier.              |
| `column`        | Associated column object.              |
| `headerGroup`   | Parent header group.                   |
| `colSpan`       | Number of columns the header spans.    |
| `isPlaceholder` | `true` if the header is a placeholder. |

### Header Group Methods

| Method                    | Description                         |
| ------------------------- | ----------------------------------- |
| `table.getHeaderGroups()` | Returns all header groups.          |
| `table.getFlatHeaders()`  | Returns a flat list of all headers. |

---

## Example: Basic Header Rendering

```jsx
// Render headers with column resizing
<thead>
	{table.getHeaderGroups().map((headerGroup) => (
		<tr key={headerGroup.id}>
			{headerGroup.headers.map((header) => (
				<th
					key={header.id}
					colSpan={header.colSpan}
					style={{ width: header.getSize() }} // Example of using header sizing API
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</th>
			))}
		</tr>
	))}
</thead>
```

## Important Notes

- Placeholder headers (`isPlaceholder: true`) handle layout for hidden/pinned columns.
- Use `header.depth` to determine the header's row level in nested headers.

```

This documentation retains all original examples and key concepts while organizing them into a structured format. The API reference and notes ensure clarity on header properties and usage patterns.
```
