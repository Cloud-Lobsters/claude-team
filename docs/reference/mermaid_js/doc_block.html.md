# Mermaid Block Diagrams – Documentation

> **Note**  
> All examples shown below are valid Mermaid code.  
> Copy the code blocks into a Mermaid‑enabled editor (e.g. the Mermaid Live Editor) to see the rendered diagram.

---

## 1. Introduction

Block diagrams are a concise way to represent systems, processes, or architectures.  
They consist of **blocks** (the components) and **connectors** (the relationships).  
Mermaid’s `block-beta` syntax gives you full control over layout, sizing, and styling.

---

## 2. Basic Syntax

```mermaid
block-beta
  a b c
```

Produces a horizontal row of three blocks.

### 2.1 Columns

```mermaid
block-beta
  columns 3
  a b c d
```

Arranges the blocks in three columns, wrapping to the next row when needed.

---

## 3. Advanced Block Configuration

### 3.1 Block Width

```mermaid
block-beta
  columns 3
  a["A label"] b:2 c:2 d
```

* `b:2` and `c:2` span two columns each.

### 3.2 Composite (Nested) Blocks

```mermaid
block-beta
  block
    D
  end
  A["A: I am a wide one"]
```

`D` is nested inside a larger block.

### 3.3 Dynamic Column Widths

```mermaid
block-beta
  columns 3
  a:3
  block:group1:2
    columns 2
    h i j k
  end
  g
  block:group2:3
    l m n o p q r
  end
```

Mermaid automatically adjusts column widths to fit the widest block.

---

## 4. Block Shapes

| Shape | Syntax | Example |
|------|-------|--------|
| Round‑Edged | `id1("text")` | `id1("Round")` |
| Stadium | `id1(["text"])` | `id1(["Stadium"])` |
| Subroutine | `id1[["text"]]` | `id1[["Subroutine"]]` |
| Cylindrical | `id1[("Database")]` | `id1[("Database")]` |
| Circle | `id1(("text"))` | `id1(("Circle"))` |
| Asymmetric | `id1>"text"` | `id1>"Asym"` |
| Rhombus | `id1{"text"}` | `id1{"Decision"}` |
| Hexagon | `id1{{"text"}}` | `id1{{"Hex"}}` |
| Parallelogram | `id1[/"text"/]` | `id1[/"Input"/]` |
| Trapezoid | `id1[\"text\"]` | `id1[\"Output\"]` |
| Double Circle | `id1((("text")))` | `id1((("Double"))` |

---

## 5. Block Arrows & Space Blocks

```mermaid
block-beta
  blockArrowId<["Label"]>(right)
  blockArrowId2<["Label"]>(left)
  blockArrowId3<["Label"]>(up)
  blockArrowId4<["Label"]>(down)
```

Space blocks:

```mermaid
block-beta
  columns 3
  a space b
  c   d   e
```

or

```mermaid
block-beta
  ida space:3 idb idc
```

---

## 6. Connecting Blocks

### 6.1 Basic Links

```mermaid
block-beta
  A space B
  A-->B
```

### 6.2 Text on Links

```mermaid
block-beta
  A space:2 B
  A-- "X" -->B
```

---

## 7. Styling & Classes

### 7.1 Individual Block Styling

```mermaid
block-beta
  id1 space id2
  id1("Start")-->id2("Stop")
  style id1 fill:#636,stroke:#333,stroke-width:4px
  style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
```

### 7.2 Class Styling

```mermaid
block-beta
  A space B
  A-->B
  classDef blue fill:#6e6ce6,stroke:#333,stroke-width:4px;
  class A blue
  style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
```

---

## 8. Practical Examples

### 8.1 System Architecture

```mermaid
block-beta
  columns 3
  Frontend blockArrowId6<[" "]>(right) Backend
  space:2 down<[" "]>(down)
  Disk left<[" "]>(left) Database[("Database")]

  classDef front fill:#696,stroke:#333;
  classDef back fill:#969,stroke:#333;
  class Frontend front
  class Backend,Database back
```

### 8.2 Business Process Flow

```mermaid
block-beta
  columns 3
  Start(("Start")) space:2
  down<[" "]>(down) space:2
  Decision{{"Make Decision"}} right<["Yes"]>(right) Process1["Process A"]
  downAgain<["No"]>(down) space r3<["Done"]>(down)
  Process2["Process B"] r2<["Done"]>(right) End(("End"))

  style Start fill:#969;
  style End fill:#696;
```

---

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| **Incorrect Linking** | Use `-->` or `---` instead of `-` |
| **Misplaced Styling** | Separate CSS properties with commas and use `:` after the property name |

Example of a correct link:

```mermaid
block-beta
  A space B
  A --> B
```

Example of correct styling:

```mermaid
block-beta
  A
  style A fill:#969,stroke:#333;
```

---

## 10. Tips for Complex Diagrams

1. **Modular Design** – Break large diagrams into smaller sub‑diagrams.  
2. **Consistent Styling** – Use classes for shared styles.  
3. **Documentation** – Add comments with `%%` to explain sections.

---

### End of Documentation

Feel free to copy, modify, and extend these examples to suit your own diagrams. Happy diagramming!