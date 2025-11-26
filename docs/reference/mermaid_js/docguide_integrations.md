# ESLint Integration Guide

> This document consolidates the integration options available for ESLint across editors, build tools, command‑line utilities, source‑control hooks, and other community projects.  
> All examples shown are taken verbatim from the official ESLint documentation.

---

## Table of Contents

1. [Editors](#editors)
2. [Build Tools](#build-tools)
3. [Command‑Line Tools](#command-line-tools)
4. [Source‑Control Hooks](#source-control-hooks)
5. [Other Integration Lists](#other-integration-lists)
6. [License](#license)

---

## 1. Editors

| Editor | Integration | Notes |
|-------|------------|------|
| **Sublime Text 3** | `SublimeLinter-eslint` | |
| **Vim** | `ALE` | |
| | `Syntastic` | |
| **Neovim** | `nvim-lspconfig` | |
| | `nvim-lint` | |
| **Emacs** | Flycheck (javascript-eslint checker) | |
| **Eclipse Orion** | ESLint is the default linter | |
| **Eclipse IDE** | Tern ESLint linter | |
| **TextMate 2** | `eslint.tmbundle` | |
| | `javascript-eslint.tmbundle` | |
| **JetBrains IDEs** (IntelliJ IDEA, WebStorm, PhpStorm, PyCharm, RubyMine, etc.) | How to use ESLint | |
| **Visual Studio** | Linting JavaScript in VS | |
| **Visual Studio Code** | ESLint Extension | |
| **Brackets** | Included and Brackets ESLint | |

---

## 2. Build Tools

| Tool | Integration | Example |
|------|------------|--------|
| **Grunt** | `grunt-eslint` | `grunt.registerTask('lint', ['eslint']);` |
| **Webpack** | `eslint-webpack-plugin` | `new ESLintPlugin({ extensions: ['js', 'jsx'] });` |
| **Rollup** | `@rollup/plugin-eslint` | `import eslint from '@rollup/plugin-eslint';` |

---

## 3. Command‑Line Tools

| Tool | Description |
|------|------------|
| **ESLint Watch** | Watches files and re‑runs ESLint on changes |
| **Code Climate CLI** | Integrates ESLint with Code Climate |
| **ESLint Nibble** | Lightweight wrapper for ESLint |

---

## 4. Source‑Control Hooks

| Hook | Description |
|------|------------|
| **Git Pre‑commit Hook** | Lints staged changes before commit |
| **overcommit** | Git hook manager |
| **Mega‑Linter** | CI aggregator that embeds ESLint |

---

## 5. Other Integration Lists

- A curated list of popular integrations can be found in the [awesome‑eslint GitHub repository](https://github.com/awesome-eslint/awesome-eslint).

---

## 6. License

© OpenJS Foundation and ESLint contributors, www.openjsf.org.  
Content licensed under the MIT License.

---