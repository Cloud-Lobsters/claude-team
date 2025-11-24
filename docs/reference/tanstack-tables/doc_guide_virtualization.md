````markdown
# TanStack Table Virtualization Guide

## Examples

- **Virtualized Columns**: Demonstrates column virtualization for handling large datasets horizontally.
- **Virtualized Rows (Dynamic Row Height)**: Shows row virtualization with rows of varying heights.
- **Virtualized Rows (Fixed Row Height)**: Example of row virtualization with consistent row heights for optimized performance.
- **Virtualized Infinite Scrolling**: Implements infinite scrolling with virtualized rows to load data on demand.

---

## Virtualization Guide

TanStack Table does not include built-in virtualization features, but it can be seamlessly integrated with libraries like **TanStack Virtual** or **react-window**. Below are strategies for combining TanStack Table with virtualization:

### Key Integration Steps

1. **Setup Virtualization Library**  
   Choose a virtualization library (e.g., `@tanstack/react-virtual` for React/Svelte) and set up a virtualized container.

2. **Sync Table Data with Virtualization**  
   Use the Table's `rows` or `columns` to determine which items to render within the virtualized viewport.

3. **Handle Scroll Events**  
   Update the Table's state (e.g., pagination, filtering) in response to scroll events from the virtualized container.

---

### Example Workflow with TanStack Virtual

```javascript
// Pseudocode for row virtualization
const virtualizer = useVirtual({
	size: table.rows.length,
	parentRef: tableInstance.getScrollRef()
});

return (
	<div ref={virtualizer.measureRef}>
		<VirtualList
			items={table.rows.slice(virtualizer.startIndex, virtualizer.endIndex)}
			// Render rows using TanStack Table's row components
		/>
	</div>
);
```
````

---

### Custom Features for Virtualization

- **Column Virtualization**: Use `columnDef.virtual` to mark columns for virtualization.
- **Row Virtualization**: Implement `rowVirtualizer` to manage dynamic or fixed row heights.
- **Infinite Scrolling**: Hook into scroll events to load additional data via the Table's `setPageSize` or `setPageIndex` methods.

---

## Sorting & Virtualization

Ensure sorting logic is applied to the full dataset before virtualization to maintain correct ordering in the rendered viewport.

---

## Custom Features

For advanced use cases, create custom features to handle:

- **Dynamic Row Heights**: Calculate row heights and update the virtualizer's `itemSize` prop.
- **Scroll Sync**: Link the virtualizer's scroll position to the Table's state.

---

## Resources

- **GitHub**: [View Virtualization Examples](https://github.com/TanStack/table/tree/main/examples)
- **Documentation**: [TanStack Virtual Documentation](https://tanstack.com/virtual)

> **Note**: Your preferences for virtualization settings are stored in the `IABGPP_HDR_GppString` cookie for 13 months and can be adjusted via the "Privacy" button on this site.

```

This documentation retains all original examples, focuses on virtualization strategies, and adheres to the structure of the source material while omitting non-essential UI elements. The privacy notice is preserved as a note at the end to comply with the original text's requirements.
```
