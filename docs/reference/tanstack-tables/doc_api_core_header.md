````markdown
# TanStack Table v8 Documentation (Svelte Adapter)

## On This Page

- [Header API](#header-api)
  - [Properties](#properties)
  - [Methods](#methods)
- [Table API](#table-api)
  - [Methods](#methods-1)

---

## Header API

### Properties

#### `id`

- **Type**: `string`
- **Description**: The unique identifier for the header.

#### `index`

- **Type**: `number`
- **Description**: The index for the header within the header group.

#### `depth`

- **Type**: `number`
- **Description**: The depth of the header, zero-indexed based on hierarchy.

#### `column`

- **Type**: `Column<TData>`
- **Description**: The header's associated Column object.

#### `headerGroup`

- **Type**: `HeaderGroup<TData>`
- **Description**: The header's associated HeaderGroup object.

#### `subHeaders`

- **Type**: `Header<TData>[]`
- **Description**: The header's hierarchical sub/child headers. Empty if the column is a leaf column.

#### `colSpan`

- **Type**: `number`
- **Description**: The column span for the header.

#### `rowSpan`

- **Type**: `number`
- **Description**: The row span for the header.

#### `getLeafHeaders()`

- **Type**: `() => Header<TData>[]`
- **Description**: Returns leaf headers nested under this header.

#### `isPlaceholder`

- **Type**: `boolean`
- **Description**: Indicates if the header is a placeholder.

#### `placeholderId`

- **Type**: `string | undefined`
- **Description**: Unique ID for placeholder headers (non-conflicting with existing headers).

#### `getContext()`

- **Type**: `() => { table: Table<TData>; header: Header<TData, TValue>; column: Column<TData, TValue> }`
- **Example**:
  ```tsx
  // Render using flexRender
  {#each table.getHeaderGroups() as headerGroup}
    {#each headerGroup.headers as header}
      {flexRender(header.column.columnDef.header, header.getContext())}
    {/each}
  {/each}
  ```
````

---

## Table API

### Methods

#### `getHeaderGroups()`

- **Type**: `() => HeaderGroup<TData>[]`
- **Description**: Returns all header groups for the table.

#### `getLeftHeaderGroups()`

- **Type**: `() => HeaderGroup<TData>[]`
- **Description**: Returns header groups for left-pinned columns (if pinning is enabled).

#### `getCenterHeaderGroups()`

- **Type**: `() => HeaderGroup<TData>[]`
- **Description**: Returns header groups for non-pinned columns (if pinning is enabled).

#### `getRightHeaderGroups()`

- **Type**: `() => HeaderGroup<TData>[]`
- **Description**: Returns header groups for right-pinned columns (if pinning is enabled).

#### `getFooterGroups()`

- **Type**: `() => HeaderGroup<TData>[]`
- **Description**: Returns all footer groups for the table.

#### `getFlatHeaders()`

- **Type**: `() => Header<TData, unknown>[]`
- **Description**: Returns all headers (including parent headers) for all columns.

#### `getLeafHeaders()`

- **Type**: `() => Header<TData, unknown>[]`
- **Description**: Returns headers for leaf columns (excluding parent headers).

---

## Additional Methods (Pinning-Specific)

- `getLeftFlatHeaders()`, `getCenterFlatHeaders()`, `getRightFlatHeaders()`
- `getLeftLeafHeaders()`, `getCenterLeafHeaders()`, `getRightLeafHeaders()`

---

## Notes

- **Edit on GitHub**: [Link to GitHub](https://github.com/your-repo) (replace with actual link if available).
- **Examples**: All examples from the original text are preserved in code blocks above.

---

### Example Usage of `getContext()`

```tsx
// Example of rendering headers with context
{#each table.getHeaderGroups() as headerGroup}
  <tr>
    {#each headerGroup.headers as header}
      <th>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </th>
    {/each}
  </tr>
{/each}
```

This documentation covers core APIs for working with headers, header groups, and table state in the TanStack Table v8 Svelte adapter. For more details, refer to the [GitHub repository](#) or official guides.

```

---

### Key Features:
1. **Structured Layout**: Organized into clear sections for headers, table methods, and examples.
2. **Code Examples**: Preserved all original code snippets (e.g., `flexRender` usage).
3. **Type Definitions**: Explicit TypeScript types for each property/method.
4. **Pinning Support**: Explicitly called out pinning-related methods.
5. **Navigation**: TOC at the top for quick reference.

The privacy policy and unrelated sections (partners, subscribe, etc.) were sanitized out as instructed.
```
