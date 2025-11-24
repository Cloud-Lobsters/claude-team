# Command Component Documentation

## Overview

The Command component provides a composable, unstyled command menu for Svelte applications. It includes features like input handling, grouping, and keyboard navigation.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add command
```

### Manual Installation

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

### Basic Setup

```svelte
<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
</script>

<Command.Root>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>Calendar</Command.Item>
			<Command.Item>Search Emoji</Command.Item>
			<Command.Item>Calculator</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Settings">
			<Command.Item>Profile</Command.Item>
			<Command.Item>Billing</Command.Item>
			<Command.Item>Settings</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Root>
```

---

## Examples

### Dialog Integration

A dialog-based implementation with keyboard shortcut support:

```svelte
<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { onMount } from 'svelte';

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>Calendar</Command.Item>
			<Command.Item>Search Emoji</Command.Item>
			<Command.Item>Calculator</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
```

**Features:**

- Opens with `⌘K` (Mac) or `Ctrl+K` (Windows/Linux)
- Integrates with Dialog component for modal behavior

---

## Styling Example

```svelte
<script lang="ts">
	import CalculatorIcon from '@lucide/svelte/icons/calculator';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import CreditCardIcon from '@lucide/svelte/icons/credit-card';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import SmileIcon from '@lucide/svelte/icons/smile';
	import UserIcon from '@lucide/svelte/icons/user';
	import * as Command from '$lib/components/ui/command/index.js';
</script>

<Command.Root class="rounded-lg border shadow-md md:min-w-[450px]">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>
				<CalendarIcon />
				<span>Calendar</span>
			</Command.Item>
			<Command.Item>
				<SmileIcon />
				<span>Search Emoji</span>
			</Command.Item>
			<Command.Item disabled>
				<CalculatorIcon />
				<span>Calculator</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Settings">
			<Command.Item>
				<UserIcon />
				<span>Profile</span>
				<Command.Shortcut>⌘P</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<CreditCardIcon />
				<span>Billing</span>
				<Command.Shortcut>⌘B</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<SettingsIcon />
				<span>Settings</span>
				<Command.Shortcut>⌘S</Command.Shortcut>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Root>
```

---

## Changelog

- **2024-10-30**: Added default styling for icons:
  - `gap-2`
  - `&_svg: pointer-events-none`
  - `&_svg: size-4`
  - `&_svg: shrink-0`

---

## Props & Components

### `<Command.Root>`

- Base component for the command menu
- Accepts standard HTML attributes

### `<Command.Input>`

- Search input field
- Props: `placeholder`, `value`, `on:input`

### `<Command.List>`

- Container for command items
- Wraps all items and groups

### `<Command.Item>`

- Individual command option
- Props: `disabled` (boolean), `value` (string)
- Supports icon + text combinations

### `<Command.Group>`

- Groups related items
- Prop: `heading` (string) for group title

### `<Command.Separator>`

- Divider between groups

### `<Command.Empty>`

- Shown when no results found

### `<Command.Dialog>`

- Dialog wrapper for modal presentation
- Combines Dialog.Root and Command.Root functionality

---

## Theming

- Built with Tailwind CSS
- Customize using standard Tailwind classes
- Example styling:
  ```html
  <Command.Root class="rounded-lg border shadow-md md:min-w-[450px]"></Command.Root>
  ```

---

## Keyboard Shortcuts

- `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open dialog
- Arrow keys for navigation
- Enter/Space to select items

---

## Credits

- Built by [shadcn](https://ui.shadcn.com)
- Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala)

---

## Resources

- [Component Source](https://github.com/shadcn/shadcn-svelte/blob/main/src/lib/components/ui/command)
- [API Reference](https://ui.shadcn.com/docs/command/api)
