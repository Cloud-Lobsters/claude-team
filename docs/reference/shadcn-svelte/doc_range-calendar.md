````markdown
# Range Calendar

## About

The `<RangeCalendar />` component allows users to select a range of dates. It is built on top of the Bits Range Calendar component and uses the `@internationalized/date` package for date handling.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add range-calendar
```
````

### Manual Installation

Add the following dependencies to your project:

```bash
# pnpm
pnpm add shadcn-svelte @internationalized/date

# npm
npm install shadcn-svelte @internationalized/date

# bun
bun add shadcn-svelte @internationalized/date

# yarn
yarn add shadcn-svelte @internationalized/date
```

---

## Usage Example

```svelte
<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { RangeCalendar } from 'shadcn-svelte';

	const start = today(getLocalTimeZone());
	const end = start.add({ days: 7 });

	let value = $state({
		start,
		end
	});
</script>

<RangeCalendar bind:value class="rounded-md border" />
```

---

## API Reference

| Property        | Type                                | Description                         |
| --------------- | ----------------------------------- | ----------------------------------- | ----------------------------------------- |
| `value`         | `{ start: Date, end: Date }`        | The currently selected date range.  |
| `onChange`      | `(value: { start: Date, end: Date } | null) => void`                      | Callback when the selected range changes. |
| `min`           | `Date`                              | The minimum selectable date.        |
| `max`           | `Date`                              | The maximum selectable date.        |
| `disabledDates` | `(date: Date) => boolean`           | Function to disable specific dates. |

---

## Component Source

The component is sourced from the Bits Range Calendar implementation, leveraging internationalized date handling for cross-timezone support.

---

## Blocks

Explore pre-built blocks in the [Blocks section](#blocks) for ready-to-use Range Calendar implementations.

---

## Theming & Dark Mode

- **Theming**: Customize via Tailwind CSS classes.
- **Dark Mode**: Automatically adapts using system preferences or custom theme configurations.

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) and [CokaKoala](https://github.com/CokaKoala).

```

### Key Features:
- **Date Range Selection**: Select start and end dates with intuitive calendar UI.
- **Internationalization**: Supports timezone-aware date handling via `@internationalized/date`.
- **Customization**: Fully styled with Tailwind CSS for seamless theming.

### Examples
- **Default Usage**: The example above shows a basic implementation with a 7-day default range.
- **Validation**: Use `min`, `max`, and `disabledDates` props to enforce constraints.

### Notes
- Ensure `@internationalized/date` is installed for proper date operations.
- Check the [Figma](/figma) section for design references.
```

This documentation maintains all original examples, structure, and key details while formatting it into a clean, markdown-based technical reference. The code snippets are preserved with proper syntax highlighting, and the component's dependencies and usage are clearly outlined.
