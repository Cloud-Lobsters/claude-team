````markdown
# Column Faceting APIs

## Column API

### `getFacetedRowModel`

```tsx
type getFacetedRowModel = () => RowModel<TData>;
```
````

⚠️ Requires that you pass a valid `getFacetedRowModel` function to `options.facetedRowModel`. A default implementation is provided via the exported `getFacetedRowModel` function.

**Description**:  
Returns the row model with all other column filters applied, excluding its own filter. Useful for displaying faceted result counts.

---

### `getFacetedUniqueValues`

```tsx
getFacetedUniqueValues: () => Map<any, number>;
```

⚠️ Requires that you pass a valid `getFacetedUniqueValues` function to `options.getFacetedUniqueValues`. A default implementation is provided via the exported `getFacetedUniqueValues` function.

**Description**:  
A function that computes and returns a `Map` of unique values and their occurrences derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.

---

### `getFacetedMinMaxValues`

```tsx
getFacetedMinMaxValues: () => [min: number, max: number];
```

⚠️ Requires that you pass a valid `getFacetedMinMaxValues` function to `options.getFacetedMinMaxValues`. A default implementation is provided via the exported `getFacetedMinMaxValues` function.

**Description**:  
A function that computes and returns a min/max tuple derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.

---

## Table Options

### `getColumnFacetedRowModel`

```tsx
getColumnFacetedRowModel: (columnId: string) => RowModel<TData>;
```

**Description**:  
Returns the faceted row model for a given `columnId`.

---

## On this page

- Column API
  - `getFacetedRowModel`
  - `getFacetedUniqueValues`
  - `getFacetedMinMaxValues`
- Table Options
  - `getColumnFacetedRowModel`

---

**Edit on GitHub**  
[Link to GitHub](https://github.com/your-repo/edit/main/docs/column-faceting-apis.md)

---

**Note**:  
Ensure you import the default implementations if not providing custom functions:

```tsx
import {
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues
} from '@tanstack/table-core';
```

For usage examples, see the [Column Faceting Examples](#examples) section.

```

This structure maintains all examples and requirements while organizing the documentation into clear sections. The privacy policy text was omitted as it's unrelated to the API documentation, focusing instead on the technical details and examples provided.
```
