````markdown
# TanStack Table v8 for Svelte Documentation

## Privacy and Compliance

**Privacy Notice**  
This library and its associated services may store and process personal data, including cookies and device information, for features like personalized content, analytics, and service development. Users may consent or refuse via the provided interface. Consent is stored in the `IABGPP_HDR_GppString` cookie for 13 months. For more details, refer to the privacy settings in the application.

---

## Getting Started

### Installation

```bash
npm install @tanstack/table @tanstack/svelte-table
```
````

### Quick Setup

```svelte
<script>
  import { createTable } from '@tanstack/svelte-table';

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' }
  ];
  const data = [{ name: 'Alice', age: 30 }, { name: 'Bob', age 25 }];

  const table = createTable({
    data,
    columns
  });
</script>

<table>
	{#each table.getRowModel().rows as row}
		<tr>
			{#each row.getVisibleCells() as cell}
				<td>{cell.getValue()}</td>
			{/each}
		</tr>
	{/each}
</table>
```

---

## Core Guides

### Column Definitions

Define columns using `accessorKey` and `header` properties. Example:

```javascript
const columns = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableSorting: true
	}
	// ... other columns
];
```

### Table Instance

The `createTable` function returns a table instance with methods like `getTableInstance()`.

---

## Feature Guides

### Column Ordering

Reorder columns via `updateColumnOrder`:

```javascript
table.setColumnOrder(['id', 'name', 'age']);
```

### Global Filtering

Implement search functionality:

```javascript
const filterValue = $searchInput;
table.setGlobalFilter(filterValue);
```

---

## Core APIs

### Table Instance Methods

- `getTableInstance()`: Returns the current table state.
- `setGlobalFilter(value)`: Applies a global filter.

### Row Methods

- `getRowModel()`: Returns processed rows with pagination/grouping applied.

---

## Examples

### Basic Table

A simple table setup with sorting and filtering.

### Column Groups

Group columns for hierarchical headers:

```svelte
{#each table.getHeaderGroups() as headerGroup}
	<tr>
		{#each headerGroup.headers as header}
			<th>{header.isPlaceholder ? null : header.renderHeader()}</th>
		{/each}
	</tr>
{/each}
```

### Sorting

Enable sorting on columns:

```javascript
const columns = [
	{
		accessorKey: 'name',
		enableSorting: true
	}
];
```

---

## Contributors

### Maintainers

- **Tanner Linsley**: Creator of TanStack Table
- **Kevin Van Cott**: Core Maintainer
- **Riccardo Perra**: Core Maintainer

### Contributors

- **Mokshit Jain**: Feature Development
- **Walker Lockard**: Bug Fixes
- **Tom**: Documentation

---

## Privacy Settings

Users can adjust preferences via the "Privacy" button at the bottom of the page. Consent management applies to 150+ partners and includes options for geolocation and device scanning.

---

## License

Licensed under MIT. See [LICENSE](https://github.com/TanStack/table/blob/main/LICENSE) for details.

```

---

### Notes:
- The privacy notice is included as a disclaimer to inform users about data handling.
- Examples are structured with placeholder code to demonstrate common use cases.
- Contributors are listed with their roles for transparency.
- Core features and APIs are organized under dedicated sections for easy reference.
```

This documentation structure organizes the provided text into standard sections, includes privacy notes, and presents examples with code snippets. The privacy information is retained but formatted as a compliance section, while technical details are structured for developer use.
