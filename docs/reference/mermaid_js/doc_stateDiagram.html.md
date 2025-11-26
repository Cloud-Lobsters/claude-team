# Mermaid State Diagram Documentation

> This document describes how to create and style state diagrams with Mermaid.  
> All examples from the official Mermaid documentation are preserved.

---

## 1. Introduction

A **state diagram** describes the behavior of a system in terms of a finite set of states and the transitions between them.  
Mermaid’s syntax is largely compatible with PlantUML, making it easy to share diagrams between the two tools.

---

## 2. Basic Syntax

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

* `[*]` denotes the start or end state.  
* `-->` defines a transition.  
* `stateDiagram-v2` is the newer renderer; `stateDiagram` is the older one.

---

## 3. States

### 3.1 Simple State

```mermaid
stateDiagram-v2
    stateId
```

### 3.2 State with Description

```mermaid
stateDiagram-v2
    state "This is a state description" as s2
```

or

```mermaid
stateDiagram-v2
    s2 : This is a state description
```

---

## 4. Transitions

```mermaid
stateDiagram-v2
    s1 --> s2
```

Add a label to a transition:

```mermaid
stateDiagram-v2
    s1 --> s2: A transition
```

---

## 5. Start and End States

```mermaid
stateDiagram-v2
    [*] --> s1
    s1 --> [*]
```

---

## 6. Composite States

Composite (nested) states are defined with the `state` keyword and a block `{}`.

```mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> second
        second --> [*]
    }

    [*] --> NamedComposite
    NamedComposite: Another Composite
    state NamedComposite {
        [*] --> namedSimple
        namedSimple --> [*]
        namedSimple: Another simple
    }
```

Nested composites:

```mermaid
stateDiagram-v2
    [*] --> First

    state First {
        [*] --> Second

        state Second {
            [*] --> second
            second --> Third

            state Third {
                [*] --> third
                third --> [*]
            }
        }
    }
```

Transitions between composite states:

```mermaid
stateDiagram-v2
    [*] --> First
    First --> Second
    First --> Third

    state First {
        [*] --> fir
        fir --> [*]
    }
    state Second {
        [*] --> sec
        sec --> [*]
    }
    state Third {
        [*] --> thi
        thi --> [*]
    }
```

*Transitions between internal states of different composites are not allowed.*

---

## 7. Choice

```mermaid
stateDiagram-v2
    state if_state <<choice>>
    [*] --> IsPositive
    IsPositive --> if_state
    if_state --> False: if n < 0
    if_state --> True : if n >= 0
```

---

## 8. Forks

```mermaid
stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]
```

---

## 9. Notes

```mermaid
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
```

---

## 10. Concurrency

```mermaid
stateDiagram-v2
    [*] --> Active

    state Active {
        [*] --> NumLockOff
        NumLockOff --> NumLockOn : EvNumLockPressed
        NumLockOn --> NumLockOff : EvNumLockPressed
        --
        [*] --> CapsLockOff
        CapsLockOff --> CapsLockOn : EvCapsLockPressed
        CapsLockOn --> CapsLockOff : EvCapsLockPressed
        --
        [*] --> ScrollLockOff
        ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
        ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
    }
```

---

## 11. Direction

```mermaid
stateDiagram
    direction LR
    [*] --> A
    A --> B
    B --> C
    state B {
      direction LR
      a --> b
    }
    B --> D
```

---

## 12. Comments

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]
%% this is a comment
    Still --> Moving
    Moving --> Still %% another comment
    Moving --> Crash
    Crash --> [*]
```

Comments start with `%%` and occupy the entire line.

---

## 13. Styling with `classDef`

### 13.1 Define a Style

```mermaid
classDef movement font-style:italic;
classDef badBadEvent fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow;
```

### 13.2 Apply a Style

#### 13.2.1 `class` Statement

```mermaid
stateDiagram
   direction TB

   classDef notMoving fill:white
   classDef movement font-style:italic
   classDef badBadEvent fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow

   [*]--> Still
   Still --> [*]
   Still --> Moving
   Moving --> Still
   Moving --> Crash
   Crash --> [*]

   class Still notMoving
   class Moving, Crash movement
   class Crash badBadEvent
   class end badBadEvent
```

#### 13.2.2 `:::` Operator

```mermaid
stateDiagram
   direction TB

   classDef notMoving fill:white
   classDef movement font-style:italic;
   classDef badBadEvent fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow

   [*] --> Still:::notMoving
   Still --> [*]
   Still --> Moving:::movement
   Moving --> Still
   Moving --> Crash:::movement
   Crash:::badBadEvent --> [*]
```

> **Limitations**  
> * Cannot be applied to start or end states.  
> * Cannot be applied to or within composite states.  
> These restrictions are slated for removal in future releases.

---

## 14. Spaces in State Names

```mermaid
stateDiagram
    classDef yourState font-style:italic,font-weight:bold,fill:white

    yswsii: Your state with spaces in it
    [*] --> yswsii:::yourState
    [*] --> SomeOtherState
    SomeOtherState --> YetAnotherState
    yswsii --> YetAnotherState
    YetAnotherState --> [*]
```

---

## 15. Summary

- **States** can be simple or composite.  
- **Transitions** are arrows (`-->`) optionally labeled.  
- **Special states**: `[*]` for start/end.  
- **Choice**, **fork**, **join**, **notes**, and **concurrency** are supported.  
- **Styling** via `classDef` and `class` or `:::`.  
- **Direction** and **comments** are available.  

Use the examples above as templates for your own Mermaid state diagrams.