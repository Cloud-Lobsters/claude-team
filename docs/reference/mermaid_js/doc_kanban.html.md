# Mermaid Kanban Diagram – Code Documentation

> This document explains how to create and customize a **Kanban** diagram in Mermaid.  
> All examples from the original guide are preserved.

---

## 1. Overview

A Mermaid Kanban diagram visualises tasks moving through stages of a workflow.  
The diagram starts with the keyword `kanban` followed by column definitions and tasks.

```mermaid
kanban
  column1[Column Title]
    task1[Task Description]
```

---

## 2. Syntax

| Element | Syntax | Description |
|--------|-------|------------|
| **Column** | `columnId[Column Title]` | `columnId` – unique identifier; `Column Title` – header text |
| **Task** | `taskId[Task Description]` | `taskId` – unique identifier; `Task Description` – task text |
| **Metadata** | `@{ key: value, ... }` | Optional key‑value pairs attached to a task |

> **Indentation** is critical: tasks must be indented under their parent column.

---

## 3. Defining Columns

Columns represent workflow stages (e.g., *Todo*, *In Progress*, *Done*).

```mermaid
kanban
  todo[Todo]
  inProgress[In Progress]
  done[Done]
```

---

## 4. Adding Tasks to Columns

Tasks are listed under their respective columns with indentation.

```mermaid
kanban
  todo[Todo]
    docs[Create Documentation]
    blog[Create Blog about the new diagram]
  inProgress[In Progress]
    renderer[Create renderer so that it works in all cases]
```

---

## 5. Adding Metadata to Tasks

Metadata is added after the task definition using `@{ ... }`.

| Supported Key | Description |
|--------------|------------|
| `assigned` | Person responsible |
| `ticket` | Ticket or issue number |
| `priority` | `'Very High'`, `'High'`, `'Low'`, `'Very Low'` |

```mermaid
kanban
  todo[Todo]
    updateDB[Update Database Function]@{ ticket: MC-2037, assigned: 'knsv', priority: 'High' }
```

---

## 6. Configuration Options

A configuration block can be placed at the top of the Markdown file to set global options.  
Currently, only `ticketBaseUrl` is supported for Kanban diagrams.

```yaml
---
config:
  kanban:
    ticketBaseUrl: 'https://yourproject.atlassian.net/browse/#TICKET#'
---
```

When a task contains a `ticket` metadata key, the ticket number is linked to the external system using the `ticketBaseUrl`. The placeholder `#TICKET#` is replaced by the ticket value.

---

## 7. Full Example

```mermaid
---
config:
  kanban:
    ticketBaseUrl: 'https://mermaidchart.atlassian.net/browse/#TICKET#'
---
kanban
  Todo
    [Create Documentation]
    docs[Create Blog about the new diagram]
  [In progress]
    id6[Create renderer so that it works in all cases. We also add some extra text here for testing purposes. And some more just for the extra flare.]
  id9[Ready for deploy]
    id8[Design grammar]@{ assigned: 'knsv' }
  id10[Ready for test]
    id4[Create parsing tests]@{ ticket: MC-2038, assigned: 'K.Sveidqvist', priority: 'High' }
    id66[last item]@{ priority: 'Very Low', assigned: 'knsv' }
  id11[Done]
    id5[define getData]
    id2[Title of diagram is more than 100 chars when user duplicates diagram with 100 char]@{ ticket: MC-2036, priority: 'Very High'}
    id3[Update DB function]@{ ticket: MC-2037, assigned: knsv, priority: 'High' }
  id12[Can't reproduce]
    id3[Weird flickering in Firefox]
```

---

## 8. Summary

1. **Start** with `kanban`.  
2. **Define** columns (`columnId[Title]`).  
3. **Indent** tasks under columns (`taskId[Description]`).  
4. **Add** optional metadata (`@{ key: value }`).  
5. **Configure** global options with a YAML block if needed.

Follow these guidelines to create a clear, customizable Kanban board in Mermaid.