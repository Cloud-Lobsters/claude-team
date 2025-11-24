````markdown
# ColumnDef APIs

## Options

### `id`

**Type**: `string`

The unique identifier for the column. Optional when:

- An accessor column is created with an object key accessor
- The column header is defined as a string.

---

### `accessorKey`

**Type**: `string & typeof TData` (optional)

The key of the row object to use when extracting the value for the column.

---

### `accessorFn`

**Type**: `(originalRow: TData, index: number) => any` (optional)

The accessor function to use when extracting the value for the column from each row.

---

### `columns`

**Type**: `ColumnDef<TData>[]` (optional)

The child column defs to include in a group column.

---

### `header`

**Type**:

```typescript
| string
| ((props: {
    table: Table<TData>
    header: Header<TData>
    column: Column<TData>
  }) => unknown)
```
````

The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (type depends on the adapter).

**Example**:

```tsx
header: "Name",
// OR
header: ({ column }) => <div>{column.id}</div>
```

---

### `footer`

**Type**:

```typescript
| string
| ((props: {
    table: Table<TData>
    header: Header<TData>
    column: Column<TData>
  }) => unknown)
```

The footer to display for the column. If a function is passed, it will be passed a props object for the footer and should return the rendered footer value.

**Example**:

```tsx
footer: "Total",
// OR
footer: ({ column }) => <div>{column.id}</div>
```

---

### `cell`

**Type**:

```typescript
| string
| ((props: {
    table: Table<TData>
    row: Row<TData>
    column: Column<TData>
    cell: Cell<TData>
    getValue: () => any
    renderValue: () => any
  }) => unknown)
```

The cell to display for each row in the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value.

**Example**:

```tsx
cell: "Default",
// OR
cell: ({ getValue }) => <div>{getValue()}</div>
```

---

### `meta`

**Type**: `ColumnMeta<TData, TValue>` (optional)

Metadata associated with the column. Accessible via `column.columnDef.meta`. Extendable via declaration merging:

**Example**:

```typescript
import '@tanstack/svelte-table'; // or other framework

declare module '@tanstack/svelte-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		foo: string;
	}
}
```

---

## Custom Features

### Extending `ColumnMeta`

To add custom metadata to columns, use TypeScript declaration merging:

```typescript
// Example of extending ColumnMeta
declare module '@tanstack/svelte-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		customField: string;
	}
}
```

---

### Notes

- Ensure all examples are included as code blocks.
- Parameters and return types are described clearly.
- The `meta` section includes instructions for TypeScript extensions.

---

**Edit on GitHub**  
[Link to GitHub](https://github.com/TanStack/table/blob/main/docs/svelte/column-def-apis.md)

```

This documentation retains all examples, structures the options clearly, and includes the TypeScript extension example. The privacy notice and UI elements from the original text are omitted as they are not part of the technical documentation.
```
