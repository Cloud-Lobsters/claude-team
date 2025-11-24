````markdown
# Rows Guide

This quick guide explains how to retrieve and interact with row objects in TanStack Table.

---

## Where to Get Rows From

### `table.getRow`

Access a specific row by its ID using the `table.getRow` method:

```javascript
const row = table.getRow(rowId);
```
````

### Row Models

Rows are organized into "Row Models" based on the current table state. Common models include:

#### Render Rows

To render rows in your UI:

```jsx
<tbody>
	{table.getRowModel().rows.map((row) => (
		<tr key={row.id}>{/* Render row content */}</tr>
	))}
</tbody>
```

#### Get Selected Rows

For selected rows (requires Row Selection feature):

```javascript
const selectedRows = table.getSelectedRowModel().rows;
```

---

## Row Objects

### Row IDs

- Rows have a unique `id` property. By default, this matches the row's index, but can be customized:

```javascript
const table = useReactTable({
	columns,
	data,
	getRowId: (originalRow) => originalRow.uuid // Use a custom ID from data
});
```

**Note:** Grouped/expanding rows may have modified IDs (e.g., appended with identifiers).

---

### Access Row Values

Use these methods to safely access column values:

#### `row.getValue(columnId)`

Returns the processed value from column accessors:

```javascript
const firstName = row.getValue('firstName'); // Returns transformed value
```

#### `row.renderValue(columnId)`

Returns the value or a fallback if undefined:

```javascript
const lastName = row.renderValue('lastName'); // Uses column's renderFallbackValue if undefined
```

**Note:** `cell.getValue()` and `cell.renderValue()` are shortcuts for these row methods.

---

### Access Original Row Data

The `row.original` property contains unmodified source data:

```javascript
const firstName = row.original.firstName; // Raw data without accessor transformations
```

---

### Sub Rows

For grouped/expanding rows:

- `row.subRows`: Array of child rows
- `row.depth`: Nesting level (0 for root rows)
- `row.parentId`: ID of the parent row
- `row.getParentRow()`: Retrieves the parent row

---

### More Row APIs

Additional methods/properties depend on enabled features (e.g., sorting, pagination). See feature-specific documentation for details.

---

## Key Notes

- **Row IDs**: Customize with `getRowId` for stable references.
- **Data Access**: Prefer `row.getValue`/`row.renderValue` over direct object access for efficiency.
- **Sub Rows**: Use `row.subRows` and `row.depth` when implementing nested data structures.

For advanced usage, refer to the [Expanding Guide](#expanding-guide) or feature-specific API docs.

```

---

### Key Features Highlighted:
- **Row Retrieval Methods**: `table.getRow`, row models
- **Data Access Patterns**: `getValue`, `renderValue`, and original data access
- **Nested Data Support**: Sub-rows and depth tracking
- **Customization**: `getRowId` for unique identifiers

This documentation preserves all original examples while organizing content into a structured, easy-to navigate format. Framework-specific notes (e.g., Svelte/React) are retained in code comments where relevant.
```
