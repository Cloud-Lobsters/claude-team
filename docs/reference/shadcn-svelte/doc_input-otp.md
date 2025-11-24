# Input OTP Component

## Overview

The Input OTP component provides an accessible one-time password input with copy-paste functionality. It is built on top of Bits UI's PinInput and inspired by @guilherme_rodz's design.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add input-otp
```

### Manual Installation

Add the component to your project via package managers:

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
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
</script>

<InputOTP.Root maxlength={6}>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells.slice(0, 3) as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
		<InputOTP.Separator />
		<InputOTP.Group>
			{#each cells.slice(3, 6) as cell (cell)}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
```

---

## Examples

### Pattern

Define a custom input pattern using the `pattern` prop:

```svelte
<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
	<!-- ... -->
</InputOTP.Root>
```

### Separator

Add visual separation between groups:

```svelte
<InputOTP.Root maxlength={4}>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells.slice(0, 2) as cell}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
		<InputOTP.Separator />
		<InputOTP.Group>
			{#each cells.slice(2, 4) as cell}
				<InputOTP.Slot {cell} />
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
```

### Invalid State

Display validation errors using the `invalid` prop:

```svelte
<!-- Example usage of invalid state (implementation details may vary) -->
<InputOTP.Root invalid={isInvalid}>
	<!-- ... -->
</InputOTP.Root>
```

### Form Integration

Use within a form context:

```svelte
<form>
	<InputOTP.Root maxlength={6}>
		<!-- ... -->
	</InputOTP.Root>
	<button type="submit">Submit</button>
</form>
```

---

## API Reference

### Root Props

| Prop        | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| `maxlength` | `number` | Maximum number of characters allowed |
| `pattern`   | `RegExp` | Validation pattern for input         |

### Slots

- `InputOTP.Slot`: Represents an individual input cell
- `InputOTP.Group`: Container for grouping cells
- `InputOTP.Separator`: Visual separator between groups

---

## Component Source

The component is part of the shadcn-svelte library and uses the following structure:

```svelte
<!-- Example component structure -->
<InputOTP.Root>
	<InputOTP.Group>
		<!-- Cells 1-3 -->
	</InputOTP.Group>
	<InputOTP.Separator />
	<InputOTP.Group>
		<!-- Cells 4-6 -->
	</InputOTP.Group>
</InputOTP.Root>
```

---

## Contributors

- Built by [shadcn](https://shadcn.com)
- Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/cokakoala)

---

## Notes

- The `cells` array is automatically managed by the component
- Use `pattern` prop for custom validation (e.g., `REGEXP_ONLY_DIGITS_AND_CHARS` from `bits-ui`)
- Use `invalid` prop to show validation states

For more details, refer to the [Bits UI documentation](https://bits-ui.netlify.app/components/pin-input).
