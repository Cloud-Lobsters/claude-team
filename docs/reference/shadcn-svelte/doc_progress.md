````markdown
# Progress Component

The Progress component displays an indicator showing the completion progress of a task, typically rendered as a progress bar.

---

## Installation

### Using CLI

```bash
pnpm dlx shadcn-svelte@latest add progress
```
````

### Manual Installation

Import the component directly from the package:

```svelte
<script lang="ts">
	import { Progress } from '$lib/components/ui/progress/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Progress } from '$lib/components/ui/progress/index.js';
</script>

<Progress value={33} max={100} class="w-[60%]" />
```

### Dynamic Example

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { $state, Progress } from '$lib/components/ui/progress/index.js';

	let value = $state(13);

	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<Progress {value} max={100} class="w-[60%]" />
```

---

## Props

| Prop    | Description                   | Type     | Default |
| ------- | ----------------------------- | -------- | ------- |
| `value` | Current progress value        | `number` | `0`     |
| `max`   | Maximum value of the progress | `number` | `100`   |
| `class` | Custom CSS class for styling  | `string` | -       |

---

## Styling

- Use the `class` prop to customize the width or appearance:
  ```svelte
  <Progress value={50} class="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
  ```

---

## Theming

The component is designed to work with Tailwind CSS by default. Adjust colors and sizes using utility classes.

---

## Examples

### Basic Progress Bar

```svelte
<Progress value={40} class="w-full mb-4" />
<Progress value={75} class="w-1/2" />
```

### Animated Progress

```svelte
<script>
	let progress = 0;
	setInterval(() => (progress += 1), 100);
</script>

<Progress {progress} max={100} class="w-80" />
```

---

## Props Reference

- **value**: Current progress value (required if not using reactive state).
- **max**: Total possible value (default: `100`).
- **class**: Apply Tailwind classes for customization.

---

## Notes

- The component automatically calculates the percentage based on `value/max`.
- Use `$state` for reactive updates in Svelte stores if needed.

```

This documentation format:
- Maintains all original examples
- Organizes content into logical sections
- Includes prop descriptions and usage patterns
- Shows both static and dynamic usage scenarios
- Preserves the original code snippets
- Uses proper markdown syntax for readability
- Maintains the component's technical details
- Follows standard component documentation structure
```
