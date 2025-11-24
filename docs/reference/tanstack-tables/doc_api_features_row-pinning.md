````markdown
# Row Pinning Guide

## Can-Pin

The ability to pin a row is determined by the following conditions:

- `options.enableRowPinning` resolves to `true`.
- `options.enablePinning` is not explicitly set to `false`.

---

## State

### Types

```typescript
export type RowPinningPosition = false | 'top' | 'bottom';

export type RowPinningState = {
	top?: string[];
	bottom?: string[];
};

export type RowPinningRowState = {
	rowPinning: RowPinningState;
};
```
````

---

## Table Options

### enableRowPinning

Enables/disables row pinning for all rows in the table.

**Type**:

```typescript
enableRowPinning?: boolean | ((row: Row<TData>) => boolean);
```

**Example**:

```tsx
const table = useTable({
	columns,
	data,
	enableRowPinning: true
});
```

---

### keepPinnedRows

Controls whether pinned rows remain visible when filtered/paginated.

**Type**:

```typescript
keepPinnedRows?: boolean;
```

**Default**: `true`  
**Example**:

```tsx
const table = useTable({
	columns,
	data,
	keepPinnedRows: false
});
```

---

### onRowPinningChange

Callback for when row pinning state changes.

**Type**:

```typescript
onRowPinningChange?: OnChangeFn<RowPinningState>;
```

**Example**:

```tsx
const table = useTable({
	columns,
	data,
	onRowPinningChange: (updater) => {
		// Handle state updates
	}
});
```

---

## Table API

### setRowPinning

Updates the row pinning state.

**Type**:

```typescript
setRowPinning: (updater: Updater<RowPinningState>) => void;
```

**Example**:

```tsx
table.setRowPinning((prev) => ({ ...prev, top: ['row1'] }));
```

---

### resetRowPinning

Resets the row pinning state.

**Type**:

```typescript
resetRowPinning: (defaultState?: boolean) => void;
```

**Example**:

```tsx
table.resetRowPinning(true); // Resets to empty state
```

---

### getIsSomeRowsPinned

Checks if any rows are pinned.

**Type**:

```typescript
getIsSomeRowsPinned: (position?: RowPinningPosition) => boolean;
```

**Example**:

```tsx
const hasPinnedRows = table.getIsSomeRowsPinned('top');
```

---

### getTopRows

Retrieves all top-pinned rows.

**Type**:

```typescript
getTopRows: () => Row < TData > [];
```

**Example**:

```tsx
const topRows = table.getTopRows();
```

---

### getBottomRows

Retrieves all bottom-pinned rows.

**Type**:

```typescript
getBottomRows: () => Row < TData > [];
```

**Example**:

```tsx
const bottomRows = table.getBottomRows();
```

---

### getCenterRows

Retrieves non-pinned rows.

**Type**:

```typescript
getCenterRows: () => Row < TData > [];
```

**Example**:

```tsx
const centerRows = table.getCenterRows();
```

---

## Row API

### pin

Pins/unpins a row to a specified position.

**Type**:

```typescript
pin: (position: RowPinningPosition) => void;
```

**Example**:

```tsx
row.pin('top'); // Pins the row to the top
row.pin(false); // Unpins the row
```

---

### getCanPin

Checks if a row can be pinned.

**Type**:

```typescript
getCanPin: () => boolean;
```

**Example**:

```tsx
if (row.getCanPin()) {
	// Allow pinning
}
```

---

### getIsPinned

Gets the current pinned position of a row.

**Type**:

```typescript
getIsPinned: () => RowPinningPosition;
```

**Example**:

```tsx
const position = row.getIsPinned(); // Returns 'top', 'bottom', or false
```

---

### getPinnedIndex

Gets the numeric index of a pinned row within its group.

**Type**:

```typescript
getPinnedIndex: () => number;
```

**Example**:

```tsx
const index = row.getPinnedIndex(); // Returns 0-based index in pinned group
```

---

## Usage Example

```tsx
// Example of pinning a row to the top
const handlePinRow = (row) => {
	row.pin('top');
};

// Example of resetting pinning state
const resetPinning = () => {
	table.resetRowPinning(true);
};
```

---

## Notes

- Pinned rows are persisted in the `IABGPP_HDR_GppString` cookie for 13 months.
- To override default state management, provide `onRowPinningChange` and manage `state.rowPinning` externally.

```

This documentation structure maintains all original examples and technical details while organizing them into a clear, navigable format. Irrelevant sections (privacy policy, footer links, etc.) have been omitted as requested.
```
