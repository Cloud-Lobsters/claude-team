# Popover Component

The Popover component displays rich content in a portal, triggered by a button. It is part of the shadcn-svelte library and is built using Svelte and Tailwind CSS.

---

## Installation

### CLI

Use the Shadcn Svelte CLI to add the Popover component:

```bash
pnpm dlx shadcn-svelte@latest add popover
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
</script>
```

### Package Managers

Install via your preferred package manager:

#### pnpm

```bash
pnpm add shadcn-svelte
```

#### npm

```bash
npm install shadcn-svelte
```

#### bun

```bash
bun add shadcn-svelte
```

#### yarn

```bash
yarn add shadcn-svelte
```

---

## Usage

### Basic Example

```svelte
<Popover.Root>
	<Popover.Trigger>Open</Popover.Trigger>
	<Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```

### Example with Form Inputs

```svelte
<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Popover.Trigger>
	<Popover.Content class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Dimensions</h4>
				<p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
			</div>
			<div class="grid gap-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="width">Width</Label>
					<Input id="width" value="100%" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="maxWidth">Max. width</Label>
					<Input id="maxWidth" value="300px" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="height">Height</Label>
					<Input id="height" value="25px" class="col-span-2 h-8" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<Label for="maxHeight">Max. height</Label>
					<Input id="maxHeight" value="none" class="col-span-2 h-8" />
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
```

---

## Props & Events

### Popover.Root

- **Children**: Contains `Popover.Trigger` and `Popover.Content`.

### Popover.Trigger

- **Children**: The element that triggers the popover (e.g., a button).

### Popover.Content

- **Class**: Optional class for styling the content container.
- **Children**: The content to display when the popover is open.

---

## Notes

- Ensure Tailwind CSS is configured in your project for styling.
- The component uses portal-based positioning; adjust styles as needed for your layout.

---

### Built by

- **Library**: shadcn-svelte
- **Contributors**: Huntabyte & CokaKoala

For more details, refer to the [shadcn-svelte documentation](https://ui.shadcn.com).).
