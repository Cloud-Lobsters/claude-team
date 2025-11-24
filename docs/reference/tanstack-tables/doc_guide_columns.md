````markdown
# Columns Guide

This quick guide discusses the different ways to retrieve and interact with column objects in TanStack Table.

---

## On this page

- [Where to Get Columns From](#where-to-get-columns-from)
- [Column Objects](#column-objects)
- [Column IDs](#column-ids)
- [ColumnDef](#column-def)
- [Nested Grouped Columns Properties](#nested-grouped-columns-properties)
- [Column Rendering](#column-rendering)

---

## Where to Get Columns From

### Header and Cell Objects

Before using table instance APIs, consider retrieving columns from headers or cells directly when rendering table UI:

```javascript
const column = cell.column; // Get column from cell
const column = header.column; // Get column from header
```
````

### Column Table Instance APIs

Use table instance APIs for programmatic access:

#### Get Column

Retrieve a single column by ID:

```javascript
const column = table.getColumn('firstName');
```

#### Get Columns

Retrieve columns based on table state and features:

```javascript
const allColumns = table.getAllColumns(); // All columns
const flatColumns = table.getAllFlatColumns(); // Non-grouped columns
const leafColumns = table.getAllLeafColumns(); // Non-grouped, non-aggregate columns
```

---

## Column Objects

Column objects are not directly tied to UI elements but provide metadata and methods. Key properties include:

- `id`: Unique identifier
- `header`: Header label
- `accessorKey`: Data accessor
- `enableSorting`: Sorting configuration
- `size`: Column width (if using column sizing)

---

## Column IDs

- Columns require a unique `id` in their definition.
- IDs can be manually set or derived from `accessorKey`/`header`.

---

## ColumnDef

Each column object includes a reference to its original definition:

```javascript
const columnDef = column.columnDef;
```

---

## Nested Grouped Columns Properties

For grouped columns:

- `columns`: Child columns (if a group)
- `depth`: Header group level
- `parent`: Parent column (or `undefined` for top-level columns)

---

## More Column APIs

Explore feature-specific APIs (e.g., `table.getSortedColumns()` for sorting, `table.getFilteredColumns()` for filtering).

---

## Column Rendering

**Note:** Avoid rendering headers/cells directly from columns. Use `header`/`cell` objects instead for UI rendering. For non-table UI (e.g., column visibility menus), map over columns:

```javascript
{
	table.getAllLeafColumns().map((column) => <div>{column.header}</div>);
}
```

---

## API Reference

### Core Column Methods

- `getColumn(id: string): Column | undefined)`
- `getAllColumns(): Column[]`
- `getAllFlatColumns(): Column[]`
- `getAllLeafColumns(): Column[]`

### Grouped Columns

- `getGroupedColumns(depth: number): Column[])`

### Visibility/Pinning

- `getVisibleColumns(): Column[]`
- `getLeftVisibleLeafColumns(): Column[]`

---

## Example Usage

```javascript
// Get visible columns with sorting applied
const sortedColumns = table.getSortedColumns();

// Check if a column is visible
const isColumnVisible = table.getVisibleColumns().includes(column);
```

---

## Notes

- Column objects are immutable and re-created on state changes.
- Always use the latest column references from the table instance.

For feature-specific column APIs (e.g., sorting, filtering), see individual feature guides.

```

This documentation preserves all original examples and key concepts while organizing them into a structured, markdown-friendly format with proper code blocks and navigational links. The privacy notice and UI elements from the original text have been omitted as non-essential documentation content.
```
