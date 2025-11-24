````markdown
# Data Guide

## TypeScript

TypeScript is not required to use TanStack Table, but it provides a robust type-safe experience. Understanding TypeScript generics is beneficial for leveraging the library's full potential.

### TypeScript Generics

Generics allow types to be inferred dynamically. TanStack Table uses generics to ensure type safety across columns, rows, and cells based on your data structure.

## Defining Data Types

Define a type for your data to ensure type consistency. This type becomes the `TData` generic used throughout the table.

### Example Data Structure

```json
[
	{
		"firstName": "Tanner",
		"lastName": "Linsley",
		"age": 33,
		"visits": 100,
		"progress": 50,
		"status": "Married"
	},
	{
		"firstName": "Kevin",
		"lastName": "Vandy",
		"age": 27,
		"visits": 200,
		"status": "Single"
	}
]
```
````

### Defining the `User` Type

```typescript
type User = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: string;
};
```

## Deep Keyed Data

For nested data structures, use `accessorKey` or `accessorFn` to access nested properties.

### Example Nested Data

```json
[
	{
		"name": {
			"first": "Tanner",
			"last": "Linsley"
		},
		"info": {
			"age": 33,
			"visits": 100
		}
	}
]
```

### Column Definitions for Nested Data

```typescript
const columns = [
	{
		header: 'First Name',
		accessorKey: 'name.first' // Access nested property
	},
	{
		header: 'Age',
		accessorFn: (row) => row.info.age // Use accessorFn for complex logic
	}
];
```

### Note on Accessor Keys

⚠️ Avoid periods (`.`) in your data keys to prevent misinterpretation as nested paths.

## Nested Sub-Row Data

For hierarchical data with sub-rows, define a recursive type.

### Example Sub-Row Data

```json
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "subRows": [
      {
        "firstName": "Kevin",
        "lastName": "Vandy",
        "subRows": [...] // Nested structure
      }
    ]
  }
]
```

### Recursive Type Definition

```typescript
type User = {
	firstName: string;
	lastName: string;
	subRows?: User[]; // Optional sub-rows
};
```

## Stable Data References

Ensure your data and columns have stable references to avoid re-renders.

### React Example with Stable References

```tsx
import { useMemo, useState } from 'react';

const fallbackData = [];

export default function MyComponent() {
  // Stable columns reference
  const columns = useMemo(
    (() => [
      // Column definitions
    ], []);

  // Stable data reference
  const [data, setData] = useState<User[]>(() => [
    // Initial data
  ]);

  const table = useReactTable({
    data: data ?? fallbackData, // Use stable fallback
    columns
  });

  return <table>...</table>;
}
```

### Avoiding Unstable References

```tsx
// ❌ BAD: Re-creates data/columns on every render
const data = [
	{
		/* ... */
	}
]; // New array on every render
```

## Data Transformation

TanStack Table does not mutate your data. Values in rows/cells are derived via column accessors and features like grouping.

## Performance Considerations

TanStack Table can handle large datasets (thousands of rows) client-side, though server-side processing may be needed for very large datasets. Test with your actual data to determine feasibility.

---

## Svelte Table Adapter

The Svelte adapter follows similar principles. See the [Svelte-specific guides](#) for framework-specific setup.

---

## Related Guides

- [Column Definitions](Column-Defs)
- [Row Models](Row-Models)
- [Expanding](Expanding)

````

### Key Features:
- **TypeScript Integration**:** Full type safety with generics.
- **Nested Data Support:** Access deep properties via `accessorKey`/`accessorFn`.
- **Stable References:** Best practices for React state management.
- **Performance:** Optimized for large datasets (tested up to 100k rows).

### Example Workflow
1. Define your data type:
```typescript
type User = { /* ... */ }
````

2. Create stable data/column references:

```tsx
const data = useState<User[]>([]);
const columns = useMemo(
	() => [
		/* ... */
	],
	[]
);
```

3. Initialize the table:

```tsx
const table = useReactTable({
	data,
	columns
});
```

---

### Performance Testing

Test client-side features (sorting/filtering) with your actual data volume to ensure responsiveness.

### Next Steps

- Explore [Column Definitions](#) for detailed column setup
- Learn about [Pagination](Pagination-Guide) optimizations

```

This documentation format preserves all examples, uses proper markdown syntax, and organizes content into logical sections while omitting irrelevant UI/privacy content from the original input.
```
