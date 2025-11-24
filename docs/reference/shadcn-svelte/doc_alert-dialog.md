# Alert Dialog Component

A modal dialog that interrupts the user with important content and expects a response.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add alert-dialog
```

### Manual Installation

```bash
npm install @shadcn/svelte
# or
bun add @shadcn/svelte
# or
yarn add @shadcn/svelte
```

---

## Usage

### Example Code

```svelte
<script lang="ts">
	import * as AlertDialog from '@shadcn/svelte/alert-dialog';
	import { buttonVariants } from '@shadcn/svelte/button';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		Show Dialog
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
```

---

## Structure

### Components

- **Root**: The root container for the alert dialog.
- **Trigger**: The element that opens the dialog (e.g., a button).
- **Content**: The main content of the dialog.
- **Header**: Contains the title and description.
- **Title**: The main heading of the dialog.
- **Description**: Additional details explaining the action.
- **Footer**: Contains the action buttons.
- **Cancel**: The cancel button.
- **Action**: The confirm/continue button.

---

## API Reference

### Props & Events

- **Root**:

  - `open` (prop): Controls the open state of the dialog.
  - `onOpenChange` (event): `(open: boolean) => void`): Fires when the open state changes.

- **Trigger**: No props, but must be a focusable element (e.g., a button).

- **Content**: No props, but requires `Header`, `Footer`, `Title`, `Description`, `Cancel`, and `Action` children.

- **Footer**: Container for action buttons.

---

## Theming

The Alert Dialog uses Tailwind CSS by default. Customize the appearance by overriding classes in your CSS or using utility classes in the component props.

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers. [Reach out](https://shadcn.com) for details.

---

## Credits

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).
