# Hover Card Component

The Hover Card component provides a way to display additional information when a user hovers over an element. It is designed to be accessible and customizable.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add hover-card
```

### Manual Installation

```bash
# pnpm
pnpm add @shadcn-svelte/hover-card

# npm
npm install @shadcn-svelte/hover-card

# bun
bun add @shadcn-svelte/hover-card

# yarn
yarn add @shadcn-svelte/hover-card
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
</script>

<HoverCard.Root>
	<HoverCard.Trigger>Hover me</HoverCard.Trigger>
	<HoverCard.Content>This is a hover card!</HoverCard.Content>
</HoverCard.Root>
```

---

## Examples

### Avatar Hover Card

```svelte
<script lang="ts">
	import CalendarDaysIcon from '@lucide/svelte/icons/calendar-days';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		href="https://github.com/sveltejs"
		target="_blank"
		rel="noreferrer noopener"
		class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
	>
		@sveltejs
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80">
		<div class="flex justify-between space-x-4 p-4">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/sveltejs.png" />
				<Avatar.Fallback>SK</Avatar.Fallback>
			</Avatar.Root>
			<div class="space-y-1">
				<h4 class="text-sm font-semibold">@sveltejs</h4>
				<p class="text-sm">Cybernetically enhanced web apps.</p>
				<div class="flex items-center pt-2">
					<CalendarDaysIcon class="mr-2 h-4 w-4 opacity-70" />
					<span class="text-sm text-muted-foreground">Joined September 2022</span>
				</div>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
```

---

## API Reference

### Components

- `HoverCard.Root`: The root container for the hover card.
- `HoverCard.Trigger`: The element that triggers the hover card.
- `HoverCard.Content`: The content displayed when the trigger is hovered.

### Props

- `HoverCard.Root` accepts standard HTML props for the root element.
- `HoverCard.Trigger` accepts standard HTML props for the trigger element (e.g., `href`, `target`).
- `HoverCard.Content` accepts standard HTML props for the content container.

---

## Theming

Customize the appearance using Tailwind CSS classes or utility-first styling. For example:

```html
<HoverCard.Content class="w-80 bg-white p-4 shadow-md rounded-lg">
	<!-- Content here -->
</HoverCard.Content>
```

---

## Accessibility

- The hover card is designed to be keyboard-accessible.
- Ensure the trigger element has proper `aria-label` or `title` attributes for screen readers.

---

## Built by

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).

---

This documentation ensures all examples are preserved, code is properly formatted with syntax highlighting, and the structure is clear and organized.
