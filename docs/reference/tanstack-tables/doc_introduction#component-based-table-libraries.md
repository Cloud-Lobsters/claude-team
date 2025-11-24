````markdown
# TanStack Table Documentation

## Overview

TanStack Table is a **headless UI library** for building powerful tables and datagrids for TypeScript/JavaScript, supporting frameworks like React, Vue, Solid, Qwik, and Svelte. It provides logic, state management, and APIs without enforcing a specific UI, enabling full customization.

---

## What is "Headless" UI?

Headless UI libraries focus on logic and state management, decoupled from UI components. Key goals include:

- Managing complex data processing and state
- Decoupling logic from UI for modularity and reusability
- Allowing full control over design and implementation

---

## Component-based vs Headless Libraries

### Component-based Table Libraries

- **Examples**: AG Grid
- **Pros**:
  - Ready-to use components and styles
  - Quick setup with themes
- **Cons**:
  - Larger bundle sizes
  - Less control over markup and styles

### Headless Table Libraries

- **Examples**: TanStack Table
- **Pros**:
  - Smaller bundle sizes
  - Full control over UI and styles
  - Portable across frameworks
- **Cons**:
  - Requires more setup
  - No default UI components provided

---

## Choosing the Right Library

- **Choose component-based** if you need quick setup and ready UI.
- **Choose headless** if you need customization and lightweight solutions.

---

## Getting Started

### Installation

```bash
npm install tanstack-table
```
````

### Supported Frameworks

- React
- Vue
- Solid
- Qwik
- Svelte

---

## Key Features

- **Headless Architecture**: Logic decoupled from UI
- **Cross-Framework Support**: Works with major frameworks
- **Customizability**: Full control over markup and styles
- **Lightweight**: Minimal bundle size

---

## Links

- [Edit on GitHub](https://github.com/tanstack/table)
- [Discussions](https://discord.gg/tanstack)
- [Partners](https://tanstack.com/partners)

---

## Examples

### Basic Usage

```javascript
// Example of using TanStack Table (simplified)
import { useTable } from 'tanstack-table';

function MyTable({ columns, data }) {
	const table = useTable({
		columns,
		data
	});
	// ... rest of implementation
}
```

### Column Groups

- Group columns for hierarchical data
- Example: `columnGroups` prop for nested headers

### Sorting & Filtering

- Built-in sorting and filtering logic
- Customizable via column definitions

---

## Contributing

- **Contributors**: View contributors on [GitHub](https://github.com/tanstack/table/graphs/contributors)
- **Enterprise Features**: AG Grid integration available

---

## Notes

- **Privacy Policy**: See [Privacy Notice](#privacy-notice) for data usage details
- **Updates**: Subscribe to [TanStack Bytes](https://tanstack.com/bytes) for JS news

---

## Privacy Notice

> We and our partners store and/or access information on a device, such as cookies... [Full text as per original privacy notice]

---

## Support

- **GitHub**: [Report issues](https://github.com/tanstack/table/issues)
