# Create Modal Component

Create a new modal component following the **Centralized State Pattern** documented in the team CLAUDE.md.

## Instructions

First, ask the user for:
1. **Modal name** (e.g., "timeline-modal", "approval-email-modal")
2. **Data requirements** (what data does the modal need? e.g., claimId, user object, etc.)
3. **Location** (which route/component directory? e.g., `src/routes/dashboard/claims/components/modals/`)

Then follow these steps:

---

## Step 1: Read the Modal Pattern

Read the **Modal Management Pattern - Centralized State Approach** section from `.claude-team/CLAUDE.md` to understand the current team pattern.

Key principles:
- Use `modal-state.svelte.ts` for centralized state
- Modal components use `$derived()` to extract state
- Open modals from anywhere by updating state
- No prop drilling

---

## Step 2: Check for Existing Modal State File

Look for `modal-state.svelte.ts` in the target directory.

**If it exists:**
- Read it to understand the current structure
- You'll add to the existing `modals` object

**If it doesn't exist:**
- Create new `modal-state.svelte.ts` file
- Initialize with the pattern below

---

## Step 3: Update/Create Modal State File

Add the new modal configuration to `modal-state.svelte.ts`:

```typescript
import type { YourDataType } from '../../types'; // Adjust import as needed

interface {ModalName}Data {
	visible: boolean;
	{dataField}: {DataType} | null;
	// Add other fields as needed
}

export const modals = $state({
	// ... existing modals ...

	{modalName}: {
		visible: false,
		{dataField}: null
	} as {ModalName}Data
});
```

**Example:**
```typescript
interface TimelineModalData {
	visible: boolean;
	claimId: number | null;
}

export const modals = $state({
	timeline: {
		visible: false,
		claimId: null
	} as TimelineModalData
});
```

---

## Step 4: Create Modal Component File

Create the modal component at the specified location following this template:

```svelte
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { modals } from './modal-state.svelte';
	import { Button } from '$lib/components/ui/button';

	// Derive state from centralized modal state
	let open = $derived(modals.{modalName}.visible);
	let {dataField} = $derived(modals.{modalName}.{dataField});

	// Local component state
	let loading = $state(false);
	let data = $state<any>(null); // Replace 'any' with proper type

	// Fetch data when modal opens
	$effect(() => {
		if (open && {dataField}) {
			loadData();
		}
	});

	async function loadData() {
		loading = true;
		try {
			// TODO: Implement data loading
			// Example:
			// const response = await fetch(`/api/data/${dataField}`);
			// data = await response.json();
		} catch (error) {
			console.error('Failed to load data:', error);
		} finally {
			loading = false;
		}
	}

	// Reset state when modal closes
	$effect(() => {
		if (!open) {
			setTimeout(() => {
				data = null;
			}, 300); // Allow close animation to complete
		}
	});

	function handleClose() {
		modals.{modalName}.visible = false;
	}
</script>

<Dialog.Root bind:open={modals.{modalName}.visible}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>{Modal Title}</Dialog.Title>
			<Dialog.Description>
				{Modal description or subtitle}
			</Dialog.Description>
		</Dialog.Header>

		<div class="mt-4">
			{#if loading}
				<p>Loading...</p>
			{:else if data}
				<!-- TODO: Add modal content here -->
				<div>
					<p>Modal content goes here</p>
				</div>
			{:else}
				<p>No data available</p>
			{/if}
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={handleClose}>
				Close
			</Button>
			<!-- Add other action buttons as needed -->
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

---

## Step 5: Show Usage Example

Provide an example of how to open this modal from other components:

```typescript
// In any component (e.g., table cell, button handler, etc.)
import { modals } from './modal-state.svelte'; // Adjust path as needed

function open{ModalName}Modal() {
	modals.{modalName} = {
		visible: true,
		{dataField}: yourDataValue
	};
}
```

**Example usage in a table cell:**
```svelte
<script lang="ts">
	import { modals } from '../modals/modal-state.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Eye } from 'lucide-svelte';

	let { item } = $props();

	function viewDetails() {
		modals.{modalName} = {
			visible: true,
			{dataField}: item.id
		};
	}
</script>

<Button variant="ghost" size="sm" onclick={viewDetails}>
	<Eye class="h-4 w-4" />
</Button>
```

---

## Step 6: Add Modal to Parent Component

Remind the user to import and render the modal in their parent component:

```svelte
<script lang="ts">
	import {ModalName}Modal from './components/modals/{modal-name}.svelte';
	// ... other imports
</script>

<!-- Page content -->
<div>
	<!-- Your page content here -->
</div>

<!-- Modals -->
<{ModalName}Modal />
```

---

## Important Reminders

### ✅ DO:
- Use `$state()` for the centralized modals object
- Use `$derived()` to extract values in modal components
- Bind directly to `modals.{modalName}.visible`
- Use `$effect()` for side effects like data fetching
- Reset/cleanup state when modal closes
- Reassign entire modal object when opening: `modals.x = { visible: true, data: y }`

### ❌ DON'T:
- Don't use `$bindable()` props for modal open state
- Don't pass modal state through props (prop drilling)
- Don't mutate nested properties separately (may not trigger reactivity)
- Don't store component refs in modal state
- Don't mix patterns (either centralized state OR props, not both)

---

## Pattern Reference

See `.claude-team/CLAUDE.md` > Modal Management Pattern - Centralized State Approach

For a complete implementation example, see the reference in the CLAUDE.md documentation.

---

## Summary

After completing these steps, you will have:
1. ✅ Updated/created `modal-state.svelte.ts` with new modal config
2. ✅ Created modal component with proper pattern
3. ✅ Provided usage examples
4. ✅ Modal can be opened from anywhere in the app
5. ✅ No prop drilling, clean component separation
