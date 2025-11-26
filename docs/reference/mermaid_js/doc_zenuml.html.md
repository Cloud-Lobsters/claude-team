# ZenUML Sequence Diagram Documentation

> **Note** – This guide focuses on the ZenUML syntax for Mermaid sequence diagrams.  
> All examples shown below are fully functional and can be copied into a Mermaid‑enabled editor.

---

## 1. Overview

ZenUML is a Mermaid extension that renders sequence diagrams using a concise, code‑centric syntax.  
Unlike Mermaid’s native sequence diagram syntax, ZenUML uses a different, more compact language.

---

## 2. Syntax Basics

### 2.1 Participants

Participants (actors, objects, etc.) are declared implicitly by the first appearance of a name.  
If you want to control the order of appearance, declare them explicitly:

```mermaid
zenuml
    title Declare participant (optional)
    Bob
    Alice
    Alice->Bob: Hi Bob
    Bob->Alice: Hi Alice
```

### 2.2 Annotators

Use annotators to give participants a specific shape or icon:

```mermaid
zenuml
    title Annotators
    @Actor Alice
    @Database Bob
    Alice->Bob: Hi Bob
    Bob->Alice: Hi Alice
```

Available annotators include `@Actor`, `@Database`, etc. (See Mermaid docs for the full list.)

### 2.3 Aliases

Give a participant a short identifier and a descriptive label:

```mermaid
zenuml
    title Aliases
    A as Alice
    J as John
    A->J: Hello John, how are you?
    J->A: Great!
```

---

## 3. Messages

ZenUML supports several message types:

| Type | Syntax | Example |
|------|-------|--------|
| **Sync message** | `A.SyncMessage` | `A.SyncMessage` |
| **Async message** | `Alice->Bob: How are you?` | `Alice->Bob: How are you?` |
| **Creation message** | `new A1` | `new A1` |
| **Reply message** | `a = A.SyncMessage()` | `a = A.SyncMessage()` |

### 3.1 Sync Message

```mermaid
zenuml
    title Sync message
    A.SyncMessage
    A.SyncMessage(with, parameters) {
      B.nestedSyncMessage()
    }
```

### 3.2 Async Message

```mermaid
zenuml
    title Async message
    Alice->Bob: How are you?
```

### 3.3 Creation Message

```mermaid
zenuml
    new A1
    new A2(with, parameters)
```

### 3.4 Reply Message

Three ways to express a reply:

```mermaid
zenuml
    // 1. assign a variable from a sync message.
    a = A.SyncMessage()

    // 1.1. optionally give the variable a type
    SomeType a = A.SyncMessage()

    // 2. use return keyword
    A.SyncMessage() {
      return result
    }

    // 3. use @return or @reply annotator on an async message
    @return
    A->B: result
```

---

## 4. Control Flow

### 4.1 Nesting

Sync and creation messages can be nested with `{}`:

```mermaid
zenuml
    A.method() {
      B.nested_sync_method()
      B->C: nested async message
    }
```

### 4.2 Comments

Add comments with `//`. Markdown is supported:

```mermaid
zenuml
    // a comment on a participant will not be rendered
    BookService
    // a comment on a message.
    // **Markdown** is supported.
    BookService.getBook()
```

### 4.3 Loops

```mermaid
zenuml
    Alice->John: Hello John, how are you?
    while(true) {
      John->Alice: Great!
    }
```

### 4.4 Alternatives (Alt)

```mermaid
zenuml
    Alice->Bob: Hello Bob, how are you?
    if(is_sick) {
      Bob->Alice: Not so good :(
    } else {
      Bob->Alice: Feeling fresh like a daisy
    }
```

### 4.5 Optional (Opt)

```mermaid
zenuml
    Alice->Bob: Hello Bob, how are you?
    Bob->Alice: Not so good :(
    opt {
      Bob->Alice: Thanks for asking
    }
```

### 4.6 Parallel

```mermaid
zenuml
    par {
        Alice->Bob: Hello guys!
        Alice->John: Hello guys!
    }
```

### 4.7 Try/Catch/Finally (Break)

```mermaid
zenuml
    try {
      Consumer->API: Book something
      API->BookingService: Start booking process
    } catch {
      API->Consumer: show failure
    } finally {
      API->BookingService: rollback status
    }
```

---

## 5. Integration with Web Pages

ZenUML uses experimental lazy loading & async rendering.  
Add Mermaid and ZenUML to a page like this:

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  import zenuml from 'https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml@0.1.0/dist/mermaid-zenuml.esm.min.mjs';
  await mermaid.registerExternalDiagrams([zenuml]);
</script>
```

---

## 6. Summary

- **Participants**: implicit or explicit declaration.
- **Annotators**: give visual meaning.
- **Aliases**: short identifiers.
- **Messages**: sync, async, creation, reply.
- **Control Flow**: nesting, loops, alternatives, optional, parallel, try/catch/finally.
- **Comments**: Markdown‑enabled.
- **Integration**: import Mermaid and ZenUML modules.

Feel free to copy the examples above into any Mermaid‑enabled editor to see the diagrams rendered.