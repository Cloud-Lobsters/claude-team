<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Megaphone } from 'lucide-svelte';

	interface Props {
		iconOnly?: boolean;
		prefillEmail?: string;
	}

	let { iconOnly = false, prefillEmail = '' }: Props = $props();

	let email = $state(prefillEmail);
	let problemText = $state('');
	let open = $state(false);
	let isSubmitting = $state(false);

	// Update email when prefillEmail changes
	$effect(() => {
		if (prefillEmail) {
			email = prefillEmail;
		}
	});

	async function handleSubmit() {
		isSubmitting = true;

		try {
			const response = await fetch('/api/support', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: problemText,
					email: email.trim() || undefined
				})
			});

			if (!response.ok) {
				throw new Error('Failed to send support message');
			}

			toast.success('Support request sent successfully!');
			problemText = '';
			if (!prefillEmail) {
				email = '';
			}
			open = false;
		} catch (error) {
			console.error('Support request error:', error);
			toast.error('Failed to send support request. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#snippet iconButton()}
	<Megaphone class="h-[1.2rem] w-[1.2rem]" />
	<span class="sr-only">Get Support</span>
{/snippet}

<Dialog.Root bind:open>
	{#if iconOnly}
		<Dialog.Trigger>
			<Button variant="outline" size="icon" title="Get Support">
				{@render iconButton()}
			</Button>
		</Dialog.Trigger>
	{:else}
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })} data-css="button">
			<Megaphone class="w-4 h-4 mr-2" />
			Get Support
		</Dialog.Trigger>
	{/if}
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Get Support</Dialog.Title>
			<Dialog.Description>
				Please describe your issue or question and we'll help you as soon as possible.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div>
				<label
					for="support-email"
					class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
				>
					Email (optional)
				</label>
				<input
					id="support-email"
					type="email"
					bind:value={email}
					placeholder="your.email@example.com"
					class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
					disabled={isSubmitting}
				/>
			</div>
			<div>
				<label
					for="support-message"
					class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
				>
					Message
				</label>
				<textarea
					id="support-message"
					bind:value={problemText}
					placeholder="Describe your problem here..."
					class="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary"
					disabled={isSubmitting}
				></textarea>
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={handleSubmit} disabled={!problemText.trim() || isSubmitting}>
				{isSubmitting ? 'Sending...' : 'Submit'}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
