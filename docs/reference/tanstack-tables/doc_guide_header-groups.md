````markdown
# Header Groups Guide

## What are Header Groups?

Header Groups represent rows of headers in a table. While most tables have a single header group (a single row of headers), nested columns (as in the [Column Groups example](#column-groups-example)) can create multiple header groups. Each header group corresponds to a row in the table's header section.

## Where to Get Header Groups From

Use the following Table instance APIs to retrieve header groups:

- `table.getHeaderGroups()`: The primary method for accessing header groups.
- `table.getLeftHeaderGroups()`, `table.getCenterHeaderGroups()`, `table.getRightHeaderGroups()`: Use these if column pinning is enabled to handle left/right pinned columns separately.

## Header Group Objects

Header Group objects have these core properties:

- `id`: Unique identifier derived from the header group's depth.
- `depth`: Zero-indexed depth level (e.g., 0 for the first header row).
- `headers`: Array of `Header` objects for this row.

## Accessing Header Cells

To render headers, map over the header groups and their headers:

```jsx
<thead>
	{table.getHeaderGroups().map((headerGroup) => (
		<tr key={headerGroup.id}>
			{headerGroup.headers.map((header) => (
				<th key={header.id} colSpan={header.colSpan}>
					{/* Render header content here */}
				</th>
			))}
		</tr>
	))}
</thead>
```
````

### Key Properties of Header Cells

Each `header` object in the `headers` array includes:

- `colSpan`: Determines how many columns the header spans (useful for grouped columns)
- `columns`: Array of columns associated with this header
- `id`: Unique identifier for the header
- `parent`: Reference to the parent header (for nested groups)
- `rendered`: Boolean indicating if the header should be rendered

## Example Use Case

For a table with column grouping:

```jsx
// Column definition with nested columns
const columns = [
	{
		header: 'Employee Info',
		columns: [
			{ header: 'Name', accessor: 'name' },
			{ header: 'Department', accessor: 'department' }
		]
	},
	{ header: 'Years of Service', accessor: 'years' }
];

// Rendering
return (
	<table>
		<thead>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((header) => (
						<th {...header.getHeaderProps()} colSpan={header.colSpan}>
							{header.isPlaceholder ? null : header.renderHeader()}
						</th>
					))}
				</tr>
			))}
		</thead>
		{/* ... */}
	</table>
);
```

## Key Methods

- `headerGroup.getHeaderGroupProps()`: Returns HTML attributes for accessibility
- `header.getHeaderProps()`: Returns props for individual header cells
- `header.renderHeader()`: Renders the header content (useful for nested headers)

## Important Notes

- Header groups are ordered from top to bottom (first group is the topmost row)
- Depth 0 represents the topmost header row
- Column visibility/pinning affects which headers are included in the groups

```

This documentation format:
- Maintains all original examples and code snippets
- Uses clear markdown structure with headers and code blocks
- Organizes information into logical sections
- Preserves key technical details from the original guide
- Removes non-essential content like privacy notices and unrelated links
- Adds code syntax highlighting through markdown code blocks
- Maintains the original example's structure while improving readability
```
