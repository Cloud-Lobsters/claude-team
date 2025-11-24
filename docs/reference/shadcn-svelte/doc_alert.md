# Alert Component

The Alert component is used to display callouts for user attention, providing feedback or important information.

---

## Installation

### CLI

Install the component using the Shadcn Svelte CLI:

```bash
pnpm dlx shadcn-svelte@latest add alert
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
</script>
```

---

## Usage

### Basic Usage

```svelte
<Alert.Root>
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
```

---

## Examples

### Default Alert

Displays a standard alert with an icon, title, and description.

**Preview**  
_Success! Your changes have been saved_  
This is an alert with icon, title, and description.

**Code**

```svelte
<Alert.Root>
	<CheckCircle2Icon />
	<Alert.Title>Success! Your changes have been saved</Alert.Title>
	<Alert.Description>This is an alert with icon, title, and description.</Alert.Description>
</Alert.Root>
```

### Destructive Alert

A variant for critical alerts (e.g., errors).

**Preview**  
_Error_  
Your session has expired. Please login again.

**Code**

```svelte
<Alert.Root variant="destructive">
	<AlertCircleIcon />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
```

---

## Full Component Example

```svelte
<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import PopcornIcon from '@lucide/svelte/icons/popcorn';
</script>

<div class="grid w-full max-w-xl items-start gap-4">
	<!-- Default Alert -->
	<Alert.Root>
		<CheckCircle2Icon />
		<Alert.Title>Success! Your changes have been saved</Alert.Title>
		<Alert.Description>This is an alert with icon, title, and description.</Alert.Description>
	</Alert.Root>

	<!-- Alert Without Description -->
	<Alert.Root>
		<PopcornIcon />
		<Alert.Title>This Alert has a title and an icon. No description.</Alert.Title>
	</Alert.Root>

	<!-- Destructive Alert -->
	<Alert.Root variant="destructive">
		<AlertCircleIcon />
		<Alert.Title>Unable to process your payment.</Alert.Title>
		<Alert.Description>
			<p>Please verify your billing information and try again.</p>
			<ul class="list-inside list-disc text-sm">
				<li>Check your card details</li>
				<li>Ensure sufficient funds</li>
				<li>Verify billing address</li>
			</ul>
		</Alert.Description>
	</Alert.Root>
</div>
```

---

## Props

The `Alert.Root` component accepts a `variant` prop to customize styling (e.g., `destructive` for error states).

---

## Dependencies

- Icons from [Lucide Svelte](https://github.com/svelte-lucide/lucide) (e.g., `CheckCircle2Icon`).

---

## Theming

Themes can be customized via Tailwind CSS classes or the Shadcn Svelte theming utilities.
