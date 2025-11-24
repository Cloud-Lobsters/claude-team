````markdown
# Cells Guide

This quick guide explains how to retrieve and interact with cell objects in TanStack Table.

---

## Where to Get Cells From

Cells are derived from rows. Use row instance APIs to retrieve cells:

```javascript
// Common methods
row.getAllCells(); // All cells, including hidden columns
row.getVisibleCells(); // Only visible cells (if using column visibility)
```
````

---

## Cell Objects

Each cell object corresponds to a `<td>` element in your UI. Key properties include:

- `id`: Unique identifier
- `parent row/column references`
- `value` and `renderValue` methods

---

## Cell IDs

Cell IDs are formatted as `rowId_columnId`. During grouping/aggregation, additional suffixes may be added:

```javascript
// Basic ID format
{
	id: `${row.id}_${column.id}`;
}
```

---

## Cell Parent Objects

Every cell has references to its parent row and column:

```javascript
cell.row; // Parent row object
cell.column; // Parent column definition
```

---

## Access Cell Values

Use these methods to retrieve values:

```javascript
// Recommended methods
const firstName = cell.getValue('firstName'); // Raw value
const lastName = cell.renderValue('lastName'); // Rendered value with fallback

// Note: These are shortcuts for row.getValue(columnId) and row.renderValue(columnId)
```

---

## Access Other Row Data from Any Cell

Access full row data via the parent row:

```javascript
// Access original row data
const originalData = cell.row.original;
const firstName = originalData.firstName;
```

---

## More Cell APIs

Additional methods are available depending on enabled features (e.g., sorting, filtering). See feature-specific docs.

---

## Cell Rendering

For custom cell rendering, use the adapter's `flexRender` utility:

```jsx
import { flexRender } from '@tanstack/svelte-table' // Svelte adapter example

<tr>
  {#each row.getVisibleCells() as cell}
    <td>{@html flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
  {/each}
</tr>
```

**Note:** Always use `flexRender` for proper rendering of column `cell` functions.

---

## On this page

- [API](#api)
- [Cells Guide](#cells-guide)
- [Where to Get Cells From](#where-to-get-cells-from)
- [Cell Objects](#cell-objects)
- [Cell IDs](#cell-ids)
- [Cell Parent Objects](#cell-parent-objects)
- [Access Cell Values](#access-cell-values)
- [Access Other Row Data from Any Cell](#access-other-row-data-from-any-cell)
- [More Cell APIs](#more-cell-apis)
- [Cell Rendering](#cell-rendering)
- [Rows](/docs/core/rows)
- [Header Groups](/docs/core/header-groups)

---

### API Reference

| Method/Property      | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `cell.getValue()`    | Retrieves raw cell value via accessor function            |
| `cell.renderValue()` | Returns rendered value with fallback for undefined values |
| `cell.row`           | Reference to the parent row                               |
| `cell.column`        | Reference to the parent column                            |
| `cell.id`            | Unique cell identifier string                             |

---

### Notes

- Always use `flexRender` for rendering custom cell components
- `renderValue` provides fallbacks for undefined values
- Cell IDs follow `rowId_columnId` format
- Parent row/column references are always accessible

For full API details, see the [Cell API documentation](/docs/core/cell-api).

```

This documentation format maintains all original examples while organizing them into a clear structure with proper markdown formatting, code blocks, and notes. The privacy policy text and unrelated UI elements have been omitted as per instructions.
```
