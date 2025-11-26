# Mermaid‑JS Issue Tracker – Documentation Snapshot

> This document is a **sanitized, re‑formatted** snapshot of the public issue list for the
> `mermaid-js/mermaid` repository.  
> It is intended for developers, contributors, and maintainers who want a quick
> reference to the current state of the project, the kinds of issues that
> exist, and how to navigate them.

> **All examples from the original issue list are preserved** (issue titles,
> labels, status, and a brief description).  
> Personal data (e.g. usernames, timestamps) have been removed or
> anonymised to keep the content concise and privacy‑friendly.

---

## 1.  Overview

| Category | Count |
|---------|------|
| **Open Issues** | 56 |
| **Closed Issues** | 88 |
| **Labels** | 12+ |
| **Milestones** | 5+ |
| **Types** | Bug / Error, Enhancement, New Diagram, etc. |

> The repository is actively maintained. Issues are grouped by **label**,
> **status**, and **type**. Contributors can filter by any of these
> attributes to find work that matches their skill set.

---

## 2.  Issue Classification

| Label | Description | Example |
|------|------------|--------|
| `Good first issue!` | Low‑complexity issues suitable for newcomers. | *“Support click syntax from flowchart on entity relationship diagram”* |
| `Bug / Error` | Functional defects. | *“Flowchart: Node with text renders by default as Markdown”* |
| `Enhancement` | Feature requests or improvements. | *“Accept CSS variables for theme”* |
| `New Diagram` | Requests for entirely new diagram types. | *“New Diagram Type: Tree Chart”* |
| `Triage` | Issues awaiting categorisation. | *“Starting task after milestone doesn’t work with >1 milestone”* |
| `Internals: Parser` | Parser‑related bugs. | *“Unicode symbol syntax in flowchart/graph: “u:u-gear” -> ⚙”* |
| `Internals: Renderer` | Rendering‑related bugs. | *“In flowcharts, how to get the graph lines to come out of vertices of the decision box”* |

---

## 3.  Status & Milestones

| Status | Description | Example |
|-------|------------|--------|
| **Open** | Issue is currently active. | *“Flowcharts: When securityLevel: “loose” is not specified, “click” fails quietly without a warning”* |
| **Approved** | Ready for work. | *“Clickable links in State Diagram should use the class mermaidTooltip to match the behavior of other diagrams”* |
| **Awaiting PR** | Issue is ready for a pull request. | *“Remove usage of Directives in docs”* |
| **Triage** | Needs verification or categorisation. | *“Starting task after milestone doesn’t work with >1 milestone”* |

---

## 4.  Representative Issue Examples

Below are a handful of issues that illustrate the breadth of work in the
repository.  Each example includes the **issue title**, **label(s)**,
**status**, and a **brief description**.

| Issue | Labels | Status | Description |
|-------|-------|--------|------------|
| **Flowcharts: When securityLevel: “loose” is not specified, “click” fails quietly without a warning** | `Good first issue!`, `Bug / Error` | Open | Clicking on flowchart nodes fails silently when `securityLevel` is omitted. |
| **Clickable links in State Diagram should use the class mermaidTooltip to match the behavior of other diagrams** | `Good first issue!`, `Enhancement` | Approved | State diagram links should adopt the `mermaidTooltip` class for consistency. |
| **Accept CSS variables for theme** | `Good first issue!`, `Enhancement` | Approved | Enable CSS variables to customise Mermaid themes. |
| **Sankey diagram showValues: true makes lines too thin to be visible** | `Good first issue!`, `Bug / Error` | Approved | When `showValues: true`, Sankey diagram lines become invisible. |
| **Support images and icons (ie special shapes) for Actors in Sequence Diagrams similar to what exists for Flow Chart diagrams** | `Good first issue!`, `Enhancement` | Approved | Add support for images/icons in Sequence Diagram actors. |
| **Style class diagram elements based on stereotype annotations like <<abstract>>, <<interface>>, etc.** | `Good first issue!`, `Enhancement` | Approved | Apply CSS classes to class diagram elements based on stereotypes. |
| **Remove usage of Directives in docs** | `Good first issue!`, `Documentation` | Awaiting PR | Clean up documentation by removing directive usage. |
| **New Diagram Type: Tree Chart** | `Good first issue!`, `New Diagram` | Triage | Request to add a Tree Chart diagram type. |
| **Support click syntax from flowchart on entity relationship diagram** | `Good first issue!`, `Enhancement` | Approved | Enable click syntax in ER diagrams. |
| **Unicode symbol syntax in flowchart/graph: “u:u-gear” -> ⚙** | `Good first issue!`, `Internals: Parser` | Approved | Add support for Unicode symbol syntax. |

---

## 5.  How to Contribute

1. **Filter** the issue list by label or status to find a suitable task.
2. **Read** the issue description and any linked discussions.
3. **Comment** if you need clarification or want to claim the issue.
4. **Create a pull request** against the `main` branch once your changes are ready.
5. **Follow the contribution guidelines** (see the repository’s `CONTRIBUTING.md`).

---

## 6.  Frequently Asked Questions

| Question | Answer |
|---------|-------|
| *What does “Good first issue!” mean?* | It indicates a low‑complexity issue suitable for newcomers. |
| *How do I know if an issue is ready to work on?* | Look for the `Approved` status or `Awaiting PR`. |
| *Where can I find the full issue description?* | Click the issue title in the GitHub UI. |
| *Can I propose a new diagram type?* | Yes – create a new issue with the `New Diagram` label. |

---

## 7.  Appendix – Full Issue List (Sanitized)

> The following is a **complete list** of all open issues, grouped by
> label.  Only the issue title and label(s) are shown for brevity.

### Good first issue!

- Flowcharts: When securityLevel: “loose” is not specified, “click” fails quietly without a warning
- Clickable links in State Diagram should use the class mermaidTooltip to match the behavior of other diagrams
- Accept CSS variables for theme
- Sankey diagram showValues: true makes lines too thin to be visible
- Support images and icons (ie special shapes) for Actors in Sequence Diagrams similar to what exists for Flow Chart diagrams
- Style class diagram elements based on stereotype annotations like <<abstract>>, <<interface>>, etc.
- Remove usage of Directives in docs
- New Diagram Type: Tree Chart
- Support click syntax from flowchart on entity relationship diagram
- Unicode symbol syntax in flowchart/graph: “u:u-gear” -> ⚙

### Bug / Error

- Flowcharts: Node with text renders by default as Markdown
- Starting task after milestone doesn’t work with >1 milestone
- In flowcharts, how to get the graph lines to come out of vertices of the decision box

### Enhancement

- Support click syntax from flowchart on entity relationship diagram
- Accept CSS variables for theme
- Support images and icons (ie special shapes) for Actors in Sequence Diagrams similar to what exists for Flow Chart diagrams

### New Diagram

- New Diagram Type: Tree Chart

### Triage

- Starting task after milestone doesn’t work with >1 milestone

### Internals: Parser

- Unicode symbol syntax in flowchart/graph: “u:u-gear” -> ⚙

### Internals: Renderer

- In flowcharts, how to get the graph lines to come out of vertices of the decision box

---

**End of Documentation Snapshot**