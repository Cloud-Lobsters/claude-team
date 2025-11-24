````markdown
# Column Definitions Guide

Column definitions (column defs) are the core building blocks of your table. They define how data is accessed, formatted, and displayed, and determine how the table's underlying data model is structured.

---

## On this page

- [Column Definition Types](#column-definition-types)
- [Column Helpers](#column-helpers)
- [Creating Accessor Columns](#creating-accessor-columns)
- [Unique Column IDs](#unique-column-ids)
- [Column Formatting & Rendering](#column-formatting--rendering)

---

## Column Definition Types

### Accessor Columns

Columns that can be sorted, filtered, or grouped. They derive their value from the row data.  
Example:

```typescript
columnHelper.accessor('firstName', {
	cell: (info) => info.getValue()
});
```
````

### Display Columns

Columns without a data model (e.g., action buttons, icons). Cannot be sorted or filtered.  
Example:

```typescript
columnHelper.display({
  id: 'actions',
  cell: props => <RowActions row={props.row} />,
})
```

### Grouping Columns

Columns that group other columns. Useful for nested headers/footers.  
Example:

```typescript
columnHelper.group({
	header: 'Name',
	columns: [
		/* child columns */
	]
});
```

---

## Column Helpers

The `createColumnHelper` utility ensures type safety when creating columns. Example setup:

```typescript
// Define your row shape
type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

const columnHelper = createColumnHelper<Person>();
```

---

## Creating Accessor Columns

### Object Keys

Use a key from your row type:

```typescript
columnHelper.accessor('firstName'); // Uses 'firstName' as the accessor key
```

### Array Indices

For array-based data:

```typescript
type Sales = [Date, number];
columnHelper.accessor(1); // Accesses the second element of the array
```

### Accessor Functions

For computed values:

```typescript
columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
	id: 'fullName'
});
```

> **Note**  
> Accessor functions **must return a primitive value** (string/number) for sorting/filtering. Complex data requires custom functions.

---

## Unique Column IDs

Column IDs are generated via these rules:

1. **Accessor columns with object keys**: Use the key (e.g., `firstName`).
2. **Accessor columns with array indices**: Use the index (e.g., `1`).
3. **Accessor functions**:
   - Use the provided `id` prop, or
   - Use the header string if no `id` is provided.

---

## Column Formatting & Rendering

### Cell Formatting

Customize cell content using the `cell` prop:

```typescript
columnHelper.accessor('firstName', {
  cell: props => (
    <span>{props.row.original.id} - {props.getValue()}</span>
  ),
});
```

### Aggregated Cell Formatting

For grouped data:

```typescript
columnHelper.accessor('visits', {
  aggregatedCell: info => <b>{info.aggregate}</b>,
});
```

### Header/Footer Formatting

Custom headers/footers:

```typescript
columnHelper.group({
  header: () => <strong>Name</strong>,
  footer: props => props.column.id,
  columns: [...],
});
```

---

## API References

- **Column Definitions**:\*\* `columnHelper.accessor`, `columnHelper.display`, `columnHelper.group`
- **Formatting Props:** `cell`, `header`, `footer`, `aggregatedCell`

> **Note**  
> Column IDs are critical for persistence and state management. Always provide an explicit `id` for custom accessors to avoid conflicts.

---

### Example: Full Column Setup

```typescript
const columns = columnHelper.create([
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', { ... }),
      columnHelper.accessor(row => row.lastName, { id: 'lastName' }),
    ],
  }),
  // ... other columns
]);
```

For more details on headers, rows, and state, see the [Table Instance Guide](#table-instance) or [Row Models](#row-models).

```

This structure maintains all examples, uses markdown formatting, and organizes the content into logical sections. Notes are highlighted with blockquotes, and code examples are in fenced code blocks with TypeScript/JSX syntax.
```
