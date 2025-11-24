````markdown
# TanStack Table v8 (Svelte) - Row Selection Documentation

## State

### RowSelectionState

The row selection state is stored using the following shape:

```tsx
export type RowSelectionState = Record<string, boolean>;
```
````

### RowSelectionTableState

The table's row selection state is part of the table's overall state:

```tsx
export type RowSelectionTableState = {
	rowSelection: RowSelectionState;
};
```

By default, rows are identified by their index. To use a custom identifier, provide a `getRowId` function to the table.

---

## Table Options

### enableRowSelection

Type: `boolean | ((row: Row<TData>) => boolean)`

Enables/disables row selection for all rows or conditionally based on a row function.

Example:

```tsx
enableRowSelection: (row) => row.original.id !== "blocked-row",
```

### enableMultiRowSelection

Type: `boolean | ((row: Row<TData>) => boolean)`

Controls whether multiple rows can be selected on the current page.

### enableSubRowSelection

Type: `boolean | ((row: Row<TData>) => boolean)`

Enables/disables automatic sub-row selection when a parent row is selected (useful with grouping/expanding).

### onRowSelectionChange

Type: `(OnChangeFn<RowSelectionState>)`

Callback for when row selection changes. Override to manage state externally.

---

## Table API

### getToggleAllRowsSelectedHandler

Returns a handler to toggle all rows' selection:

```tsx
const handleToggleAll = table.getToggleAllRowsSelectedHandler();
```

### setRowSelection

Updates the row selection state:

```tsx
table.setRowSelection((prev) => ({ ...prev, [row.id]: true }));
```

### resetRowSelection

Resets selection to initial state or empty:

```tsx
table.resetRowSelection();
```

### getIsAllRowsSelected

Checks if all rows are selected:

```tsx
const allSelected = table.getIsAllRowsSelected();
```

### toggleAllRowsSelected

Selects/deselects all rows:

```tsx
table.toggleAllRowsSelected(true);
```

---

## Row API

### getIsSelected

Checks if a row is selected:

```tsx
const isSelected = row.getIsSelected();
```

### toggleSelected

Toggles the row's selection state:

```tsx
row.toggleSelected();
```

### getCanSelect

Determines if a row can be selected:

```tsx
const canSelect = row.getCanSelect();
```

---

## Additional Notes

- **Custom Row IDs**: Use `getRowId` to define custom identifiers.
- **Sub-Row Behavior**: Combine with grouping/expanding for nested selection.
- **External State Management**: Use `onRowSelectionChange` to integrate with external state.

For contributions or edits, visit the [GitHub documentation](https://github.com/TanStack/table).

```

This documentation retains all examples, organizes sections with clear headers, and uses proper markdown formatting. The privacy policy and unrelated sections have been omitted as per instructions.
```
