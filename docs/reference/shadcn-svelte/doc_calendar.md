# Calendar Component

The `<Calendar>` component allows users to select dates and is built on top of the Bits UI Calendar component, leveraging the `@internationalized/date` package for date handling.

---

## Installation

### Using CLI

```bash
pnpm dlx shadcn-svelte@latest add calendar
```

### Manual Installation

Import the component from `@shadcn/svelte` or your local registry.

---

## Examples

### Date Picker

```svelte
<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';

	let value = today(getLocalTimeZone());
</script>

<Calendar type="single" bind:value class="rounded-md border shadow-sm" captionLayout="dropdown" />
```

### Range Calendar

```svelte
<Calendar type="range" bind:value class="rounded-md border shadow-sm" />
```

### Month and Year Selector

```svelte
<Calendar type="month-and-year" bind:value class="rounded-md border shadow-sm" />
```

### Date of Birth Picker

```svelte
<Calendar type="single" bind:value class="rounded-md border shadow-sm">
	<div slot="header">Date of birth</div>
</Calendar>
```

### Date and Time Picker

```svelte
<Calendar type="single" bind:value class="rounded-md border shadow-sm">
	<div slot="header">Date</div>
</Calendar>

<!-- Time component would be added here -->
```

### Natural Language Picker

Uses the `chrono-node` library to parse natural language dates.

```svelte
<script>
	import chrono from 'chrono-node';

	function parseDate(input) {
		const result = chrono.parse(input)[0];
		return result.start?.date();
	}
</script>

<Calendar type="single" bind:value class="rounded-md border shadow-sm">
	<div slot="header">Schedule Date</div>
</Calendar>

<p>Your post will be published on {value.toLocaleDateString()}.</p>
```

---

## Upgrade Guide

To upgrade to the latest version:

```bash
pnpm dlx shadcn-svelte@latest add calendar
```

Follow prompts to overwrite files. Merge any custom changes if needed.

To install new blocks:

```bash
pnpm dlx shadcn-svelte@latest add calendar-02
```

---

## Theming

The component uses Tailwind CSS for styling. Customize via utility classes or Tailwind config.

---

## Dependencies

- `@internationalized/date` for date handling
- `chrono-node` (required for natural language parsing)

---

## API Reference

- **`type`**: `single` | `range` | `month-and-year` (default: `single`)
- **`bind:value`**: Binds to the selected date(s)
- **`captionLayout`**: Controls the header layout (e.g., `dropdown` for month/year navigation)

---

## Blocks Library

Explore pre-built calendar blocks in the [Blocks Library](Blocks Library page).

---

## Credits

Built by [shadcn](https://shadcn.com). Ported to Svelte by Huntabyte & CokaKoala.
