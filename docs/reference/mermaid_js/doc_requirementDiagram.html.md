# Mermaid Requirement Diagram Documentation

Mermaid’s **Requirement Diagram** visualises SysML‑style requirements and their relationships to other elements.  
The syntax follows the SysML v1.6 specification and is intentionally lightweight.

---

## 1. Overview

A requirement diagram contains three kinds of nodes:

| Node type | Description |
|----------|------------|
| **Requirement** | A SysML requirement (functional, interface, performance, etc.) |
| **Element** | A lightweight reference to a document or artefact |
| **Relationship** | A directed link between two nodes |

---

## 2. Syntax

```mermaid
requirementDiagram
```

### 2.1 Requirement

```mermaid
requirement <name> {
    id: <id>
    text: <text>
    risk: <risk>
    verifymethod: <method>
}
```

| Keyword | Allowed values |
|--------|---------------|
| `type` | `requirement`, `functionalRequirement`, `interfaceRequirement`, `performanceRequirement`, `physicalRequirement`, `designConstraint` |
| `risk` | `Low`, `Medium`, `High` |
| `verifymethod` | `Analysis`, `Inspection`, `Test`, `Demonstration` |

> **Note** – All identifiers (`name`, `id`, `text`) may be quoted or unquoted.  
> If you use unquoted text, avoid keywords that could be parsed as a new directive.

### 2.2 Element

```mermaid
element <name> {
    type: <type>
    docref: <reference>
}
```

Both `type` and `docref` are user‑defined strings.

### 2.3 Relationship

```mermaid
{source} - <type> -> {destination}
```

or

```mermaid
{destination} <- <type> - {source}
```

Relationship types:

| Type | Meaning |
|-----|--------|
| `contains` | A requirement contains another |
| `copies` | One requirement copies another |
| `derives` | One requirement derives from another |
| `satisfies` | An element satisfies a requirement |
| `verifies` | An element verifies a requirement |
| `refines` | One requirement refines another |
| `traces` | One requirement traces another |

---

## 3. Examples

### 3.1 Minimal Diagram

```mermaid
requirementDiagram

requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
}

element test_entity {
    type: simulation
}

test_entity - satisfies -> test_req
```

### 3.2 Markdown Formatting in Text

```mermaid
requirementDiagram

requirement "__test_req__" {
    id: 1
    text: "*italicized text* **bold text**"
    risk: high
    verifymethod: test
}
```

### 3.3 Full Feature Set

```mermaid
requirementDiagram

requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
}

functionalRequirement test_req2 {
    id: 1.1
    text: the second test text.
    risk: low
    verifymethod: inspection
}

performanceRequirement test_req3 {
    id: 1.2
    text: the third test text.
    risk: medium
    verifymethod: demonstration
}

interfaceRequirement test_req4 {
    id: 1.2.1
    text: the fourth test text.
    risk: medium
    verifymethod: analysis
}

physicalRequirement test_req5 {
    id: 1.2.2
    text: the fifth test text.
    risk: medium
    verifymethod: analysis
}

designConstraint test_req6 {
    id: 1.2.3
    text: the sixth test text.
    risk: medium
    verifymethod: analysis
}

element test_entity {
    type: simulation
}

element test_entity2 {
    type: word doc
    docRef: reqs/test_entity
}

element test_entity3 {
    type: "test suite"
    docRef: github.com/all_the_tests
}

test_entity - satisfies -> test_req2
test_req - traces -> test_req2
test_req - contains -> test_req3
test_req3 - contains -> test_req4
test_req4 - derives -> test_req5
test_req5 - refines -> test_req6
test_entity3 - verifies -> test_req5
test_req <- copies - test_entity2
```

### 3.4 Direction

```mermaid
requirementDiagram

direction LR

requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
}

element test_entity {
    type: simulation
}

test_entity - satisfies -> test_req
```

---

## 4. Styling

### 4.1 Direct Styling

```mermaid
requirementDiagram

requirement test_req {
    id: 1
    text: styling example
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

style test_req fill:#ffa,stroke:#000, color: green
style test_entity fill:#f9f,stroke:#333, color: blue
```

### 4.2 Class Definitions

```mermaid
requirementDiagram

requirement test_req {
    id: 1
    text: "class styling example"
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

classDef important fill:#f96,stroke:#333,stroke-width:4px
classDef test fill:#ffa,stroke:#000
```

### 4.3 Default Class

```mermaid
requirementDiagram

classDef default fill:#f9f,stroke:#333,stroke-width:4px;
```

### 4.4 Applying Classes

```mermaid
requirementDiagram

requirement test_req:::important {
    id: 1
    text: "class styling example"
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

classDef important font-weight:bold

class test_entity important
style test_entity fill:#f9f,stroke:#333
```

---

## 5. Summary

- **Nodes**: `requirement`, `element`, `relationship`
- **Relationships**: `contains`, `copies`, `derives`, `satisfies`, `verifies`, `refines`, `traces`
- **Styling**: Direct `style` or reusable `classDef` + `class`/`:::` syntax
- **Direction**: `TB`, `BT`, `LR`, `RL`

Use the examples above as templates for your own requirement diagrams. Happy diagramming!