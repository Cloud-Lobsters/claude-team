````markdown
# Migrating to TanStack Table v8

## Table of Contents

- [Notable Changes](#notable-changes)
- [Installation](#installation)
- [Updating Table Options](#updating-table-options)
- [Column Definitions](#column-definitions)
- [Migrating Table Markup](#migrating-table-markup)
- [Filter Function Changes](#filter-function-changes)
- [Footer & Additional Notes](#footer--additional-notes)

---

## Notable Changes

- Full rewrite in TypeScript with included types.
- Removed plugin system; replaced with tree-shakable row model imports.
- New features like column pinning.
- Improved state management and server-side support.
- Framework-agnostic core with adapters for React, Svelte, Vue, etc.

---

## Installation

### Uninstall Old Packages

```bash
npm uninstall react-table @types/react-table
```
````

### Install New Package

```bash
npm install @tanstack/react-table
```

### Import Changes

```tsx
// Before
import { useTable, usePagination, useSortBy } from 'react-table';

// After
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel
} from '@tanstack/react-table';
```

---

## Updating Table Options

**Old Syntax**

```tsx
const tableInstance = useTable({ columns, data }, useSortBy, usePagination);
```

**New Syntax**

```tsx
const tableInstance = useReactTable({
	columns,
	data,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel()
});
```

---

## Column Definitions

### Accessor Changes

| Old Property    | New Property                  |
| --------------- | ----------------------------- |
| `accessor`      | `accessorKey` or `accessorFn` |
| `width`         | `size`                        |
| `disableSortBy` | `enableSorting`               |

**Example Column Definitions**

```tsx
// Using columnHelper for better TypeScript
const columns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
  }),
  columnHelper.accessor(row => row.lastName, {
    header: () => <span>Last Name</span>,
  }),
];

// Alternative syntax without columnHelper
{
  accessorKey: 'firstName',
  header: 'First Name',
},
{
  accessorFn: row => row.lastName,
  header: () => <span>Last Name</span>,
}
```

---

## Migrating Table Markup

### Header Rendering

```tsx
// Before
<th {...header.getHeaderProps()}>{cell.render('Header')}</th>

// After
<th
  colSpan={header.colSpan}
  key={column.id}
>
  {flexRender(
    header.column.columnDef.header,
    header.getContext()
  }
</th>
```

### Cell Rendering

```tsx
// Before
<td {...cell.getCellProps()}>{cell.render('Cell')}</td>

// After
<td key={cell.id}>
  {flexRender(
    cell.column.columnDef.cell,
    cell.getContext()
  }
</td>
```

### Row Selection Example

```tsx
// Old Header
Header: ({ getToggleAllRowsSelectedProps }) => (
  <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
),

// New Header
header: ({ table }) => (
  <Checkbox
    checked={table.getIsAllRowsSelected()}
    indeterminate={table.getIsSomeRowsSelected()}
    onChange={table.getToggleAllRowsSelectedHandler()}
  />
),

// Old Cell
Cell: ({ row }) => (
  <input type="checkbox" {...row.getToggleRowSelectedProps()} />
),

// New Cell
cell: ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    disabled={!row.getCanSelect()}
    indeterminate={row.getIsSomeSelected()}
    onChange={row.getToggleSelectedHandler()}
  />
),
```

---

## Filter Function Changes

**Old Filter Type**

```tsx
(rows: Row[], id: string, filterValue: any) => Row[]
```

**New Filter Function**

```tsx
(row: Row, id: string, filterValue: any) => boolean;
```

---

## Footer & Additional Notes

### Important Notes

- Manual key management required for rows/cells.
- No default styles/accessibility attributes; must be added manually.
- Preferences stored in `IABGPP_HDR_GppString` cookie for 13 months.

### Privacy Notice

- Data processing by 1507 partners requires explicit consent.
- Geolocation and device scanning require user permission.

### Support

- [Contribute to the guide](https://github.com/tanstack/table)
- Report issues on GitHub or join Discord for help.

---

## Footer & Newsletter

**Partners & Subscriptions**

- _Your weekly dose of JavaScript news. Delivered every Monday to over 100,000 devs._
- [Subscribe to Bytes](#)  
  _No spam. Unsubscribe anytime._

```

This documentation retains all original examples, restructures the content into a clear markdown format, and maintains the key migration steps. The code snippets are formatted with syntax highlighting, and important changes are highlighted through tables, code comparisons, and bullet points for readability.
```
