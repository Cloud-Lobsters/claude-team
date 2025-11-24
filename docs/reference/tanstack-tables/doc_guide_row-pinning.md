```markdown
# Row Pinning Guide

The TanStack Table v8 for Svelte provides robust row pinning capabilities to control row order and layout.

---

## Examples

Check out the implementation details in our example:

- [Row Pinning Example](#)  
  _(Example: `row-pinning`)_

---

## API

### Row Pinning API

The Row Pinning feature is managed through the following APIs:

- **`pin`** property in column definitions to specify pin positions (`top`, `bottom`, or `false`).
- **`getPinnedRows`** method to retrieve pinned rows.
- **`pinningEnabled`** option to enable/disable pinning globally.

---

## Row Pinning Guide

Row Pinning is one of two features that reorder rows, following this priority order:

1. **Row Pinning**:  
   Rows are divided into three groups:

   - **Top Pinned Rows**
   - **Unpinned (Center) Rows** (sorted and filtered)
   - **Bottom Pinned Rows**

2. **Sorting**: Applied to the center (unpinned) rows.

This ensures pinned rows remain fixed at the top/bottom regardless of sorting or filtering.

---

### On this page

- [Examples](#examples)
- [API](#api)
- [Row Pinning Guide](#row-pinning-guide)

---

### Related Features

- [Pagination](/pagination)
- [Row Selection](/row-selection)

---

### Implementation Notes

- Pinned rows are preserved even when sorting or filtering is applied.
- Use `pin` prop in column definitions to specify pin positions.
- Pinned rows can be retrieved via `table.getPinnedRows()`.

---

### GitHub Contribution

[Edit this Row Pinning documentation on GitHub](https://github.com/tanstack/table/blob/main/packages/svelte/docs/row-pinning.md)  
Found a typo? Have a question? [Join our Discord](https://discord.gg/8wKvQb3t) for help!

---

### Version

Framework: Svelte  
Version: Latest
```

---

### Key Features Summary

| Feature              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| **Row Pinning**      | Fix rows to the top/bottom of the table.                |
| **Order Precedence** | Pinned rows are processed before sorting/filtering.     |
| **API Access**       | Methods like `getPinnedRows()` for programmatic access. |

---

### Usage Example

```svelte
<!-- Example of pinning rows -->
<script>
	import { useTable } from '@tanstack/table-core';
	import { createTable } from '@tanstack/svelte-table';

	const columns = [
		{
			accessorKey: 'name',
			header: 'Name',
			// Pin rows with "priority" column value "high" to the top
			pin: (row) => (row.original.priority === 'high' ? 'top' : false)
		}
	];
</script>
```

---

### Permissions

- Requires `pinningEnabled: true` in table options.
- Pinned rows persist across pagination by default.

---

### Next Steps

Explore:

- [Column Definitions](/column-defs) for pin configuration
- [Row Models](/row-models) for data handling
- [Virtualization](/virtualization) for large datasets

```

This documentation focuses on technical implementation details while omitting unrelated privacy/legal content. Examples, APIs, and usage patterns are emphasized with code snippets and configuration guidance.
```
