````markdown
# TanStack Table v8 Grouping Guide

## Overview

Grouping in TanStack Table allows you to categorize and organize table rows based on column values. This feature works with the grouped row model and integrates with expanding/collapsing functionality.

---

## Setup

### Enabling Grouping

To enable grouping, include the `getGroupedRowModel` plugin in your table configuration:

```tsx
import { getGroupedRowModel, getExpandedRowModel } from '@tanstack/react-table';

const table = useReactTable({
	// ... other options
	getRowModel: getGroupedRowModel(),
	getExpandedRowModel: getExpandedRowModel()
});
```
````

---

## Grouping State Management

### Grouping State

- **Type**: `string[]` (array of column IDs)
- **Default**: `[]` (no grouping)

#### Example: Setting Grouping

```tsx
// Set grouping by 'column1' and 'column2'
table.setGrouping(['column1', 'column2']);

// Reset grouping
table.resetGrouping();
```

---

## Column Behavior

### Grouped Column Mode

Control how grouped columns are handled via `groupedColumnMode`:

- `'reorder'` (default): Move grouped columns to the start
- `'remove'`: Remove grouped columns from the table
- `false`: Leave columns in original position

```tsx
const table = useReactTable({
	groupedColumnMode: 'reorder' // or 'remove' / false
});
```

---

## Aggregations

### Built-in Aggregation Functions

| Function      | Description                 |
| ------------- | --------------------------- |
| `sum`         | Sum of values in the group  |
| `count`       | Number of rows in the group |
| `min`         | Minimum value in the group  |
| `max`         | Maximum value in the group  |
| `extent`      | Min and max as `[min, max]` |
| `mean`        | Average value               |
| `median`      | Median value                |
| `unique`      | Array of unique values      |
| `uniqueCount` | Count of unique values      |

### Configuring Aggregations

Define aggregation functions in column definitions:

```tsx
const column = columnHelper.accessor('sales', {
	aggregationFn: 'sum' // Use built-in function
});
```

---

## Custom Aggregations

Define custom aggregation functions via `aggregationFns`:

```tsx
const table = useReactTable({
	aggregationFns: {
		myCustomFn: (values) => values.reduce((acc, val) => acc + val.length, 0)
	}
});

// Use in column
const column = columnHelper.accessor('customData', {
	aggregationFn: 'myCustomFn'
});
```

---

## Manual Grouping (Server-Side)

For server-side grouping, set `manualGrouping: true` and handle grouping logic externally:

```tsx
const table = useReactTable({
	manualGrouping: true
	// Implement custom row grouping logic
});
```

> **Note**: Server-side grouping requires custom cell rendering for grouped rows.

---

## Grouping State Control

### Managing State Externally

Use React state to control grouping externally:

```tsx
const [grouping, setGrouping] = useState([]);

const table = useReactTable({
	state: { grouping },
	onGroupingChange: setGrouping
});
```

---

## Grouping Order Precedence

Columns are reordered based on:

1. **Pinning** (left/right pinned columns)
2. **Manual ordering**
3. **Grouping** (grouped columns moved to start if `groupedColumnMode: 'reorder'`)

---

## API Reference

### Core Methods

| Method             | Description                      |
| ------------------ | -------------------------------- |
| `setGrouping(ids)` | Sets the grouping state          |
| `resetGrouping()`  | Resets grouping to default state |

### Options

| Option              | Description                       |
| ------------------- | --------------------------------- |
| `groupedColumnMode` | Controls grouped column placement |
| `aggregationFns`    | Custom aggregation functions      |
| `manualGrouping`    | Enables manual grouping           |
| `onGroupingChange`  | Callback for state changes        |

---

## Examples

- **Grouping Example**: [View Example](#)
- **Custom Aggregation**: [View Example](#)

> **Note**: Examples are available in the official TanStack Svelte examples repository.

---

## Compatibility

- Requires `@tanstack/react-table` v8+
- Expanding feature required for collapsible groups

For full API details, see the [Grouping API documentation](#).

```

This documentation structure maintains all original examples and key information while organizing it into a clear, navigable format. The code snippets are preserved with proper syntax highlighting, and critical notes (like server-side grouping challenges) are highlighted for clarity.
```
