# Auth.js Documentation

> **Auth.js** – The modern, open‑source authentication framework for web applications.  
> **Last updated:** June 22, 2025

---

## Table of Contents

1. [Introduction](#introduction)
2. [Migration to NextAuth.js v5](#migration-to-nextauthjs-v5)
3. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Authentication](#authentication)
     - [OAuth](#oauth)
     - [Magic Links](#magic-links)
     - [Credentials](#credentials)
     - [WebAuthn](#webauthn)
   - [Database](#database)
   - [Session Management](#session-management)
   - [Deployment](#deployment)
   - [TypeScript](#typescript)
   - [Connections](#connections)
   - [Providers](#providers)
   - [Adapters](#adapters)
   - [Integrations](#integrations)
4. [About Auth.js](#about-authjs)
5. [Security](#security)
6. [Community](#community)
7. [Download & Resources](#download--resources)
8. [Acknowledgements](#acknowledgements)
9. [Contributors](#contributors)
10. [Sponsors](#sponsors)
11. [License](#license)

---

## Introduction

Auth.js is a lightweight, flexible authentication library that supports a wide range of authentication flows out of the box. Whether you need simple email/password login, OAuth with popular providers, magic links, or WebAuthn, Auth.js has you covered.

---

## Migration to NextAuth.js v5

If you’re upgrading from **NextAuth.js v4** to **Auth.js v5**, consult the official migration guide for breaking changes, new configuration options, and best‑practice patterns.  
> *Link to migration guide:* `https://authjs.dev/migration-guide`

---

## Getting Started

### Installation

```bash
# npm
npm install @authjs/core

# yarn
yarn add @authjs/core

# pnpm
pnpm add @authjs/core
```

> **Tip:** For a full starter kit, check out the official templates on GitHub.

### Authentication

Auth.js supports multiple authentication strategies. Below are the core flows.

#### OAuth

Auth.js ships with **over 80 pre‑configured OAuth providers**. We actively test the ~20 most popular ones in our example application. Choose a provider to get a quick walkthrough, or find your provider of choice in the sidebar for detailed docs.

| Provider | Quick Start |
|----------|-------------|
| Google   | `@authjs/providers/google` |
| GitHub   | `@authjs/providers/github` |
| Twitter  | `@authjs/providers/twitter` |
| Keycloak | `@authjs/providers/keycloak` |
| Okta     | `@authjs/providers/okta` |

> *Example:*  
> ```ts
> import { Auth } from '@authjs/core';
> import GoogleProvider from '@authjs/providers/google';
> 
> const auth = new Auth({
>   providers: [
>     GoogleProvider({
>       clientId: process.env.GOOGLE_CLIENT_ID,
>       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
>     }),
>   ],
> });
> ```

#### Magic Links

Send a one‑time login link to the user’s email address.

```ts
import EmailProvider from '@authjs/providers/email';

const auth = new Auth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});
```

#### Credentials

Custom username/password authentication.

```ts
import CredentialsProvider from '@authjs/providers/credentials';

const auth = new Auth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Verify credentials against your database
        const user = await findUser(credentials.username);
        if (user && verifyPassword(credentials.password, user.passwordHash)) {
          return user;
        }
        return null;
      },
    }),
  ],
});
```

#### WebAuthn

Passwordless authentication using FIDO2/WebAuthn.

```ts
import WebAuthnProvider from '@authjs/providers/webauthn';

const auth = new Auth({
  providers: [
    WebAuthnProvider({
      // Configuration options
    }),
  ],
});
```

### Database

Persist users, sessions, and accounts using any supported adapter (e.g., Prisma, TypeORM, MongoDB).  
> *Example:*  
> ```ts
> import { PrismaAdapter } from '@authjs/adapters/prisma';
> 
> const auth = new Auth({
>   adapter: PrismaAdapter(prisma),
> });
> ```

### Session Management

Auth.js supports JWT and database sessions. Configure the session strategy in the Auth constructor.

```ts
const auth = new Auth({
  session: {
    strategy: 'jwt', // or 'database'
  },
});
```

### Deployment

Deploy Auth.js with any Node.js hosting provider (Vercel, Netlify, Railway, etc.). Ensure environment variables are set correctly.

### TypeScript

Auth.js is written in TypeScript and ships with full type definitions. No additional setup is required.

### Connections

Manage multiple authentication connections (e.g., multiple OAuth providers) by configuring them in the `providers` array.

### Providers

Auth.js supports a wide range of providers. Refer to the [Providers](#providers) section for a complete list and configuration details.

### Adapters

Adapters bridge Auth.js with your database of choice. Popular adapters include:

- Prisma
- TypeORM
- MongoDB
- MySQL
- PostgreSQL

### Integrations

Integrate Auth.js with third‑party services (e.g., analytics, email services, SSO solutions) via custom adapters or middleware.

---

## About Auth.js

Auth.js is an open‑source project maintained by **Balázs Orbán** and the community. It is designed to be:

- **Modular** – plug in only the providers you need.
- **Secure** – follows industry best practices for authentication.
- **Extensible** – add custom adapters, providers, or middleware.

---

## Security

Auth.js follows the latest security guidelines:

- **CSRF protection** for all routes.
- **Rate limiting** for login attempts.
- **Secure cookie handling** (HTTPOnly, SameSite, Secure).
- **Password hashing** with Argon2 or bcrypt.
- **OAuth state parameter** validation.

For detailed security best practices, see the [Security](#security) section.

---

## Community

- **Discord** – Join the Auth.js community for support and discussions.  
- **GitHub** – Contribute, file issues, or review pull requests.  
- **Twitter** – Follow @authjs for updates.

---

## Download & Resources

- **GitHub Repository** – `https://github.com/authjs/authjs`
- **NPM Package** – `https://www.npmjs.com/package/@authjs/core`
- **Documentation** – `https://authjs.dev`

---

## Acknowledgements

Auth.js would not exist without the contributions of the open‑source community. Thank you to all maintainers, contributors, and users.

---

## Contributors

- **Balázs Orbán** – Lead Maintainer
- **[Contributors list](https://github.com/authjs/authjs/graphs/contributors)**

---

## Sponsors

We gratefully acknowledge our sponsors who support the development of Auth.js.

---

## License

Auth.js is released under the MIT License. See the `LICENSE` file in the repository for details.

---