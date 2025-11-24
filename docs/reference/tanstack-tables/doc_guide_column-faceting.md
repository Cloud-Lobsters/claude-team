````markdown
# Column Faceting Guide

## Column Faceting Overview

Column Faceting allows generating value lists from column data for components like autocomplete filters or range sliders. It enables features such as displaying unique values or min/max ranges based on column data.

---

## Column Faceting Row Models

To use column faceting, include the required row models in your table configuration:

```typescript
// Import necessary row models
import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedMinMaxValues,
	getFacetedUniqueValues
} from '@tanstack/svelte-table-core';

const table = useReactTable({
	columns,
	data,
	getCoreRowModel: getCoreRowModel(),
	getFacetedRowModel: getFacetedRowModel(), // Required for all faceting
	getFacetedMinMaxValues: getFacetedMinMaxValues(), // For min/max values
	getFacetedUniqueValues: getFacetedUniqueValues() // For unique values
});
```
````

---

## Using Faceted Row Models

Access faceted values via column instance methods:

### Example 1: Unique Values for Autocomplete

```typescript
// Get sorted list of unique values (e.g., for autocomplete)
const autoCompleteSuggestions = Array.from(column.getFacetedUniqueValues().keys())
	.sort()
	.slice(0, 5000);
```

### Example 2: Min/Max Values for Range Slider

```typescript
// Get min/max values for a numeric column
const [min, max] = column.getFacetedMinMaxValues() ?? [0, 1];
```

---

## Custom (Server-Side) Faceting

Implement server-side faceting by overriding default methods:

```typescript
// Example using React Query for server-side data
const facetingQuery = useQuery(...);

const table = useReactTable({
  columns,
  data,
  getFacetedUniqueValues: (table, columnId) => {
    const uniqueValues = facetingQuery.data?.uniqueValues ?? new Map();
    return uniqueValues;
  },
  getFacetedMinMaxValues: (table, columnId) => {
    const { min, max } = facetingQuery.data?.stats ?? { min: 0, max: 1 };
    return [min, max];
  },
});
```

---

## Key Features

- **Client-Side Faceting**: Built-in support for unique values and min/max calculations
- **Server-Side Support**: Override default methods for large datasets
- **Flexible Integration**: Works with existing filtering and sorting features

---

## API References

| Method                     | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `getFacetedUniqueValues()` | Returns a `Map` of unique values and their counts |
| `getFacetedMinMaxValues()` | Returns a `[min, max]` tuple for numeric columns  |
| `getFacetedRowModel()`     | Base method required for all faceting operations  |

---

## Implementation Steps

1. **Import Row Models**  
   Import required row models from `@tanstack/svelte-table-core`

2. **Configure Table Options**  
   Add row models to your table configuration

3. **Access Faceted Values**  
   Use column instance methods to retrieve computed values

4. **Customize (Optional)**  
   Override default methods for server-side implementations

---

## Example Workflow

```typescript
// Example: Building a filter component
function FilterComponent({ column }) {
  const values = Array.from(column.getFacetedUniqueValues().entries())
    .sort()
    .slice(0, 500);

  return (
    <select>
      {values.map(([value, count]) => (
        <option value={value}>{`${value} (${count})`}</option>
      ))}
    </select>
  );
}
```

---

## Compatibility Notes

- Requires TanStack Table v8
- Works with Svelte framework
- Server-side implementations require manual state management

```

This documentation format:
- Maintains all original examples and code snippets
- Organizes content into logical sections
- Uses markdown syntax for readability
- Highlights key methods and configuration steps
- Includes both client and server-side implementation examples
- Preserves the original API references
- Uses code blocks with proper syntax highlighting
- Maintains the core concepts from the original guide
```
