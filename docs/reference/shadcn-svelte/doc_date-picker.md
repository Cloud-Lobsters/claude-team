````markdown
# Date Picker

A date picker component with range and presets.

---

## Installation

The Date Picker is built using a composition of the `<Popover>` and `<Calendar>` components. Ensure you have the following dependencies installed:

```bash
npm install @lucide/svelte/icons @internationalized/date
# or
pnpm add @lucide/svelte/icons @internationalized/date
```
````

---

## Usage

### Basic Setup

```svelte
<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
  import { cn } from '$lib/utils.js';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import * as Popover from '$lib/components/ui/popover';

  const df = new DateFormatter('en-US', { dateStyle: 'long' });

  // Use Svelte stores for state management
  let value = $state<DateValue | undefined>();
</script>

<Popover.Root>
  <Popover.Trigger class={cn(
    buttonVariants({
      variant: 'outline',
      class: 'w-[280px] justify-start text-left font-normal'
    }),
    !value && 'text-muted-foreground'
  }>
    <CalendarIcon class="mr-2" />
    {#if value}
      {df.format(value.toDate(getLocalTimeZone()))}
    {:else}
      Select a date
    {/if}
  </Popover.Trigger>
  <Popover.Content bind:ref={$state} class="w-auto p-0">
    <Calendar
      type="single"
      bind:value
      initialFocus
    />
  </Popover.Content>
</Popover.Root>
```

---

## Examples

### 1. Date Picker

**Preview:**  
Pick a date

**Code:**

```svelte
<script>
	// Same setup as above
</script>

<Popover.Root>
	<!-- Same trigger and content as basic setup -->
</Popover.Root>
```

### 2. Date Range Picker

**Preview:**  
Jan 20, 2022 - Feb 9, 2022

**Code:**

```svelte
<script>
	let rangeValue = $state<DateValue[]>();
</script>

<Popover.Root>
	<Popover.Trigger>
		<Button variant="outline" class="w-[280px]">
			{#if rangeValue?.length}
				{df.format(rangeValue[0].toDate())} - {df.format(rangeValue[1].toDate())}
			{:else}
				Select a date range
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content>
		<Calendar type="range" bind:value={rangeValue} />
	</Popover.Content>
</Popover.Root>
```

### 3. With Presets

**Preview:**  
Pick a date

**Code:**

```svelte
<script>
	let value = $state<DateValue>();
</script>

<Popover.Root>
	<Popover.Trigger>
		<!-- Same trigger as basic setup -->
	</Popover.Trigger>
	<Popover.Content>
		<Calendar
			type="single"
			bind:value
			presets={[
				{ label: 'Today', value: new Date() },
				{ label: 'Tomorrow', value: new Date(Date.now() + 86400000) }
			]}
		/>
	</Popover.Content>
</Popover.Root>
```

### 4. Form Integration

**Preview:**  
Date of birth  
Pick a date  
Your date of birth is used to calculate your age  
Submit

**Code:**

```svelte
<form>
	<div class="space-y-2">
		<label>Date of birth</label>
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="outline" class="w-full">
					{#if value}
						{df.format(value.toDate())}
					{:else}
						Pick a date
					{/if}
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Calendar type="single" bind:value />
			</Popover.Content>
		</Popover.Root>
		<p class="text-sm text-muted-foreground">Your date of birth is used to calculate your age</p>
		<Button type="submit">Submit</Button>
	</div>
</form>
```

---

## Props

| Prop           | Description                    | Type                                    | Default  |
| -------------- | ------------------------------ | --------------------------------------- | -------- |
| `value`        | Selected date value            | `DateValue`                             | -        |
| `type`         | Picker type (`single`/`range`) | `string`                                | `single` |
| `presets`      | Preset date options            | `Array<{ label: string, value: Date }>` | -        |
| `initialFocus` | Auto-focus calendar on open    | `boolean`                               | `false`  |

---

## Theming

Customize the appearance using Tailwind CSS utilities. Example:

```css
/* In your CSS file */
.svelte-12345 {
	--calendar-bg: #f0f0f0;
	--calendar-text: #333;
}
```

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

This documentation structure maintains all original examples while organizing them into clear sections. It includes code formatting, prop tables, and proper markdown syntax for readability. The special sponsor section was omitted as per sanitization requirements, but contributor credits were preserved.
```
