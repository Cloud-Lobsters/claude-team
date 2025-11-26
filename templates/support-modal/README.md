# Support Modal Template

A Slack-integrated support modal component that allows users to submit support requests from anywhere in your application. Messages are sent directly to a Slack channel for team visibility and quick response.

## What It Does

- Provides a modal dialog with a support form
- Collects optional email and required message from users
- Sends support requests to Slack via API endpoint
- Shows toast notifications for success/error feedback
- Includes loading states and validation

## When to Use

- Forms or multi-step processes where users might need help
- Application headers/layouts for global access to support
- Any page where users might encounter issues or have questions
- As an alternative to or supplement for email support

## Prerequisites

### Environment Variables

Add these to your `.env` file:

```bash
# Private (server-side only)
API_ENDPOINT=https://your-api-endpoint.com
INTERNAL_API_KEY=your-internal-api-key
```

### Dependencies

Ensure these are installed:

```bash
pnpm add axios svelte-sonner lucide-svelte
```

### Slack Setup

Your API endpoint must have a `/slack/send` route that accepts:

```typescript
{
  message: string,    // Formatted Slack message
  channel: string     // Slack channel name
}
```

And expects an `Authorization: Bearer <INTERNAL_API_KEY>` header.

## Installation

### 1. Copy Component File

Copy `support-modal.svelte` to your components directory:

```bash
cp .claude/templates/support-modal/support-modal.svelte \
   src/lib/components/support-modal/support-modal.svelte
```

### 2. Copy API Endpoint

Copy `+server.ts` to your API routes:

```bash
cp .claude/templates/support-modal/+server.ts \
   src/routes/api/support/+server.ts
```

### 3. Update Imports

Ensure the imports in `support-modal.svelte` match your project structure:

```typescript
import * as Dialog from '$lib/components/ui/dialog/index.js';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'svelte-sonner';
import { Megaphone } from 'lucide-svelte';
```

## Usage

### Basic Usage

```svelte
<script>
  import SupportModal from '$lib/components/support-modal/support-modal.svelte';
</script>

<SupportModal />
```

### With Pre-filled Email

```svelte
<script>
  import SupportModal from '$lib/components/support-modal/support-modal.svelte';

  let userEmail = 'user@example.com';
</script>

<SupportModal prefillEmail={userEmail} />
```

### Icon-Only Mode

```svelte
<SupportModal iconOnly={true} />
```

### In a Header

```svelte
<!-- header.svelte -->
<script>
  import SupportModal from '$lib/components/support-modal/support-modal.svelte';
</script>

<header class="bg-white shadow-md">
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <div>
        <img src="/logo.png" alt="Logo" />
      </div>
      <div>
        <SupportModal />
      </div>
    </div>
  </div>
</header>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconOnly` | `boolean` | `false` | If true, shows only megaphone icon without text |
| `prefillEmail` | `string` | `''` | Pre-fills the email field with this value |

## Component Features

### Form Fields

1. **Email (optional)**
   - Type: `email`
   - Can be pre-filled via props
   - Users can submit without email for anonymous support

2. **Message (required)**
   - Type: `textarea`
   - Minimum height: 120px
   - Submit button disabled until message has content

### State Management (Svelte 5 Runes)

```typescript
let email = $state(prefillEmail);        // Email input
let problemText = $state('');            // Message content
let open = $state(false);                // Modal visibility
let isSubmitting = $state(false);        // Loading state
```

### Reactive Updates

The component uses `$effect()` to watch for changes to `prefillEmail`:

```typescript
$effect(() => {
  if (prefillEmail) {
    email = prefillEmail;
  }
});
```

### Toast Notifications

- **Success**: "Support request sent successfully!"
- **Error**: "Failed to send support request. Please try again."

## API Endpoint

The `+server.ts` endpoint:

1. Validates the request (message is required)
2. Extracts context (referer URL, timestamp)
3. Formats a Slack message with:
   - Request origin (URL)
   - User email (if provided)
   - Message content
   - Timestamp
4. Sends to Slack via your internal API
5. Returns success/error response

### Message Format

```
🆘 *New Support Request*
*From:* https://example.com/form/page2

*Email:* user@example.com

*Message:*
I'm having trouble with the payment step.

*Time:* 24/11/2025, 14:30:15
```

## Customization

### Change Slack Channel

Edit `+server.ts`:

```typescript
const response = await axios.post(
  `${env.API_ENDPOINT}/slack/send`,
  {
    message: formattedMessage,
    channel: 'support'  // Change from 'general' to your channel
  },
  // ...
);
```

### Styling

The component uses shadcn-svelte components with Tailwind CSS. Customize by:

1. **Button styling**: Modify the `Dialog.Trigger` button classes
2. **Input styling**: Update input/textarea classes in the template
3. **Dialog styling**: Pass custom classes to `Dialog.Content`

Example custom styling:

```svelte
<Dialog.Content class="max-w-lg bg-gray-50 dark:bg-gray-900">
  <!-- ... -->
</Dialog.Content>
```

### Custom Icon

Replace the `Megaphone` icon:

```svelte
<script>
  import { HelpCircle } from 'lucide-svelte';  // Different icon
</script>

<!-- In template -->
<HelpCircle class="h-[1.2rem] w-[1.2rem]" />
```

### Add Additional Fields

To add more fields (e.g., phone number):

1. Add state:
```typescript
let phone = $state('');
```

2. Add input field in template:
```svelte
<div>
  <label for="support-phone">Phone (optional)</label>
  <input
    id="support-phone"
    type="tel"
    bind:value={phone}
    placeholder="+1 555 123 4567"
  />
</div>
```

3. Include in API request:
```typescript
body: JSON.stringify({
  message: problemText,
  email: email.trim() || undefined,
  phone: phone.trim() || undefined
})
```

4. Update server formatting:
```typescript
if (body.phone) {
  formattedMessage += `*Phone:* ${body.phone}\n\n`;
}
```

## Testing

### Manual Testing

1. Click the "Get Support" button
2. Fill in the message field (and optionally email)
3. Click Submit
4. Verify:
   - Success toast appears
   - Modal closes
   - Form resets
   - Message appears in Slack

### Error Testing

1. Test with API endpoint down
2. Test with invalid API key
3. Test with empty message (should be disabled)

## Troubleshooting

### Modal doesn't open
- Check that Dialog components are properly installed from shadcn-svelte
- Verify `open` state is working

### API request fails
- Check environment variables are set correctly
- Verify API endpoint is accessible
- Check CORS settings if running locally
- Verify Slack API authentication

### Toast doesn't show
- Ensure `svelte-sonner` is installed
- Add `<Toaster />` component to your root layout:

```svelte
<!-- +layout.svelte -->
<script>
  import { Toaster } from 'svelte-sonner';
</script>

<Toaster />
<slot />
```

### Email doesn't pre-fill
- Verify `prefillEmail` prop is being passed
- Check that the prop value is available when component mounts

## Architecture Notes

### Why Slack?

- Immediate team notifications
- Centralized support request tracking
- No email server configuration needed
- Easy integration with existing workflows

### Security Considerations

- API endpoint uses server-side only environment variables
- Email validation on input field
- Rate limiting recommended on API endpoint
- Consider adding CAPTCHA for public-facing forms

### Performance

- Modal lazy loads on user interaction
- API call only on form submission
- No polling or background requests
- Minimal bundle size impact

## Related Patterns

- **Modal Pattern**: Uses centralized modal state (see `/cmd-create-modal` command)
- **Form Pattern**: Could integrate with Superforms for validation
- **Toast Pattern**: Uses svelte-sonner for notifications

## Example Implementation

See the jewellery form implementation:
- Component: `src/lib/components/support-modal/support-modal.svelte`
- Usage: `src/routes/forms/jewellery/(sections)/header.svelte`
- API: `src/routes/api/support/+server.ts`
