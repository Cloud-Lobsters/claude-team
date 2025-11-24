````markdown
# Column Sizing Guide

The column sizing feature allows you to specify column widths and enable dynamic resizing. This guide covers configuration, APIs, and best practices for implementing column resizing in TanStack Table v8 with Svelte.

---

## Column Widths

### Default Column Sizing

Columns have default sizing values:

```typescript
export const defaultColumnSizing = {
	size: 150,
	minSize: 20,
	maxSize: Number.MAX_SAFE_INTEGER
};
```
````

### Overriding Defaults

Override defaults using `defaultColumn` or individual column definitions:

```typescript
const columns = [
	{
		accessorKey: 'id',
		size: 200,
		enableResizing: false
	}
	// ...
];

const table = useReactTable({
	defaultColumn: {
		size: 200,
		minSize: 50,
		maxSize: 500
	}
});
```

Column sizes are stored as pixel values in the table state. Apply them via CSS variables or inline styles:

```svelte
<th style:width={header.getSize() + 'px'}>
	<!-- ... -->
</th>
```

---

## Column Resizing

### Enabling Column Resizing

Resizing is enabled by default. Disable globally or per-column:

```typescript
// Disable globally
useReactTable({ enableColumnResizing: false });

// Disable per-column
{
  accessorKey: 'col1',
  enableResizing: false,
}
```

### Resize Mode

Configure how column sizes update during dragging:

```typescript
// Default: 'onEnd' (updates on drag end)
columnResizeMode: 'onEnd',

// 'onChange' (updates during dragging)
columnResizeMode: 'onChange',
```

### RTL Support

Set direction for right-to left layouts:

```typescript
columnResizeDirection: 'rtl',
```

---

## Connecting to UI

### Column Resize Handler

Use `getResizeHandler` for drag interactions:

```svelte
<ColumnResizeHandle
	on:click={header.getResizeHandler()}
	on:touchstart={header.getResizeHandler()}
/>
```

### Resize Indicator

Use `columnSizingInfo` to show a visual indicator:

```svelte
{#if header.column.getIsResizing()}
	<div
		style={{
			transform: `translateX(${table.getState.columnSizingInfo.deltaOffset}px)`
		}}
	/>
{/if}
```

---

## Performance Tips

For large tables in React:

1. **Memoize column widths**: Calculate widths once per render
2. **Memoize table body**: Use `React.memo` during resizing
3. **Use CSS variables**: Prefer CSS variables over inline styles for better performance

Example of using CSS variables:

```svelte
<th>
	<style>
    --column-width: {header.getSize()}px;
	</style>
</th>

<style>
	:global(.table-cell) {
		width: var(--column-width);
	}
</style>
```

---

## API References

### Column Size APIs

- `header.getSize()`
- `column.getSize()`
- `cell.column.getSize()`

### Column Resize APIs

- `header.getResizeHandler()`
- `column.getIsResizing()`
- `table.getState().columnSizingInfo`

---

## Examples

- [Basic Column Sizing](#column-sizing)
- [Performant Resizing](#advanced-column-resizing-performance)
- [RTL Support](#column-resize-direction)

---

## Notes

- Column sizes are stored as pixel values in the table state.
- Performance optimizations are critical for React users to maintain 60 FPS.
- Column sizing state applies to the current website only and persists for 13 months via cookies.

```

### Key Features:
- **Structure**: Organized into sections with clear headers and subheaders.
- **Code Blocks**: Language-specific syntax highlighting for TypeScript/JSX/Svelte.
- **Performance Tips**: Highlighted with actionable steps.
- **Examples**: Listed at the end with links to relevant sections.
- **API References**: Clear listing of available methods and properties.
- **Notes**: Important notes about state persistence and performance.

This structure ensures all original content is preserved while making the documentation easy to navigate and implement.
```
