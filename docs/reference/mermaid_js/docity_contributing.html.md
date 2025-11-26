# Mermaid – Contributing Guide (Sanitized & Re‑formatted)

> This document is a cleaned‑up, code‑friendly version of the official Mermaid contributing guide.  
> All examples from the original source are preserved.

---

## 1. Overview

Mermaid is a JavaScript library that turns Markdown‑style text into diagrams.  
This guide explains how to set up a local development environment, create a new feature or bug fix, run tests, and update the documentation.

---

## 2. Initial Setup

### 2.1 Get the Source Code

```bash
# Fork the repo on GitHub, then clone your fork
git clone git@github.com/your-fork/mermaid
cd mermaid
```

### 2.2 Install Requirements

#### Host (recommended)

```bash
# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm env use --global 20
# Reload shell if needed
```

#### Docker (optional)

```bash
# Install Docker
# (X11 server may be required for Cypress GUI)
```

### 2.3 Install Packages

```bash
# Host
pnpm install

# Docker
chmod +x run
./run pnpm install
```

### 2.4 Verify Everything Works

```bash
# Host
pnpm test

# Docker
./run pnpm test
```

All tests should pass.

---

## 3. Workflow

Mermaid follows a Git‑Flow‑inspired branching model.

| Branch | Purpose |
|-------|--------|
| `develop` | Daily development |
| `release/vX.X.X` | Release candidate |
| `master` | Production / docs |

### 3.1 Checkout a New Branch

```bash
git checkout develop
git pull
git checkout -b docs/2910_update-contributing-guidelines
```

Branch naming convention:

```
[feature|bug|chore|docs]/[issue number]_[short-description]
```

Examples:

- `feature/2945_state-diagram-new-arrow-florbs`
- `bug/1123_fix_random_ugly_red_text`

---

## 4. Making Changes

### 4.1 Code Location

Core library: `packages/mermaid/src`

### 4.2 Build & Run

```bash
# Build
pnpm run build          # or ./run build

# Run dev server
pnpm run dev           # or ./run dev
# Open http://localhost:9000
```

### 4.3 Writing Tests

#### Unit Tests (Vitest)

```bash
pnpm test          # run all
pnpm test:watch    # watch mode
```

#### DOM Tests (jsdomIt)

```ts
import { ensureNodeFromSelector, jsdomIt } from './tests/util.js';

jsdomIt('should add element "thing" in the SVG', ({ svg }) => {
  addThing(svg);
  const svgNode = ensureNodeFromSelector('svg');
  expect(svgNode.querySelector('thing')).not.toBeNull();
});
```

#### E2E Tests (Cypress)

```bash
pnpm dev
pnpm cypress:open
```

Example test:

```js
it('should render forks and joins', () => {
  imgSnapshotTest(
    `
    stateDiagram
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]
    `,
    { logLevel: 0 }
  );
});
```

---

## 5. Updating Documentation

Documentation lives in `packages/mermaid/src/docs`.  
Do **not** edit the generated `/docs` folder directly.

### 5.1 Adding a Feature

Add a heading like:

```markdown
# Feature Name (v<MERMAID_RELEASE_VERSION>+)
```

The placeholder will be replaced with the current version during release.

### 5.2 Running Docs Locally

```bash
# Host
pnpm --filter mermaid run docs:dev
# or
cd packages/mermaid
pnpm docs:dev

# Docker
./run docs:dev
```

Open `http://localhost:3333/`.

### 5.3 Markdown Tips

```markdown
```note
This is a note
```

```tip
This is a tip
```

```warning
This is a warning
```

```danger
This is a danger alert
```
```

---

## 6. Submitting a Pull Request

```bash
git push -u origin docs/2910_update-guidelines
```

- Use a descriptive PR title.
- Include `Resolves #<issue-id>` in the description if applicable.
- PRs are reviewed by maintainers; they may request changes.

---

## 7. Summary

1. **Clone** → **Install** → **Build** → **Test** → **Document** → **PR**.  
2. Keep tests up to date.  
3. Keep documentation in sync.  
4. Follow branch naming conventions.  

Happy coding!