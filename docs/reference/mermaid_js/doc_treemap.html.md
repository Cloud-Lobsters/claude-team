# Mermaid Treemap Diagram Documentation

> **NOTE**  
> The treemap diagram is a **beta** feature in Mermaid.  
> Its syntax may change in future releases.

---

## 1. Overview

A **treemap** visualises hierarchical data as a set of nested rectangles.  
Each node’s rectangle size is proportional to its numeric value, making it easy to compare parts of a hierarchy.

Typical use‑cases:

| Use‑case | Example |
|---------|--------|
| Budget allocation | <code>Budget → Operations → Salaries: 700000</code> |
| File‑system usage | <code>Root → Folder → File: 12345</code> |
| Market share | <code>Company A: 0.35</code> |

---

## 2. Syntax

```mermaid
treemap-beta
"Section 1"
    "Leaf 1.1": 12
    "Section 1.2"
      "Leaf 1.2.1": 12
"Section 2"
    "Leaf 2.1": 20
    "Leaf 2.2": 25
```

### 2.1 Node Definition

| Node type | Syntax | Example |
|----------|-------|--------|
| **Section / Parent** | `"Section Name"` | `"Products"` |
| **Leaf** | `"Leaf Name": value` | `"Phones": 50` |
| **Indentation** | Spaces or tabs | 4 spaces per level |
| **Styling** | `:::className` | `"Section 1.2":::class1` |

---

## 3. Examples

### 3.1 Basic Treemap

```mermaid
treemap-beta
"Category A"
    "Item A1": 10
    "Item A2": 20
"Category B"
    "Item B1": 15
    "Item B2": 25
```

### 3.2 Hierarchical Treemap

```mermaid
treemap-beta
"Products"
    "Electronics"
        "Phones": 50
        "Computers": 30
        "Accessories": 20
    "Clothing"
        "Men's": 40
        "Women's": 40
```

### 3.3 Treemap with Styling

```mermaid
treemap-beta
"Section 1"
    "Leaf 1.1": 12
    "Section 1.2":::class1
      "Leaf 1.2.1": 12
"Section 2"
    "Leaf 2.1": 20:::class1
    "Leaf 2.2": 25
    "Leaf 2.3": 12

classDef class1 fill:red,color:blue,stroke:#FFD600;
```

---

## 4. Styling & Configuration

### 4.1 `classDef` for Styling

```mermaid
treemap-beta
"Main"
    "A": 20
    "B":::important
        "B1": 10
        "B2": 15
    "C": 5

classDef important fill:#f96,stroke:#333,stroke-width:2px;
```

### 4.2 Theme Configuration

```mermaid
---
config:
    theme: 'forest'
---
treemap-beta
"Category A"
    "Item A1": 10
    "Item A2": 20
"Category B"
    "Item B1": 15
    "Item B2": 25
```

### 4.3 Diagram Padding

```mermaid
---
config:
  treemap:
    diagramPadding: 200
---
treemap-beta
"Category A"
    "Item A1": 10
    "Item A2": 20
"Category B"
    "Item B1": 15
    "Item B2": 25
```

---

## 5. Configuration Options

| Option | Description | Default |
|-------|------------|--------|
| `useMaxWidth` | Set diagram width to 100% | `true` |
| `padding` | Internal padding between nodes | `10` |
| `diagramPadding` | Padding around the entire diagram | `8` |
| `showValues` | Show numeric values | `true` |
| `nodeWidth` | Width of nodes | `100` |
| `nodeHeight` | Height of nodes | `40` |
| `borderWidth` | Border width | `1` |
| `valueFontSize` | Font size for values | `12` |
| `labelFontSize` | Font size for labels | `14` |
| `valueFormat` | Format for values | `','` |

---

## 6. Advanced Features

### 6.1 Value Formatting

`valueFormat` uses D3 format specifiers. Common patterns:

| Pattern | Meaning |
|--------|--------|
| `,` | Thousands separator (default) |
| `$` | Dollar sign |
| `.1f` | One decimal place |
| `.1%` | Percentage with one decimal |
| `$0,0` | Dollar sign + thousands separator |
| `$.2f` | Dollar sign + 2 decimals |
| `$,.2f` | Dollar sign + thousands separator + 2 decimals |

#### Example – Currency Formatting

```mermaid
---
config:
  treemap:
    valueFormat: '$0,0'
---
treemap-beta
"Budget"
    "Operations"
        "Salaries": 700000
        "Equipment": 200000
        "Supplies": 100000
    "Marketing"
        "Advertising": 400000
        "Events": 100000
```

#### Example – Percentage Formatting

```mermaid
---
config:
  treemap:
    valueFormat: '$.1%'
---
treemap-beta
"Market Share"
    "Company A": 0.35
    "Company B": 0.25
    "Company C": 0.15
    "Others": 0.25
```

---

## 7. Common Use Cases

| Domain | Example |
|-------|--------|
| **Finance** | Budget allocations, portfolio composition |
| **File Systems** | Disk space usage |
| **Demographics** | Population distribution |
| **Products** | Sales volumes by category |
| **Org Structure** | Departments & team sizes |

---

## 8. Limitations

- Best suited for data with a natural hierarchy.  
- Very small values may be hard to see or label.  
- Deep hierarchies can become cluttered.  
- Negative values are not supported.

---

## 9. Alternatives

| Diagram | When to Use |
|--------|------------|
| **Pie Chart** | Simple proportions, no hierarchy |
| **Sunburst** | Radial hierarchical view (future release) |
| **Sankey** | Flow‑based hierarchical data |

---

## 10. Feedback & Contributions

This treemap implementation is still evolving.  
Feel free to open issues or pull requests on the [Mermaid GitHub repository](https://github.com/mermaid-js/mermaid).

---