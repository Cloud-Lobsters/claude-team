# Context Menu Component Documentation

## Introduction

The Context Menu component provides a customizable dropdown menu triggered by right-click interactions. It supports nested submenus, checkboxes, radio groups, and more.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add context-menu
```

### Manual Installation

Add the component to your project manually by importing it from the `@shadcn/svelte` package.

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
	import * as ContextMenu from '@shadcn/svelte/components/ui/context-menu';
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>Profile</ContextMenu.Item>
		<ContextMenu.Item>Billing</ContextMenu.Item>
		<ContextMenu.Item>Team</ContextMenu.Item>
		<ContextMenu.Item>Subscription</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
```

---

## Advanced Example

```svelte
<script lang="ts">
	import * as ContextMenu from '@shadcn/svelte/components/ui/context-menu';
	let showBookmarks = $state(false);
	let showFullURLs = $state(true);
	let value = $state('pedro');
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.Item inset>
			Back
			<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset disabled>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset>
			Reload
			<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item
					>Save Page As...
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
				<ContextMenu.Item>Name Window...</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>Developer Tools</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem bind:checked={showBookmarks}>Show Bookmarks</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem bind:checked={showFullURLs}>Show Full URLs</ContextMenu.CheckboxItem>
		<ContextMenu.Separator />
		<ContextMenu.RadioGroup bind:value>
			<ContextMenu.Group>
				<ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
				<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
			</ContextMenu.Group>
		</ContextMenu.RadioGroup>
	</ContextMenu.Content>
</ContextMenu.Root>
```

---

## Features

- **Submenus**: Use `<ContextMenu.Sub>` and `<ContextMenu.SubContent>` for nested menus.
- **Checkboxes**: Use `<ContextMenu.CheckboxItem>` for toggleable options.
- **Radio Groups**: Use `<ContextMenu.RadioGroup>` and `<ContextMenu.RadioItem>` for mutually exclusive options.
- **Shortcuts**: Display keyboard shortcuts with `<ContextMenu.Shortcut>`.
- **Separators**: Use `<ContextMenu.Separator>` to divide menu items.

---

## API Reference

### Components

- `ContextMenu.Root`: The root container for the context menu.
- `ContextMenu.Trigger`: The element that triggers the menu (e.g., a button or text).
- `ContextMenu.Content`: The main menu content container.
- `ContextMenu.Item`: A single menu item.
- `ContextMenu.Sub`: Creates a submenu.
- `ContextMenu.SubTrigger`: The trigger for a submenu.
- `ContextMenu.SubContent`: The content of a submenu.
- `ContextMenu.CheckboxItem`: A checkbox-enabled menu item.
- `ContextMenu.Separator`: A divider between items.
- `ContextMenu.RadioGroup`: Container for radio items.
- `ContextMenu.RadioItem`: A radio button menu item.
- `ContextMenu.Group`: Groups related items.
- `ContextMenu.GroupHeading`: A heading for a group of items.

---

## Theming

Customize the appearance using Tailwind CSS classes directly on components. For example:

```svelte
<ContextMenu.Content class="w-52 bg-white dark:bg-gray-800">
	<!-- Items -->
</ContextMenu.Content>
```

---

## Notes

- **State Management**: Use Svelte stores (`$state`) for managing checkbox/radio states.
- **Accessibility**: Ensure proper ARIA attributes are maintained for screen readers.

---

## Special Sponsor

This project is supported by community contributions. Special thanks to Huntabyte & CokaKoala for porting the component to Svelte.

---

## Built By

- **Original Design**: shadcn
- **Ported to Svelte**: Huntabyte & CokaKoala

For more details, refer to the [shadcn-svelte documentation](https://ui.shadcn.com).
