# TanStack Table v8 Column Ordering Guide

## Overview

By default, columns are ordered based on their definition in the `columns` array. The column order can be customized using the `columnOrder` state, alongside features like pinning and grouping.

---

## What Affects Column Order

Column order is determined in this sequence:

1. **Column Pinning**: Columns are split into left-pinned, center (unpinned), and right-pinned groups.
2. **Manual Ordering**: The `columnOrder` state defines the sequence of unpinned columns.
3. **Grouping**: Grouped columns are moved to the start of the column flow if `groupedColumnMode` is set to `'reorder'` or `'remove'`.

**Note**: The `columnOrder` state only affects unpinned columns when combined with pinning.

---

## Column Order State Management

### Default Column Order

Specify the initial order via `initialState`:

```jsx
const table = useReactTable({
	//...
	initialState: {
		columnOrder: ['columnId1', 'columnId2', 'columnId3']
	}
	//...
});
```

### Dynamic State Management

For real-time updates:

```jsx
const [columnOrder, setColumnOrder] = useState<string[]>(columns.map(c => c.id));
const table = useReactTable({
  state: { columnOrder },
  onColumnOrderChange: setColumnOrder,
});
```

---

## Reordering Columns

### Implementing Drag-and-Drop Logic

Example of reordering logic:

```jsx
const reorderColumn = (movingId: string, targetId: string) => {
  const newOrder = [...columnOrder];
  const movingIndex = newOrder.indexOf(movingId);
  const targetIndex = newOrder.indexOf(targetId);

  newOrder.splice(targetIndex, 0, newOrder.splice(movingIndex, 1)[0]);
  setColumnOrder(newOrder);
};
```

---

## Drag-and-Drop Implementation Tips (React)

For React projects, consider:

1. **Avoid `react-dnd`**: It has compatibility issues with React 18.
2. **Use DnD Kit**: Modern and lightweight, works well with `<table>` elements.
3. **Native Events**: Use browser events like `onDragStart`/`onDragEnd` for a lightweight solution.
4. **Mobile Support**: Ensure touch events are handled if targeting mobile users.

---

## Key Notes

- **State Conflict**: Do not mix `initialState` and `state` for the same property.
- **Pinning Interaction**: Pinned columns remain in their pinned sections and are ordered independently of `columnOrder`.

---

## API Reference

| Property              | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `columnOrder`         | Array of column IDs defining the order of unpinned columns. |
| `onColumnOrderChange` | Callback to update the column order state.                  |

---

## Example Workflow

1. Define columns:

```jsx
const columns = [
	{ header: 'Name', accessor: 'name' },
	{ header: 'Age', accessor: 'age' }
];
```

2. Initialize table with custom order:

```jsx
const [order, setOrder] = useState(['age', 'name']);
const table = useReactTable({
	columns,
	state: { columnOrder: order },
	onColumnOrderChange: setOrder
});
```

---

## See Also

- [Column Pinning Guide](#column-pinning)
- [Table State Management](#table-state)

This documentation focuses on configuring and managing column order in TanStack Table v8, ensuring flexibility for both static and dynamic UI interactions.
