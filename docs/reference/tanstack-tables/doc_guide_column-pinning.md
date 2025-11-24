````markdown
# Column Pinning Guide

## Overview

TanStack Table provides state and APIs to implement column pinning, allowing columns to be fixed to the left or right of the table. This can be achieved using sticky CSS or by splitting columns into separate tables.

---

## How Column Pinning Affects Column Order

Column pinning impacts the column order in the following sequence:

1. **Pinning**: Columns are divided into `left`, `center` (unpinned), and `right` groups.
2. **Manual Ordering**: The `columnOrder` state adjusts the order of unpinned columns.
3. **Grouping**: Grouped columns are moved to the start if `groupedColumnMode` is set to reorder.

---

## Column Pinning State Management

### Initializing Default Pinned Columns

```jsx
const table = useReactTable({
	initialState: {
		columnPinning: {
			left: ['id', 'name'],
			right: ['actions']
		}
	}
});
```
````

### Managing State with Hooks

```jsx
const [columnPinning, setColumnPinning] = useState({ left: [], right: [] });
const table = useReactTable({
	state: { columnPinning },
	onColumnPinningChange: setColumnPinning
});
```

---

## Useful Column Pinning APIs

### Column Methods

- `column.getCanPin()`: Checks if a column can be pinned.
- `column.pin(side: 'left' | 'right')`: Pins the column to the specified side.
- `column.getIsPinned()`: Returns 'left', 'right', or null.
- `column.getStart()`: Returns the left CSS position for sticky columns.
- `column.getAfter()`: Returns the right CSS position for sticky columns.
- `column.getIsFirstColumn()`: Checks if it's the first in its pinned group.
- `column.getIsLastColumn()`: Checks if it's the last in its pinned group.

---

## Split Table Implementation

For complex layouts, use these methods to separate pinned columns:

- `table.getLeftHeaderGroups()`
- `table.getCenterHeaderGroups()`
- `table.getRightHeaderGroups()`
- `row.getLeftVisibleCells()`
- `row.getCenterVisibleCells()`
- `row.getRightVisibleCells()`

---

## Example Usage

### Basic Pinned Columns

```jsx
// Pin a column to the left
const handlePin = (column) => {
  column.pin("left");
};

// Render pinned columns with sticky styles
{table.getLeftHeaderGroups().map(headerGroup => (
  <div style={{ position: 'sticky', left: column.getStart() }}>
    {headerGroup.headers.map(header => ...)}
  </div>
))}
```

---

## API Reference

### Column Pinning State Type

```typescript
type ColumnPinningState = {
	left: string[];
	right: string[];
};
```

---

## Examples

- **Column Pinning Example**: [column-pinning](https://tanstack.com/table/examples/svelte/column-pinning)
- **Sticky Column Pinning**: [sticky-column-pinning](https://tanstack.com/table/examples/svelte/sticky-column-pinning)

---

## Version Notes

⚠️ Some APIs (e.g., `getStart`, `getAfter`) are new in **v8.12.0**.

---

## Implementation Tips

- Use `column.getStart()` and `column.getAfter()` to calculate sticky positions dynamically.
- Apply box shadows using `getIsFirstColumn`/`getIsLastColumn` for visual separation between pinned groups.

---

## Related Features

- [Column Ordering](column-ordering.md)
- [Column Sizing](column-sizing.md)

```

This documentation format:
- Removes privacy policy and unrelated UI elements
- Organizes content into logical sections with clear headings
- Preserves all code examples and API references
- Maintains version notes and implementation tips
- Uses markdown syntax for readability
- Includes example links and framework variants
- Highlights key methods and state management patterns
```
