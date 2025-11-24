# Drawer Component Documentation

## Introduction

The Drawer component provides a slide-out panel for Svelte applications, built on top of [Vaul Svelte](https://github.com/emilkowalski/vaul).js). It offers a responsive and accessible way to present additional content or actions.

---

## Installation

### CLI Installation

```bash
pnpm dlx shadcn-svelte@latest add drawer
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
</script>
```

### Package Managers

```bash
# pnpm
pnpm add @shadcn/svelte

# npm
npm install @shadcn/svelte

# bun
bun add @shadcn/svelte

# yarn
yarn add @shadcn/svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
</script>

<Drawer.Root>
	<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Open Drawer</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>Are you sure?</Drawer.Title>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
```

---

## Examples

### Responsive Dialog Example

Combine `Drawer` and `Dialog` for responsive behavior (dialog on desktop, drawer on mobile):

```svelte
<script lang="ts">
	import MinusIcon from '@lucide/svelte/icons/minus';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { BarChart, type ChartContextValue } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';

	const data = [
		{ goal: 400 },
		{ goal: 300 }
		// ... (remaining data points)
	];

	let goal = $state(350);

	function handleClick(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}

	let context = $state<ChartContextValue>();
</script>

<Drawer.Root>
	<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Open Drawer</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>Move Goal</Drawer.Title>
				<Drawer.Description>Set your daily activity goal.</Drawer.Description>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<!-- Interactive controls and chart code here -->
			</div>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
```

---

## Features

- **Responsive Design**: Works seamlessly across devices.
- **Accessibility**: Follows ARIA best practices.
- **Customizable**: Adjust styles using Tailwind CSS utilities.

---

## Props & Events

### `Drawer.Root`

| Prop          | Type    | Description                           |
| ------------- | ------- | ------------------------------------- |
| `defaultOpen` | boolean | Whether the drawer is open by default |

### `Drawer.Content`

| Prop      | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| `onClose` | function | Callback when the drawer is closed |

---

## Theming

Customize the drawer using Tailwind CSS utilities directly on the component or via global theme configurations.

---

## Credits

- Built by [shadcn](https://shadcn.com)
- Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala)

---

## Contributing

Contributions are welcome! Check out the [GitHub repository](https://github.com/shadcn/shadcn-svelte) for details.
