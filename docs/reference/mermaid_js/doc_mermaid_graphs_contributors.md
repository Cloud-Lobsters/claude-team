# mermaid – A JavaScript Diagramming & Charting Library

> **mermaid** is a JavaScript library that renders Markdown‑like diagrams and flowcharts from text definitions.  
> It is maintained by the **mermaid‑js** organization on GitHub.

---

## Table of Contents

1. [Overview](#overview)
2. [Repository Highlights](#repository-highlights)
3. [Getting Started](#getting-started)
4. [Contribution Guidelines](#contribution-guidelines)
5. [License](#license)

---

## 1. Overview

- **Repository:** `mermaid-js/mermaid`  
- **Stars:** 82 k  
- **Forks:** 7.9 k  
- **Pull Requests:** 147  
- **Issues:** 1.3 k  
- **Commits:** 3 088 (as of 2025‑08‑10)  
- **Primary Language:** JavaScript (ES6+)

mermaid allows you to embed diagrams directly in Markdown, HTML, or any JavaScript‑enabled environment. It supports a wide range of diagram types, including flowcharts, sequence diagrams, Gantt charts, class diagrams, state machines, and more.

---

## 2. Repository Highlights

| Metric | Value |
|-------|------|
| **Commit History** | 3 088 commits (2014‑2025) |
| **Top Contributors** | `sidharthv96` (3 088 commits), `knsv` (2 799 commits), `ashishjain0512` (508 commits) |
| **Dependency Graph** | Updated regularly via Dependabot |
| **Security** | 3 open security advisories (resolved) |
| **Insights** | Weekly commit activity chart (2014‑2025) |

---

## 3. Getting Started

### Installation

```bash
# npm
npm install mermaid

# yarn
yarn add mermaid
```

### Basic Usage

```html
<script src="node_modules/mermaid/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true });
</script>

<div class="mermaid">
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
```

> **Note:** The above example renders a simple directed graph.  
> For a full list of diagram types and syntax, refer to the official documentation.

---

## 4. Contribution Guidelines

- **Pull Requests**: Follow the [contributing guide](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md).  
- **Issues**: Use the issue templates for bugs, feature requests, and documentation improvements.  
- **Code of Conduct**: All contributors must adhere to the [Code of Conduct](https://github.com/mermaid-js/mermaid/blob/main/CODE_OF_CONDUCT.md).  

---

## 5. License

This project is licensed under the **MIT License**. See the `LICENSE` file in the repository for details.

---

### Appendix

- **Commit Activity Chart**: The repository’s commit history spans from November 2014 to August 2025, with a noticeable increase in contributions during 2020‑2025.  
- **Security**: The repository has 3 open security advisories, all of which have been addressed.  

---

*For more detailed information, visit the official GitHub repository: https://github.com/mermaid-js/mermaid*