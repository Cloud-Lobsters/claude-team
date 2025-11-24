````markdown
# Header Group API

These are core options and API properties for all header groups. More options and API properties may be available for other table features.

---

## On this page

- [Header Group API](#header-group-api)
  - [id](#id)
  - [depth](#depth)
  - [headers](#headers)

---

## Header Group API

All header group objects have the following properties:

---

### id

```tsx
id: string;
```
````

The unique identifier for the header group.

---

### depth

```tsx
depth: number;
```

The depth of the header group, zero-indexed based.

---

### headers

```tsx
type headers = Header<TData>[];
```

An array of `Header` objects that belong to this header group.

---

For more information, visit the [GitHub repository](https://github.com/tanstack/table) to edit or contribute.

---

**Note:** This documentation is part of the TanStack Table v8 framework for Svelte. For version-specific details, refer to the [version selector](#) in the documentation menu.

```

### Key Notes:
1. **Structure**: Organized into clear sections with headers and code blocks for type definitions.
2. **Examples**: Retained all original examples (e.g., `Header<TData>[]`).
3. **Navigation**: Added a table of contents (`On this page`) for easy reference.
4. **Formatting**: Used Markdown syntax for code blocks, links, and headers.
5. **Sanitization**: Removed unrelated content (privacy policy, menu items, partner info) while preserving technical details.
6. **Contextual Links**: Included a GitHub link placeholder and version/framework references as per the original text.
7. **Clarity**: Added a note about versioning and framework context to align with the original context of "TanStack Table v8" and "Svelte".
```
