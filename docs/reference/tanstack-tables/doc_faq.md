````markdown
# TanStack Table v8 FAQ

## How do I stop infinite rendering loops?

### Pitfall 1: Creating new columns or data on every render

When columns or data are redefined on every render, React detects a new reference, triggering infinite re-renders.

#### Bad Example:

```javascript
export default function MyComponent() {
	const columns = [
		/* ... */
	]; // New array on every render
	const data = [
		/* ... */
	]; // New array on every render
	const table = useReactTable({ columns, data });
	return <table>...</table>;
}
```
````

### Solution 1: Use Stable References

Use `useMemo` or `useState` to ensure stable references.

#### Good Example:

```javascript
export default function MyComponent() {
	const columns = useMemo(
		() => [
			/* ... */
		],
		[]
	);
	const [data, setData] = useState(() => [
		/* ... */
	]);
	const table = useReactTable({ columns, data });
	return <table>...</table>;
}
```

### Pitfall 2: Mutating columns/data in place

Mutating data inline (e.g., `data.filter()`) creates new references.

#### Bad Example:

```javascript
useReactTable({
	data: data?.filter((d) => d.isActive) ?? [], // Creates new array on every render
	columns
});
```

### Solution 2: Memoize Transformations

Use `useMemo` to stabilize transformed data.

#### Good Example:

```javascript
const filteredData = useMemo(() => data?.filter((d) => d.isActive) ?? [], [data]);
useReactTable({ data: filteredData, columns });
```

### React Forget Note

Future React versions may handle this automatically, but for now, memoization is required.

---

## How do I stop table state from automatically resetting when data changes?

### Solution: Disable Auto-Reset

Use `autoReset*` options with a flag to prevent state resets during data updates.

#### Example:

```javascript
const [data, setData] = useState([]);
const skipPageResetRef = useRef();

const updateData = (newData) => {
	skipPageResetRef.current = true;
	setData(newData);
};

useEffect(() => {
	skipPageResetRef.current = false;
}, [data]);

useReactTable({
	/* ... */
	autoResetPageIndex: !skipPageResetRef.current,
	autoResetExpanded: !skipPageResetRef.current
});
```

This prevents state (like pagination or expansion) from resetting when data updates.

```

This documentation format:
- Organizes content into clear sections with headers
- Preserves all original code examples
- Uses markdown syntax for code blocks and formatting
- Highlights pitfalls and solutions
- Maintains the key technical information from the original text
- Removes non-essential content like the privacy notice and menu items
- Uses consistent syntax highlighting for code snippets
- Adds explanatory headers and structure for better readability
- Maintains the React Forget note as a side note
- Includes the autoReset example for state preservation
- Uses proper markdown formatting for code blocks and lists
- Ensures all critical examples from the original text are retained
- Uses clear section headers for each FAQ question
- Maintains the original code examples' structure and content
- Adds brief explanations to clarify the examples
- Uses consistent terminology from the original documentation
```
