````markdown
# Column Visibility API Documentation

## State

Column visibility state is stored on the table using the following shape:

```typescript
export type VisibilityState = Record<string, boolean>;

export type VisibilityTableState = {
	columnVisibility: VisibilityState;
};
```
````

---

## Column Def Options

### enableHiding

```typescript
enableHiding?: boolean
```

Enables/disables hiding the column.

**Example:**

```tsx
{
  accessorKey: "name",
  header: "Name",
  enableHiding: false // Disable hiding for this column
}
```

---

## Column API

### getCanHide

```typescript
getCanHide: () => boolean;
```

Returns whether the column can be hidden.

### getIsVisible

```typescript
getIsVisible: () => boolean;
```

Returns whether the column is visible.

### toggleVisibility

```typescript
toggleVisibility: (value?: boolean) => void
```

Toggles the column visibility. Accepts an optional boolean to set visibility directly.

### getToggleVisibilityHandler

```typescript
getToggleVisibilityHandler: () => (event: unknown) => void
```

Returns a function to toggle visibility, useful for binding to event handlers like checkboxes.

---

## Table Options

### onColumnVisibilityChange

```typescript
onColumnVisibilityChange?: OnChangeFn<VisibilityState>
```

Callback triggered when column visibility changes. Allows custom state management.

### enableHiding

```typescript
enableHiding?: boolean
```

Globally enables/disables column hiding for all columns.

---

## Table API

### getVisibleFlatColumns

```typescript
getVisibleFlatColumns: () => Column < TData > [];
```

Returns all visible columns (including parents) as a flat array.

### getVisibleLeafColumns

```typescript
getVisibleLeafColumns: () => Column < TData > [];
```

Returns visible leaf-node columns as a flat array.

### getLeftVisibleLeafColumns

```typescript
getLeftVisibleLeafColumns: () => Column < TData > [];
```

Returns visible leaf columns in the left-pinned section (if pinning is enabled).

### getRightVisibleLeafColumns

```typescript
getRightVisibleLeafColumns: () => Column < TData > [];
```

Returns visible leaf columns in the right-pinned section.

### getCenterVisibleLeafColumns

```typescript
getCenterVisibleLeafColumns: () => Column < TData > [];
```

Returns visible leaf columns in the unpinned/center section.

### setColumnVisibility

```typescript
setColumnVisibility: (updater: Updater<VisibilityState>) => void
```

Updates column visibility state via an updater function or value.

### resetColumnVisibility

```typescript
resetColumnVisibility: (defaultState?: boolean) => void
```

Resets visibility to initial state. If `defaultState` is provided, resets to an empty object.

### toggleAllColumnsVisible

```typescript
toggleAllColumnsVisible: (value?: boolean) => void
```

Toggles visibility of all columns. Accepts an optional boolean to set visibility directly.

### getIsAllColumnsVisible

```typescript
getIsAllColumnsVisible: () => boolean;
```

Returns `true` if all columns are visible.

### getIsSomeColumnsVisible

```typescript
getIsSomeColumnsVisible: () => boolean;
```

Returns `true` if at least one column is visible.

### getToggleAllColumnsVisibilityHandler

```typescript
getToggleAllColumnsVisibilityHandler: () => ((event: unknown) => void)
```

Returns a handler to toggle all columns' visibility, designed for checkbox inputs.

---

## Row API

### getVisibleCells

```typescript
getVisibleCells: () => Cell < TData > [];
```

Returns cells filtered by visible columns for the row.

---

## Usage Example

```tsx
// Toggle visibility of a column
const column = table.getColumn('name');
column.toggleVisibility();

// Get visible columns
const visibleColumns = table.getVisibleLeafColumns();

// Toggle all columns
table.toggleAllColumnsVisible();
```

## Resetting State

```typescript
// Reset to default visibility state
table.resetColumnVisibility();

// Reset to fully visible
table.resetColumnVisibility(true);
```

## Event Handling

```tsx
<input
	type="checkbox"
	checked={table.getIsAllColumnsVisible()}
	onChange={table.getToggleAllColumnsVisibilityHandler()}
/>
```

This documentation covers all aspects of managing column visibility in TanStack Table v8 for Svelte, including state management, API methods, and event handling.

```

This formatted documentation retains all technical details, examples, and structure from the original content while omitting non-technical sections like privacy notices and navigation links. The code examples are preserved in TypeScript/JSX format with appropriate syntax highlighting hints.
```
