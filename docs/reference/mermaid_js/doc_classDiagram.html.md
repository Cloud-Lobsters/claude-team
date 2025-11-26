# Mermaid Class Diagram Documentation

Mermaid is a lightweight diagramming tool that can render UML class diagrams.  
Below is a cleaned‑up reference that covers the syntax, examples, and styling options.  
All examples from the original source are preserved.

---

## 1. Overview

A **class diagram** shows:

* **Classes** (nodes)
* **Attributes** (middle compartment)
* **Operations** (bottom compartment)
* **Relationships** (edges)

Mermaid follows UML conventions but uses a simple textual syntax.

---

## 2. Basic Syntax

```mermaid
classDiagram
    class ClassName
```

### 2.1 Defining a Class

```mermaid
classDiagram
    class Animal
```

### 2.2 Adding Members

| Syntax | Description |
|-------|------------|
| `ClassName : +member` | Adds a single member (attribute or method). |
| `ClassName{ ... }` | Adds multiple members inside `{}`. |

**Examples**

```mermaid
classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +BigDecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdrawal(amount)
```

```mermaid
classDiagram
    class BankAccount{
        +String owner
        +BigDecimal balance
        +deposit(amount)
        +withdrawal(amount)
    }
```

---

## 3. Member Types

* **Attributes** – no parentheses.
* **Methods** – parentheses present.

Return types can be appended after a space:

```mermaid
classDiagram
    class BankAccount{
        +deposit(amount) bool
        +withdrawal(amount) int
    }
```

---

## 4. Visibility & Classifiers

| Symbol | Meaning |
|-------|--------|
| `+` | Public |
| `-` | Private |
| `#` | Protected |
| `~` | Package / Internal |

Additional classifiers can be appended after the method/attribute:

```mermaid
classDiagram
    class Example{
        +abstractMethod()*
        +staticMethod()$
    }
```

---

## 5. Generics

Use `~` to denote generic types:

```mermaid
classDiagram
    class Square~Shape~{
        int id
        List~int~ position
        setPoints(List~int~ points)
        getPoints() List~int~
    }
```

---

## 6. Relationships

| Arrow | UML Relation |
|------|-------------|
| `<|--` | Inheritance |
| `*--` | Composition |
| `o--` | Aggregation |
| `-->` | Association |
| `--` | Link (solid) |
| `..>` | Dependency |
| `..|>` | Realization |
| `..` | Link (dashed) |

**Example**

```mermaid
classDiagram
    classA <|-- classB
    classC *-- classD
    classE o-- classF
    classG <-- classH
    classI -- classJ
    classK <.. classL
    classM <|.. classN
    classO .. classP
```

---

## 7. Labels on Relations

```mermaid
classDiagram
    classA --|> classB : Inheritance
    classC --* classD : Composition
    classE --o classF : Aggregation
    classG --> classH : Association
    classI -- classJ : Link(Solid)
    classK ..> classL : Dependency
    classM ..|> classN : Realization
    classO .. classP : Link(Dashed)
```

---

## 8. Cardinality / Multiplicity

Place quoted text near the arrow:

```mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..*" Course
    Galaxy --> "many" Star : Contains
```

---

## 9. Annotations

Use `<<annotation>>`:

```mermaid
classDiagram
    class Shape <<interface>>
    class Color{
        <<enumeration>>
        RED
        BLUE
        GREEN
    }
```

---

## 10. Notes

```mermaid
classDiagram
    note "This is a general note"
    note for MyClass "This is a note for a class"
    class MyClass{}
```

---

## 11. Namespaces

```mermaid
classDiagram
namespace BaseShapes {
    class Triangle
    class Rectangle{
        double width
        double height
    }
}
```

---

## 12. Direction

```mermaid
classDiagram
  direction RL
  class Student{
    -idCard : IdCard
  }
  class IdCard{
    -id : int
    -name : string
  }
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides
```

---

## 13. Interaction (Links & Callbacks)

```mermaid
classDiagram
    class Shape
    link Shape "https://github.com" "Tooltip for link"
    class Shape2
    click Shape2 href "https://github.com" "Tooltip for click"
```

**Callback Example**

```html
<script>
  const callbackFunction = function () {
    alert('A callback was triggered');
  };
</script>
```

```mermaid
classDiagram
    class Class01
    callback Class01 "callbackFunction" "Callback tooltip"
```

---

## 14. Styling

### 14.1 Individual Node

```mermaid
classDiagram
  class Animal
  style Animal fill:#f9f,stroke:#333,stroke-width:4px
```

### 14.2 Class Definitions

```mermaid
classDiagram
  class Animal:::someclass
  classDef someclass fill:#f96
```

### 14.3 Default Styling

```mermaid
classDef default fill:#f9f,stroke:#333,stroke-width:4px;
```

---

## 15. Configuration

Hide empty member boxes:

```mermaid
---
  config:
    class:
      hideEmptyMembersBox: true
---
classDiagram
  class Duck
```

---

## 16. Full Example

```mermaid
classDiagram
    title Animal example
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
```

---

### End of Documentation

All examples from the original Mermaid documentation are included above.  
Feel free to copy the snippets into your Mermaid-enabled environment.