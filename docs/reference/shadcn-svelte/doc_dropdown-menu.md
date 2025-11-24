# Dropdown Menu Component

The Dropdown Menu component allows users to display a menu of actions or options triggered by a button. It supports nested submenus, separators, and customizable items.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

### Manual Installation

```bash
# pnpm
pnpm add shadcn-svelte

# npm
npm install shadcn-svelte

# bun
bun add shadcn-svelte

# yarn
yarn add shadcn-svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger as-child>
		<Button variant="outline">Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="start">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Group>
			<DropdownMenu.Item>Profile</DropdownMenu.Item>
			<DropdownMenu.Item>Billing</DropdownMenu.Item>
			<DropdownMenu.Item>Team</DropdownMenu.Item>
			<DropdownMenu.Item>Subscription</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Log out</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
```

---

## Components

The Dropdown Menu includes the following components:

- **Root**: The parent container for the dropdown.
- **Trigger**: The element that opens the dropdown (e.g., a button).
- **Content**: The container for the menu items.
- **Group**: Groups related items together.
- **Label**: A heading for a group of items.
- **Item**: A single menu option.
- **Separator**: A divider between groups of items.
- **Sub**: Creates a nested submenu.
- **SubTrigger**: The trigger for a nested submenu.
- **SubContent**: The content of a nested submenu.
- **Shortcut**: Displays keyboard shortcuts for items.

---

## Examples

### Checkbox Example

```svelte
<DropdownMenu.Root>
	<DropdownMenu.Trigger as-child>
		<Button variant="outline">Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="start">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Group>
			<DropdownMenu.Item>Profile</DropdownMenu.Item>
			<DropdownMenu.Item>Billing</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>Email</DropdownMenu.Item>
					<DropdownMenu.Item>Message</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>GitHub</DropdownMenu.Item>
		<DropdownMenu.Item disabled>API</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
```

### Radio Group Example

```svelte
<!-- Example structure for a radio group (not fully implemented in provided code) -->
<DropdownMenu.Root>
	<DropdownMenu.Trigger>Choose Option</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.RadioGroup value={selected}>
			<DropdownMenu.RadioItem value="option1">Option 1</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="option2">Option 2</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
```

---

## Changelog

### 2024-10-30

- Added `gap-2`, ` [&_svg]:pointer-events-none`, ` [&_svg]:size-4`, and ` [&_svg]:shrink-0` to `DropdownMenu.SubTrigger` for consistent icon styling.
- Removed direct `size-4` styling for icons inside `DropdownMenu.SubTrigger` to rely on parent styling.

---

## Styling

- Uses **Tailwind CSS** for styling. Customize with Tailwind classes on components (e.g., `class="w-56"`).
- Icons inside `DropdownMenu.SubTrigger` automatically inherit spacing and sizing.

---

## Props & Events

- **DropdownMenu.Root**: Manages the dropdown state.
- **DropdownMenu.Trigger**: The element that toggles the dropdown (e.g., a button).
- **DropdownMenu.Content**: Positions and styles the menu content.
- **DropdownMenu.Item**: Individual menu options (supports `disabled` prop).

---

## Props for Submenus

- **DropdownMenu.SubTrigger**: Triggers nested submenus.
- **DropdownMenu.SubContent**: Contains nested menu items.

---

## Accessibility

- Follows ARIA practices for keyboard navigation and screen readers.
- Use `aria-label` or `aria-labelledby` for accessibility.

---

## Theming

- Customize via Tailwind CSS classes or global Svelte styles.
- Override default styles in your project's CSS.

---

## Notes

- Ensure the component is placed within a layout that allows for proper positioning (e.g., using `position: relative` on parent elements).
- Use `as-child` prop on `Trigger` to inherit styles from the child element (e.g., a `Button`).
