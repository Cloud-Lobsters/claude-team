---
description: Install Auth.js authentication system with all necessary files and dependencies
tags: [auth, template, setup]
---

# Install Auth.js Authentication

Install a complete Auth.js authentication system with:
- JWT-based sessions (7-day expiration)
- Email/password credentials provider
- Route protection middleware
- User role management (admin/external)
- Sign-in UI with dark mode support
- Type-safe session access
- Prisma database integration

## Installation Steps

1. **Copy all template files** from `.claude/templates/authjs/` to the project root
2. **Check for existing files** - warn if any files already exist (don't overwrite)
3. **Install required dependencies**:
   ```bash
   pnpm add @auth/sveltekit @auth/prisma-adapter @node-rs/bcrypt bcrypt zod svelte-sonner mode-watcher
   pnpm add -D @types/bcrypt
   ```
4. **Add User model to Prisma schema** (from `prisma/user-model.prisma`)
5. **Generate AUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```
6. **Remind user to**:
   - Add `AUTH_SECRET` to `.env` file
   - Update `DATABASE_URL` in `.env` if needed
   - Run `pnpm db:gen && pnpm db:migrate`
   - Optionally configure branding environment variables

## Files Being Installed

### Core Authentication (8 files)
- `src/lib/server/auth.ts` - Auth.js configuration
- `src/lib/services/authentication.service.ts` - Auth business logic
- `src/lib/server/db.ts` - Prisma client singleton
- `src/lib/server/middleware/auth-middleware.ts` - Route protection
- `src/hooks.server.ts` - Middleware chain
- `src/app.d.ts` - TypeScript types
- `src/routes/auth/[...auth]/+server.ts` - Auth endpoints
- `prisma/user-model.prisma` - User model snippet

### UI Components (6 files)
- `src/routes/(auth)/signin/+page.server.ts` - Sign-in server logic
- `src/routes/(auth)/signin/+page.svelte` - Sign-in form UI
- `src/lib/components/nav-user.svelte` - User menu with sign-out
- `src/lib/components/theme-toggle.svelte` - Dark/light mode toggle
- `src/routes/+layout.server.ts` - Root layout server
- `src/routes/+layout.svelte` - Root layout with toaster

### Dashboard Layout (2 files)
- `src/routes/dashboard/+layout.server.ts` - Dashboard layout server
- `src/routes/dashboard/+layout.svelte` - Dashboard layout UI

### Configuration (2 files)
- `src/lib/config/branding.ts` - Branding configuration
- `.env.example` - Environment variable template

## Post-Installation

### 1. Set AUTH_SECRET
```bash
# Generate secret
openssl rand -base64 32

# Add to .env
echo 'AUTH_SECRET="your-generated-secret"' >> .env
```

### 2. Update Prisma Schema
Copy the User model from `prisma/user-model.prisma` into your `prisma/schema.prisma` file, then:
```bash
pnpm db:gen
pnpm db:migrate
```

### 3. Create First User
Use Prisma Studio or create a seed script:
```bash
npx prisma studio
```

Or via code:
```typescript
import { AuthService } from '$lib/services/authentication.service';

await AuthService.createUser({
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User'
});
```

### 4. Test Authentication
1. Start dev server: `pnpm dev`
2. Visit `http://localhost:5173/signin`
3. Sign in with your user credentials
4. Should redirect to `/dashboard`

## Route Protection

The middleware automatically protects routes:
- `/dashboard/*` - Requires authentication
- External users restricted to `/dashboard/projects/*` only
- Unauthenticated users redirected to `/signin`

## Accessing User Session

### In Server Code (+page.server.ts)
```typescript
export const load = async ({ locals }) => {
  const session = await locals.auth();
  const user = locals.user; // Pre-populated by middleware
  return { user };
};
```

### In Client Code (+page.svelte)
```svelte
<script lang="ts">
  import { page } from '$app/stores';
  const user = $page.data.user;
</script>

<div>Welcome, {user?.name}</div>
```

## Dependencies Added

**Production:**
- `@auth/sveltekit` - Auth.js for SvelteKit
- `@auth/prisma-adapter` - Prisma adapter (optional)
- `@node-rs/bcrypt` - Password hashing (fast native)
- `bcrypt` - Password hashing fallback
- `zod` - Schema validation
- `svelte-sonner` - Toast notifications
- `mode-watcher` - Dark mode support

**Dev:**
- `@types/bcrypt` - TypeScript types for bcrypt

## Security Features

✅ Bcrypt password hashing (cost factor 10-12)
✅ JWT with secure secret
✅ Secure cookies in production
✅ Route-level protection
✅ Role-based access control
✅ Email normalization (lowercase)
✅ HTTPS-only cookies in production

## Customization

### Change Session Duration
Edit `src/lib/server/auth.ts`:
```typescript
session: {
  maxAge: 7 * 24 * 60 * 60, // Change from 7 days
}
```

### Add Custom User Fields
1. Update Prisma User model
2. Update `src/app.d.ts` types
3. Update JWT/session callbacks in `auth.ts`
4. Run `pnpm db:gen && pnpm db:migrate`

### Customize Sign-in Page
Edit `src/routes/(auth)/signin/+page.svelte`

### Add More Providers
Edit `src/lib/server/auth.ts` and add providers:
```typescript
import GitHub from "@auth/sveltekit/providers/github"

providers: [
  Credentials({ /* ... */ }),
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
]
```

## Troubleshooting

**Issue:** "AUTH_SECRET is not defined"
- Run `openssl rand -base64 32` and add to `.env`

**Issue:** "User table does not exist"
- Run `pnpm db:gen && pnpm db:migrate`

**Issue:** "Invalid credentials" on sign-in
- Check user exists in database
- Verify password is hashed correctly
- Check email is lowercase

**Issue:** Redirects to `/signin` even when authenticated
- Clear browser cookies
- Check `AUTH_SECRET` is set
- Verify middleware chain in `hooks.server.ts`

## Learn More

- [Auth.js Docs](https://authjs.dev)
- [SvelteKit Auth.js](https://authjs.dev/getting-started/installation?framework=sveltekit)
- [Prisma Docs](https://www.prisma.io/docs)
