# Argos – Visual Testing SDK for Playwright

> **Argos** is a modern, open‑source visual‑testing platform that lets you capture, compare, and review screenshots from your Playwright tests.  
> It integrates seamlessly with GitHub / GitLab PRs, provides a fast review UI, and supports cross‑browser, responsive, and cross‑platform testing.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Overview](#overview) | What Argos does for Playwright |
| [Installation](#installation) | Add Argos to your project |
| [Configuration](#configuration) | Set up the SDK |
| [Usage](#usage) | Capture screenshots in tests |
| [Example Test](#example-test) | Full `purchase.spec.ts` |
| [CI Integration](#ci-integration) | Run Argos in CI |
| [FAQ](#faq) | Common questions |
| [Resources](#resources) | Docs, community, etc. |

---

## Overview

- **No screenshot commits** – Argos stores screenshots in its own storage, so your repo stays clean.
- **Fast** – Screenshots are uploaded in parallel; the SDK is lightweight.
- **Review UI** – Diff viewer, keyboard shortcuts, pull‑request comments.
- **Cross‑browser & responsive** – Capture the same component in Chrome, Firefox, Safari, etc.
- **Open‑source** – 100 % OSS, community‑driven.

---

## Installation

```bash
# npm
npm install --save-dev @argos-ci/playwright

# yarn
yarn add --dev @argos-ci/playwright
```

> **Prerequisite** – You must have a Playwright test project already set up.

---

## Configuration

Create a file named `argos.config.ts` (or add the config to your existing Playwright config):

```ts
// argos.config.ts
import { defineConfig } from '@argos-ci/playwright';

export default defineConfig({
  // Optional: set the Argos project name
  project: 'my-playwright-project',
  // Optional: set the base URL for screenshots
  baseUrl: 'http://localhost:3000',
});
```

Add the Argos plugin to your Playwright config:

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import argosPlugin from '@argos-ci/playwright';

export default defineConfig({
  use: {
    // ... other settings
  },
  plugins: [argosPlugin()],
});
```

---

## Usage

In your tests, call `argosScreenshot()` (or `argosScreenshot` helper) to capture a screenshot.  
The SDK automatically uploads the screenshot to Argos and attaches the result to the test.

```ts
import { test, expect } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

test('purchase flow', async ({ page }) => {
  await page.goto('/purchase');
  await page.click('button#buy');
  await argosScreenshot(page, 'purchase-page');
});
```

### Screenshot Options

```ts
await argosScreenshot(page, 'checkout-page', {
  // Capture only the element
  selector: '#checkout',
  // Capture the viewport
  viewport: { width: 1280, height: 720 },
  // Disable animations
  disableAnimations: true,
});
```

---

## Example Test – `purchase.spec.ts`

```ts
// purchase.spec.ts
import { test, expect } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

test('purchase flow', async ({ page }) => {
  await page.goto('/purchase');
  await page.click('button#buy');
  await argosScreenshot(page, 'purchase-page');
});
```

> **Tip** – Keep screenshot names descriptive; they become the diff titles in Argos.

---

## CI Integration

Add the following to your CI pipeline (GitHub Actions example):

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install
      - run: npx playwright test
      - name: Upload screenshots to Argos
        env:
          ARGOS_TOKEN: ${{ secrets.ARGOS_TOKEN }}
        run: npx argos upload
```

- **`ARGOS_TOKEN`** – Create a token in Argos → Settings → Tokens.  
- The `argos upload` command uploads screenshots that were captured during the test run.

---

## FAQ

| Question | Answer |
|---------|-------|
| **What is visual testing?** | Comparing rendered UI against a baseline to catch regressions. |
| **Why use Argos over Playwright’s built‑in screenshot?** | Argos stores screenshots centrally, provides a review UI, PR comments, and cross‑browser support. |
| **Is Argos free?** | Yes, it’s open‑source and free for public projects. |
| **What languages/frameworks does it support?** | Any language that can run Playwright (JS/TS, Python, Java, C#). |
| **Can I use Argos with Cypress?** | Yes – see the Cypress integration docs. |

---

## Resources

- **Docs** – https://argos-ci.com/docs
- **GitHub** – https://github.com/argos-ci
- **Community** – Discord, Slack, GitHub Discussions
- **Open‑Source** – MIT license

---

**Happy testing!**