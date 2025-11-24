# Menubar Component

The Menubar component provides a visually persistent menu system, similar to desktop applications, offering quick access to commands and settings.

---

## Installation

### Using CLI

```bash
pnpm dlx shadcn-svelte@latest add menubar
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

### Basic Example

```svelte
<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Share</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>Email link</Menubar.Item>
					<Menubar.Item>Messages</Menubar.Item>
					<Menubar.Item>Notes</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Separator />
			<Menubar.Item>Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut></Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
```

### Full Example with State Management

```svelte
<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	let bookmarks = $state(false);
	let fullUrls = $state(true);
	let profileRadioValue = $state('benoit');
</script>

<Menubar.Root>
	<!-- File Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<!-- Items here -->
		</Menubar.Content>
	</Menubar.Menu>

	<!-- Edit Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<!-- More items -->
		</Menubar.Content>
	</Menubar.Menu>

	<!-- View Menu with Checkbox Items -->
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={bookmarks}>
				Always Show Bookmarks Bar
			</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={fullUrls}>Always Show Full URLs</Menubar.CheckboxItem>
		</Menubar.Content>
	</Menubar.Menu>

	<!-- Radio Group Example -->
	<Menubar.Menu>
		<Menubar.Trigger>Profiles</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.RadioGroup bind:value={profileRadioValue}>
				<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
				<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
				<Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
			</Menubar.RadioGroup>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
```

---

## API Reference

### Components

#### `Menubar.Root`

The root container for the menubar.

#### `Menubar.Menu`

A menu group within the menubar.

#### `Menubar.Trigger`

The button that opens the menu when clicked.

#### `Menubar.Content`

The dropdown content of the menu.

#### `Menubar.Item`

A single menu item.

#### `Menubar.Shortcut`

Displays keyboard shortcuts (e.g., `⌘T`).

#### `Menubar.Separator`

A divider between menu items.

#### `Menubar.Sub`

A nested submenu.

#### `Menubar.SubTrigger`

The trigger for a nested submenu.

#### `Menubar.SubContent`

The content of a nested submenu.

#### `Menubar.CheckboxItem`

A checkbox-enabled menu item (bind to `checked` prop).

#### `Menubar.RadioGroup`

A group of radio items (bind to `value` prop).

#### `Menubar.RadioItem`

A radio button within a `Menubar.RadioGroup`.

---

### Props & Events

| Component                | Props/Events         | Description                               |
| ------------------------ | -------------------- | ----------------------------------------- |
| **Menubar.Root**         | -                    | The root container for the menubar.       |
| **Menubar.Menu**         | -                    | Groups related menu items.                |
| **Menubar.Trigger**      | -                    | The button that toggles the menu content. |
| **Menubar.Item**         | `disabled` (boolean) | A standard menu item.                     |
| **Menubar.CheckboxItem** | `checked` (boolean)  | Checkbox item with state binding.         |
| **Menubar.RadioItem**    | `value` (string)     | Radio item within a `Menubar.RadioGroup`. |

---

## Theming

Use Tailwind CSS classes to style the menubar. Customize via utility classes or CSS variables.

---

## Examples

### Checkbox and Radio Items

```svelte
<script>
	let bookmarks = $state(false);
	let fullUrls = $state(true);
	let profileRadioValue = $state('benoit');
</script>

<Menubar.RadioGroup bind:value={profileRadioValue}>
	<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
	<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
</Menubar.RadioGroup>

<Menubar.CheckboxItem bind:checked={bookmarks}>Always Show Bookmarks Bar</Menubar.CheckboxItem>
```

### Nested Submenus

```svelte
<Menubar.Sub>
	<Menubar.SubTrigger>Find</Menubar.SubTrigger>
	<Menubar.SubContent>
		<Menubar.Item>Search the web</Menubar.Item>
		<Menubar.Item>Find...</Menubar.Item>
	</Menubar.SubContent>
</Menubar.Sub>
```

---

## Props and Bindings

- **CheckboxItem**: Use `bind:checked` to track the checked state.
- **RadioGroup**: Use `bind:value` to track the selected radio item's value.

---

## Notes

- Use `Menubar.Separator` to divide groups of items.
- Shortcuts are displayed using `<Menubar.Shortcut>`.

---

### Built with

Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) and [CokaKoala](https://github.com/CokaKoala). Based on Shadcn's original design.
