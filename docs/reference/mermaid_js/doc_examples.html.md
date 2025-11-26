# Mermaid – A Quick‑Start Documentation

> **Mermaid** is a JavaScript‑based diagramming and charting tool that renders Markdown‑style text into SVG diagrams.  
> This guide gives you a concise reference to the most common diagram types, together with the exact source code you can copy‑paste into any Mermaid‑enabled editor (e.g. VS Code, GitHub, Notion, etc.).

---

## 1. Basic Pie Chart

```mermaid
pie title NETFLIX
    "Time spent looking for movie" : 90
    "Time spent watching it" : 10
```

```mermaid
pie title What Voldemort doesn't have?
    "FRIENDS" : 2
    "FAMILY" : 3
    "NOSE" : 45
```

---

## 2. Basic Sequence Diagram

```mermaid
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```

---

## 3. Basic Flowchart

```mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

---

## 4. Larger Flowchart with Styling

```mermaid
graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stroke-width:4px;
     class sq,e green
     class di orange
```

---

## 5. Sequence Diagram – Loops, `alt` and `opt`

```mermaid
sequenceDiagram
    loop Daily query
        Alice->>Bob: Hello Bob, how are you?
        alt is sick
            Bob->>Alice: Not so good :(
        else is well
            Bob->>Alice: Feeling fresh like a daisy
        end

        opt Extra response
            Bob->>Alice: Thanks for asking
        end
    end
```

---

## 6. Sequence Diagram – Message to Self in Loop

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts<br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

---

## 7. Sequence Diagram – Blogging App Service Communication

```mermaid
sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in‑site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end
```

---

## 8. Commit Flow Diagram (GitGraph)

```mermaid
gitGraph:
    commit "Ashish"
    branch newbranch
    checkout newbranch
    commit id:"1111"
    commit tag:"test"
    checkout main
    commit type: HIGHLIGHT
    commit
    merge newbranch
    commit
    branch b2
    commit
```

---

### How to Use

1. **Copy** any of the code blocks above.
2. **Paste** it into a Mermaid‑enabled editor (e.g. VS Code with the Mermaid Preview extension, GitHub Markdown, Notion, etc.).
3. **Render** the diagram – you’ll see the SVG output instantly.

---

### Quick Reference

| Diagram Type | Syntax Keyword | Example |
|-------------|---------------|--------|
| Pie Chart | `pie` | `pie title ...` |
| Sequence Diagram | `sequenceDiagram` | `sequenceDiagram ...` |
| Flowchart | `graph LR` / `graph TB` | `graph LR ...` |
| Git Graph | `gitGraph:` | `gitGraph: ...` |
| Class Diagram | `classDiagram` | `classDiagram ...` |
| ... | | |

Feel free to extend these examples or mix diagram types in a single Markdown file. Happy diagramming!