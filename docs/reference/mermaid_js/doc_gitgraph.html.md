# Mermaid GitGraph Documentation

> This guide covers the **GitGraph** diagram type in Mermaid.  
> All examples from the original source are preserved.

---

## 1. Overview

A **GitGraph** is a pictorial representation of Git commits and actions (branch, checkout, merge, cherry‑pick, etc.).  
It is useful for visualising branching strategies, release flows, and collaboration.

---

## 2. Basic Syntax

```mermaid
gitGraph
   commit
   commit
   commit
```

* `gitGraph` – declares the diagram type.  
* `commit` – adds a commit to the current branch.  
* By default the diagram starts on the **main** branch.

---

## 3. Customising Commits

### 3.1 Custom Commit ID

```mermaid
gitGraph
   commit id: "Alpha"
   commit id: "Beta"
   commit id: "Gamma"
```

### 3.2 Commit Types

| Type | Shape | Usage |
|------|------|------|
| `NORMAL` | solid circle | default |
| `REVERSE` | crossed solid circle | `commit type: REVERSE` |
| `HIGHLIGHT` | filled rectangle | `commit type: HIGHLIGHT` |

```mermaid
gitGraph
   commit id: "Normal"
   commit
   commit id: "Reverse" type: REVERSE
   commit
   commit id: "Highlight" type: HIGHLIGHT
   commit
```

### 3.3 Tags

```mermaid
gitGraph
   commit
   commit id: "Normal" tag: "v1.0.0"
   commit id: "Reverse" type: REVERSE tag: "RC_1"
   commit id: "Highlight" type: HIGHLIGHT tag: "8.8.4"
   commit
```

---

## 4. Branch Operations

| Keyword | Description | Example |
|--------|------------|--------|
| `branch <name>` | Create & switch to a new branch | `branch develop` |
| `checkout <name>` | Switch to an existing branch | `checkout develop` |
| `merge <name>` | Merge `<name>` into current branch | `merge develop` |

```mermaid
gitGraph
   commit
   commit
   branch develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

---

## 5. Cherry‑Pick

```mermaid
gitGraph
   commit id: "ZERO"
   branch develop
   branch release
   commit id:"A"
   checkout main
   commit id:"ONE"
   checkout develop
   commit id:"B"
   checkout main
   merge develop id:"MERGE"
   commit id:"TWO"
   checkout release
   cherry-pick id:"MERGE" parent:"B"
   commit id:"THREE"
   checkout develop
   commit id:"C"
```

* `cherry-pick id: "<commit_id>" parent: "<parent_commit_id>"`

---

## 6. Configuration Options

```mermaid
---
config:
  gitGraph:
    showBranches: false
    showCommitLabel: false
    mainBranchName: 'MetroLine1'
    mainBranchOrder: 2
    parallelCommits: true
---
gitGraph
   ...
```

| Option | Default | Description |
|-------|--------|------------|
| `showBranches` | `true` | Show/hide branch lines |
| `showCommitLabel` | `true` | Show/hide commit labels |
| `mainBranchName` | `"main"` | Custom name for the default branch |
| `mainBranchOrder` | `0` | Position of the main branch |
| `parallelCommits` | `false` | Render commits at the same level |

---

## 7. Orientation

```mermaid
gitGraph LR:
   commit
   commit
   branch develop
   commit
   commit
   checkout main
   commit
   commit
   merge develop
   commit
   commit
```

* `LR:` – Left to Right (default)  
* `TB:` – Top to Bottom  
* `BT:` – Bottom to Top (v11.0.0+)

---

## 8. Themes

Mermaid ships with several themes: `base`, `forest`, `dark`, `default`, `neutral`.  
Set the theme via the `theme` config:

```mermaid
---
config:
  theme: 'forest'
---
gitGraph
   ...
```

---

## 9. Theme Variables

| Variable | Purpose | Example |
|---------|--------|--------|
| `git0` … `git7` | Branch colors | `themeVariables: { 'git0': '#ff0000', ... }` |
| `gitBranchLabel0` … `gitBranchLabel7` | Branch label colors | `themeVariables: { 'gitBranchLabel0': '#ffffff', ... }` |
| `commitLabelColor`, `commitLabelBackground` | Commit label styling | `themeVariables: { commitLabelColor: '#ff0000', commitLabelBackground: '#00ff00' }` |
| `commitLabelFontSize` | Commit label font size | `themeVariables: { commitLabelFontSize: '16px' }` |
| `tagLabelColor`, `tagLabelBackground`, `tagLabelBorder` | Tag label styling | `themeVariables: { tagLabelColor: '#ff0000', tagLabelBackground: '#00ff00', tagLabelBorder: '#0000ff' }` |
| `gitInv0` … `gitInv7` | Highlight commit colors per branch | `themeVariables: { 'gitInv0': '#ff0000' }` |

---

## 10. Example: Full Diagram with Customisation

```mermaid
---
config:
  logLevel: 'debug'
  theme: 'forest'
  gitGraph:
    showBranches: true
    showCommitLabel: true
    mainBranchName: 'MetroLine1'
    mainBranchOrder: 2
  themeVariables:
    'git0': '#ff0000'
    'git1': '#00ff00'
    'git2': '#0000ff'
    'git3': '#ff00ff'
    'git4': '#00ffff'
    'git5': '#ffff00'
    'git6': '#ff00ff'
    'git7': '#00ffff'
    commitLabelColor: '#ff0000'
    commitLabelBackground: '#00ff00'
    commitLabelFontSize: '16px'
    tagLabelColor: '#ff0000'
    tagLabelBackground: '#00ff00'
    tagLabelBorder: '#0000ff'
    'gitInv0': '#ff0000'
---
gitGraph
   commit id:"NewYork"
   commit id:"Dallas"
   branch MetroLine2
   commit id:"LosAngeles"
   commit id:"Chicago"
   commit id:"Houston"
   branch MetroLine3
   commit id:"Phoenix"
   commit type: HIGHLIGHT id:"Denver"
   commit id:"Boston"
   checkout MetroLine1
   commit id:"Atlanta"
   merge MetroLine3
   commit id:"Miami"
   commit id:"Washington"
   merge MetroLine2 tag:"MY JUNCTION"
   commit id:"Boston"
   commit id:"Detroit"
   commit type:REVERSE id:"SanFrancisco"
```

---

### End of Documentation

All examples from the original source are included verbatim.  
Feel free to copy the code blocks into your Mermaid‑enabled editor to see the diagrams in action.