# Mermaid – Diagramming from Markdown‑like Text

Mermaid is a JavaScript‑based diagramming and charting tool that turns simple, Markdown‑style text into rich, interactive diagrams.  
It is designed to keep documentation up‑to‑date while saving developers time.

---

## Table of Contents

1. [Overview](#overview)  
2. [Getting Started](#getting-started)  
3. [Examples](#examples)  
4. [Security](#security)  
5. [Contributing](#contributing)  
6. [License](#license)  

---

## 1. Overview

Mermaid lets you write diagrams in plain text and renders them in the browser or in a Node.js environment.  
Typical use cases:

- Live‑editing in Markdown files  
- Embedding in documentation sites (GitHub, GitLab, etc.)  
- Programmatic generation of diagrams in CI/CD pipelines  

---

## 2. Getting Started

### Install

```bash
npm install mermaid
```

### Basic Usage

```js
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true });

const diagram = `
flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
`;
mermaid.render('flowchart', diagram, (svg) => {
  document.getElementById('diagram').innerHTML = svg;
});
```

> **Tip** – For a quick demo, use the [Live Editor](https://mermaid.live).

---

## 3. Examples

Below are the most common diagram types. Copy the code into the Live Editor or your own project.

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
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
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

### Git Graph (Experimental)

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

### Bar Chart (using Gantt)

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

### User Journey Diagram

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

  System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e‑mail system.")
  SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

  Boundary(b3, "BankBoundary3", "boundary") {
    SystemQueue(SystemF, "Banking System F Queue", "A system of the bank, with personal bank accounts.")
    SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
  }
}

BiRel(customerA, SystemAA, "Uses")
BiRel(SystemAA, SystemE, "Uses")
Rel(SystemAA, SystemC, "Sends e‑mails", "SMTP")
Rel(SystemC, customerA, "Sends e‑mails to")
```

---

## 4. Security

Mermaid sanitizes user‑supplied diagram code to prevent XSS.  
For highly untrusted input, render diagrams inside a sandboxed `<iframe>` to block JavaScript execution.  
Interactive features may be disabled in this mode.

---

## 5. Contributing

- Fork the repo → `git clone <repo>`  
- Install dependencies: `pnpm install`  
- Run tests: `pnpm test`  
- Submit a pull request

See the full [Contributing Guide](CONTRIBUTING.md) for details.

---

## 6. License

MIT © 2025 Mermaid.js

---