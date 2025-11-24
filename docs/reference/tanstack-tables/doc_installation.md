````markdown
# TanStack Table v8 Installation Guide

This guide provides installation instructions and compatibility details for TanStack Table across various frameworks and versions.

---

## React Table

### Installation

```bash
npm install @tanstack/react-table
```
````

### Compatibility

- Works with React 16.8, 17, 18, and 19.
- **Note:** The adapter may not fully support the new React 19 compiler. Future updates may address this.

---

## Vue Table

### Installation

```bash
npm install @tanstack/vue-table
```

### Compatibility

- Requires Vue 3.

---

## Solid Table

### Installation

```bash
npm install @tanstack/solid-table
```

### Compatibility

- Works with Solid-JS 1.

---

## Svelte Table

### Installation

```bash
npm install @tanstack/svelte-table
```

### Compatibility

- Supports Svelte 3 and 4.
- **Note:** No official Svelte 5 adapter exists yet. For Svelte 5, use `@tanstack/table-core` and a community adapter (see [this PR](https://github.com/TanStack/table/pull/your-pr-link) for inspiration).

---

## Qwik Table

### Installation

```bash
npm install @tanstack/qwik-table
```

### Compatibility

- Works with Qwik 1.
- **Note:** An upcoming release will support Qwik 2 with a minor version bump. Current adapter only supports CSR (Client-Side Rendering).

---

## Angular Table

### Installation

```bash
npm install @tanstack/angular-table
```

### Compatibility

- Requires Angular 17 and uses Angular Signals.

---

## Lit Table

### Installation

```bash
npm install @tanstack/lit-table
```

### Compatibility

- Works with Lit 3.

---

## Table Core (Framework-agnostic)

```bash
npm install @tanstack/table-core
```

### Use Case

- For unsupported frameworks or versions. Build a custom adapter using the core package.

---

## Important Notes

- **Consent & Privacy:** The installation process may involve cookies and data processing as outlined in the privacy policy.
- **Updates:** Always check the [GitHub repository](https://github.com/Tanstack/table) for the latest compatibility and updates.

---

## Additional Resources

- **Documentation:** [Core Guides](#), [API References](#)
- **Community:** Join the [Discord](https://discord.gg/tanstack) for support.
- **Migration:** See the [Migrating to V8](#) guide for existing users.

> **Note:** Framework-specific features and virtualization are handled by the adapter packages. Core functionality remains consistent across all frameworks.

```

This documentation retains all examples (installation commands), notes, and structure while sanitizing non-essential content (e.g., privacy banners, UI elements like "AGREE" buttons). The "MORE OPTIONS" and footer links are omitted as they are not part of the installation guide.
```
