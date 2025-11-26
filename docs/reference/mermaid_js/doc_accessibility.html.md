# Mermaid Accessibility Documentation

Mermaid now supports **Accessible Rich Internet Applications (ARIA)** features so that diagrams can be consumed by assistive technologies and search engines.  
The following sections describe the available options, how to use them, and the resulting HTML.

---

## 1.  Overview

| Feature | What it does | Where it appears |
|--------|-------------|-----------------|
| `aria-roledescription` | Automatically added to the `<svg>` element. | `<svg aria-roledescription="flowchart-v2">` |
| Accessible **Title** | Adds a `<title>` element and `aria-labelledby`. | `<svg aria-labelledby="chart-title-…">` |
| Accessible **Description** | Adds a `<desc>` element and `aria-describedby`. | `<svg aria-describedby="chart-desc-…">` |

---

## 2.  Syntax

### 2.1 Accessible Title

```mermaid
accTitle: <single‑line title>
```

* Must be on its own line.  
* Ends at the end of the line.  
* Example: `accTitle: Big Decisions`

### 2.2 Accessible Description

| Single‑line | Multi‑line |
|------------|-----------|
| `accDescr: <single‑line description>` | `accDescr {`<br>`<multi‑line description>`<br>`}` |

* **Single‑line**: same syntax as title.  
* **Multi‑line**: no colon, wrapped in `{}`.

---

## 3.  Example Diagrams

Below are the same diagrams that were originally in the Mermaid docs, rewritten for clarity.  
All examples are runnable in the Mermaid Live Editor.

### 3.1 Flowchart

```mermaid
graph LR
    accTitle: Big Decisions
    accDescr: Bob's Burgers process for making big decisions
    A[Identify Big Decision] --> B{Make Big Decision}
    B --> D[Be done]
```

**Generated HTML**

```html
<svg
  aria-labelledby="chart-title-mermaid_382ee221"
  aria-describedby="chart-desc-mermaid_382ee221"
  aria-roledescription="flowchart-v2"
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  id="mermaid_382ee221">
  <title id="chart-title-mermaid_382ee221">Big decisions</title>
  <desc id="chart-desc-mermaid_382ee221">Bob's Burgers process for making big decisions</desc>
</svg>
```

---

### 3.2 Flowchart (Multi‑line Description)

```mermaid
graph LR
    accTitle: Bob's Burger's Making Big Decisions
    accDescr {
        The official Bob's Burgers corporate processes that are used
        for making very, very big decisions.
        This is actually a very simple flow: identify the big decision and then make the big decision.
    }
    A[Identify Big Decision] --> B{Make Big Decision}
    B --> D[Be done]
```

---

### 3.3 Class Diagram

```mermaid
classDiagram
    accTitle: My Class Diagram
    accDescr: My Class Diagram Description

    Vehicle <|-- Car
```

---

### 3.4 Entity Relationship Diagram

```mermaid
erDiagram
    accTitle: My Entity Relationship Diagram
    accDescr: My Entity Relationship Diagram Description

    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

---

### 3.5 Gantt Chart

```mermaid
gantt
    accTitle: My Gantt Chart Accessibility Title
    accDescr: My Gantt Chart Accessibility Description

    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
```

---

### 3.6 GitGraph

```mermaid
gitGraph
    accTitle: My GitGraph Accessibility Title
    accDescr: My GitGraph Accessibility Description

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

---

### 3.7 Pie Chart

```mermaid
pie
    accTitle: My Pie Chart Accessibility Title
    accDescr: My Pie Chart Accessibility Description

    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
```

---

### 3.8 Requirement Diagram

```mermaid
requirementDiagram
    accTitle: My Requirement Diagram
    accDescr: My Requirement Diagram Description

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

### 3.9 Sequence Diagram

```mermaid
sequenceDiagram
    accTitle: My Sequence Diagram
    accDescr: My Sequence Diagram Description

    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
```

---

### 3.10 State Diagram

```mermaid
stateDiagram
    accTitle: My State Diagram
    accDescr: My State Diagram Description

    s1 --> s2
```

---

### 3.11 User Journey Diagram

```mermaid
journey
    accTitle: My User Journey Diagram
    accDescr: My User Journey Diagram Description

    title My working day
    section Go to work
        Make tea: 5: Me
        Go upstairs: 3: Me
        Do work: 1: Me, Cat
    section Go home
        Go downstairs: 5: Me
        Sit down: 5: Me
```

---

## 4.  Resulting SVG Structure

All diagrams will contain the following attributes and elements:

```html
<svg
  aria-roledescription="diagram-type"
  aria-labelledby="chart-title-<id>"
  aria-describedby="chart-desc-<id>"
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  id="mermaid_<id>">
  <title id="chart-title-<id>">Accessible Title</title>
  <desc id="chart-desc-<id>">Accessible Description</desc>
  <!-- diagram content -->
</svg>
```

---

## 5.  Tips & Gotchas

| Issue | Fix |
|-------|-----|
| **Title/Description not showing** | Ensure `accTitle`/`accDescr` are on their own lines and not indented with spaces that break the parser. |
| **Multi‑line description** | Do **not** put a colon after `accDescr`. Wrap the text in `{}`. |
| **Special characters** | Escape single quotes in titles/descriptions if needed. |

---

## 6.  Summary

- Use `accTitle` and `accDescr` to add accessible titles and descriptions.  
- The generated SVG will automatically include ARIA attributes and `<title>`/`<desc>` elements.  
- All diagram types support these options.  

Happy diagramming!