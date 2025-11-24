````markdown
# Column Sizing API

## State

The column sizing state is stored on the table using the following shape:

```typescript
export type ColumnSizingTableState = {
	columnSizing: ColumnSizing;
	columnSizingInfo: ColumnSizingInfoState;
};

export type ColumnSizing = Record<string, number>;

export type ColumnSizingInfoState = {
	startOffset: null | number;
	startSize: null | number;
	deltaOffset: null | number;
	deltaPercentage: null | number;
	isResizingColumn: false | string;
	columnSizingStart: [string, number][];
};
```
````

---

## Column Def Options

### `enableResizing`

```typescript
enableResizing?: boolean
```

Enables or disables column resizing for the column.

---

### `size`

```typescript
size?: number
```

The desired initial size for the column.

---

### `minSize`

```typescript
minSize?: number
```

The minimum allowed size for the column.

---

### `maxSize`

```typescript
maxSize?: number
```

The maximum allowed size for the column.

---

## Column API

### `getSize()`

```typescript
getSize: () => number;
```

Returns the current size of the column.

---

### `getStart(position?)`

```typescript
getStart: (position?: ColumnPinningPosition) => number;
```

Returns the offset measurement along the row-axis (e.g., x-axis) for the column, summing preceding columns' sizes. Useful for positioning.

---

### `getAfter(position?)`

```typescript
getAfter: (position?: ColumnPinningPosition) => number;
```

Returns the offset measurement for succeeding columns, useful for positioning.

---

### `getCanResize()`

```typescript
getCanResize: () => boolean;
```

Returns `true` if the column can be resized.

---

### `getIsResizing()`

```typescript
getIsResizing: () => boolean;
```

Returns `true` if the column is currently being resized.

---

### `resetSize()`

```typescript
resetSize: () => void
```

Resets the column size to its initial value.

---

## Header API

### `getSize()`

```typescript
getSize: () => number;
```

Returns the total size of the header (sum of leaf column sizes).

---

### `getStart(position?)`

```typescript
getStart: (position?: ColumnPinningPosition) => number;
```

Returns the offset of the header, summing preceding headers' sizes.

---

### `getResizeHandler()`

```typescript
getResizeHandler: () => (event: unknown) => void
```

Returns an event handler for resizing. Attach to `onMouseDown` or `onTouchStart`.

---

## Table Options

### `enableColumnResizing`

```typescript
enableColumnResizing?: boolean
```

Enables/disables column resizing for all columns.

---

### `columnResizeMode`

```typescript
columnResizeMode?: 'onChange' | 'onEnd'
```

Determines when the state updates: `'onChange'` (during dragging) or `'onEnd'` (on release).

---

### `columnResizeDirection`

```typescript
columnResizeDirection?: 'ltr' | 'rtl'
```

Sets the resize direction (defaults to `'ltr'`).

---

### `onColumnSizingChange`

```typescript
onColumnSizingChange?: OnChangeFn<ColumnSizingState>
```

Callback for column sizing state changes. Required if managing state externally.

---

### `onColumnSizingInfoChange`

```typescript
onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>
```

Callback for column sizing info changes. Required if managing state externally.

---

## Table API

### `setColumnSizing(updater)`

```typescript
setColumnSizing: (updater: Updater<ColumnSizingState>) => void
```

Updates the column sizing state via an updater function.

---

### `setColumnSizingInfo(updater)`

```typescript
setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void
```

Updates the column sizing info state via an updater function.

---

### `resetColumnSizing(defaultState?)`

```typescript
resetColumnSizing: (defaultState?: boolean) => void
```

Resets column sizes to their initial values. Use `defaultState: true` to reset to default values.

---

### `resetHeaderSizeInfo(defaultState?)`

```typescript
resetHeaderSizeInfo: (defaultState?: boolean) => void
```

Resets column sizing info to its initial state.

---

### `getTotalSize()`

```typescript
getTotalSize: () => number;
```

Returns the total size of all leaf columns.

---

### `getLeftTotalSize()`

```typescript
getLeftTotalSize: () => number;
```

Returns the total size of left-pinned columns (if pinning is enabled).

---

### `getCenterTotalSize()`

```typescript
getCenterTotalSize: () => number;
```

Returns the total size of non-pinned (center) columns.

---

### `getRightTotalSize()`

```typescript
getRightTotalSize: () => number;
```

Returns the total size of right-pinned columns (if pinning is enabled).

---

## Related Guides

- [Column Pinning](#column-pinning)
- [Column Visibility](#column-visibility)

```

This documentation structure organizes the API details into clear sections, includes all examples (TypeScript types, function signatures), and maintains the original content's intent while improving readability. The typos (e.g., `enableResizing`) are preserved as in the original input unless explicitly instructed to correct them.
```
