# Sonner Component Documentation

## About

The Sonner component is an opinionated toast implementation for Svelte, ported from the original React version by [Emil Kowalski](https://github.com/emilkowalski/sonner). It provides a simple and customizable way to display notifications in your Svelte applications.

---

## Installation

### Using CLI

Run the following command to install via the Shadcn-Svelte CLI:

```bash
pnpm dlx shadcn-svelte@latest add sonner
```

### Manual Installation

1. Install dependencies:
   ```bash
   pnpm add svelte-sonner
   ```
2. Import and use the `Toaster` component in your layout:

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
</script>

<Toaster />

{@html /* Your page content */}
```

---

## Usage

Import the `toast` function and trigger toasts via buttons or other events:

```svelte
<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button on:click={() => toast('Hello world')}>Show Toast</Button>
```

### Example with Advanced Options

```svelte
<Button
	on:click={() =>
		toast.success('Event has been created', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			action: {
				label: 'Undo',
				onClick: () => console.info('Undo')
			}
		})}
>
	Show Toast with Action
</Button>
```

---

## Dark Mode Configuration

Sonner automatically detects the system's preferred color scheme. To override this:

1. **Hardcode theme**:
   ```svelte
   <Toaster theme="dark" />
   ```
2. **Use `mode-watcher` for dynamic theme**:  
   Ensure `mode-watcher` is installed and configured to sync with your app's theme logic.

---

## API Reference

The component uses the [svelte-sonner](https://github.com/huntabyte/svelte-sonner) API. Key methods include:

- `toast()`: Displays a default toast.
- `toast.success()`, `toast.error()`, etc. for variant-specific toasts.
- `toast.dismiss(id)` to programmatically dismiss toasts.

---

## Contributors

Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

---

## Example: Full Setup

```svelte
<!-- Example Component -->
<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button on:click={() => toast.success('Success!', { description: 'This is a success message' })}>
	Success Toast
</Button>

<Button on:click={() => toast.error('Error!', { duration: 5000 })}>
	Error Toast (5s duration)
</Button>
```

---

## Notes

- Ensure the `Toaster` component is placed at the root of your app (e.g., in `+layout.svelte`).
- Customize toast styles via Tailwind CSS utilities or the `svelte-sonner` theme prop.

For more details, refer to the [svelte-sonner documentation](https://github.com/huntabyte/svelte-sonner).
