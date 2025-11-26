# Mermaid – Markdown‑Inspired Diagramming Library

Mermaid is a JavaScript‑based diagramming tool that turns simple, Markdown‑style text into rich, interactive diagrams.  
It is designed to keep documentation up‑to‑date while consuming minimal developer time.

---

## Table of Contents

| Section | Description |
|--------|------------|
| [Installation](#installation) | How to add Mermaid to your project |
| [Getting Started](#getting-started) | Quick example |
| [Supported Diagram Types](#supported-diagram-types) | List of diagram kinds |
| [Examples](#examples) | Full code snippets for each diagram |
| [Security](#security) | How Mermaid protects against malicious input |
| [Contributing](#contributing) | How to help |
| [License](#license) | MIT |

---

## Installation

Mermaid is available as an ESM package.  
Add it to your project with npm or yarn:

```bash
npm install mermaid@11.9.0
# or
yarn add mermaid@11.9.0
```

If you prefer a CDN, use:

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11.9.0/dist/mermaid.min.js"></script>
```

---

## Getting Started

```js
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true
});
```

Place a `<div class="mermaid">` element in your HTML and write Mermaid syntax inside it.

```html
<div class="mermaid">
  graph LR
    A[Hard] -->|Text| B(Round)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]
</div>
```

Mermaid will automatically render the diagram when the page loads.

---

## Supported Diagram Types

| Diagram | Syntax |
|--------|-------|
| Flowchart | `flowchart` |
| Sequence | `sequenceDiagram` |
| Gantt | `gantt` |
| Class | `classDiagram` |
| State | `stateDiagram-v2` |
| Pie | `pie` |
| Git Graph | `gitGraph` |
| Bar Chart (via Gantt) | `gantt` |
| User Journey | `journey` |
| C4 Context | `C4Context` |

---

## Examples

Below are full, runnable examples for each diagram type.  
Copy the code into a `<div class="mermaid">` block or use the Live Editor.

### Flowchart

```mermaid
flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
```

### Sequence Diagram

```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop HealthCheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```

### Gantt Chart

```mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
```

### Class Diagram

```mermaid
classDiagram
  Class01 <|-- AveryLongClass : Cool
  <<Interface>> Class01
  Class09 --> C2 : Where am I?
  Class09 --* C3
  Class09 --|> Class07
  Class07 : equals()
  Class07 : Object[] elementData
  Class01 : size()
  Class01 : int chimp
  Class01 : int gorilla
  class Class10 {
    <<service>>
    int id
    size()
  }
```

### State Diagram

```mermaid
stateDiagram-v2
  [*] --> Still
  Still --> [*]
  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
```

### Pie Chart

```mermaid
pie
  "Dogs" : 386
  "Cats" : 85.9
  "Rats" : 15
```

### Git Graph

```mermaid
gitGraph
  commit
  commit
  branch develop
  checkout develop
  commit
  commit
  checkout main
  merge develop
  commit
  commit
```

### Bar Chart (via Gantt)

```mermaid
gantt
    title Git Issues - days since last update
    dateFormat  X
    axisFormat %s

    section Issue19062
    71   : 0, 71
    section Issue19401
    36   : 0, 36
    section Issue193
    34   : 0, 34
    section Issue7441
    9    : 0, 9
    section Issue1300
    5    : 0, 5
```

### User Journey

```mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 3: Me
```

### C4 Context Diagram

```mermaid
C4Context
title System Context diagram for Internet Banking System

Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
Person(customerB, "Banking Customer B")
Person_Ext(customerC, "Banking Customer C")
System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

Enterprise_Boundary(b1, "BankBoundary") {
  SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

  System_Boundary(b2, "BankBoundary2") {
    System(SystemA, "Banking System A")
    System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts.")
  }

  System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
  SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

  Boundary(b3, "BankBoundary3", "boundary") {
    SystemQueue(SystemF, "Banking System F Queue", "A system of the bank, with personal bank accounts.")
    SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
  }
}

BiRel(customerA, SystemAA, "Uses")
BiRel(SystemAA, SystemE, "Uses")
Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
Rel(SystemC, customerA, "Sends e-mails to")
```

---

## Security

Mermaid sanitizes incoming diagram code to prevent malicious scripts.  
For sites that accept user‑generated diagrams, you can enable sandboxed rendering:

```js
mermaid.initialize({
  securityLevel: 'sandbox'
});
```

This renders diagrams inside a sandboxed `<iframe>`, blocking any JavaScript execution from the diagram code.

---

## Contributing

Mermaid is an open‑source project.  
If you’d like to contribute:

1. Fork the repo.
2. Create a feature branch.
3. Submit a pull request.

See the [Contribution Guide](https://github.com/mermaid-js/mermaid/blob/main/CONTRIBUTING.md) for details.

---

## License

MIT © Mermaid

---