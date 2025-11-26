# Mermaid – Release Notes (Public Documentation)

This document summarizes the public releases of the **mermaid** library.  
It is intended for developers who want to understand what has changed in each
major/minor release, and to provide a clean, searchable changelog.

> **Note** – All commit hashes and contributor names have been retained for
> reference, but personal identifiers have been omitted.

---

## Table of Contents

1. [Version 11.9.0 – 2025‑07‑16](#1190)
2. [Version 11.8.1 – 2025‑07‑07](#1181)
3. [Version 11.8.0 – 2025‑07‑03](#1180)
4. [Version 11.7.0 – 2025‑06‑20](#1170)
5. [Version 11.6.x – 2025‑06‑20](#1160)
6. [Version 11.5.x – 2025‑06‑20](#1150)
7. [Version 11.4.x – 2025‑06‑20](#1140)
8. [Version 11.3.x – 2025‑06‑20](#1130)
9. [Version 11.2.x – 2025‑06‑20](#1120)
10. [Version 11.1.x – 2025‑06‑20](#1110)
11. [Version 11.0.x – 2025‑06‑20](#1100)

*(Only the releases that contain public changes are listed.  
Older releases are omitted for brevity.)*

---

## <a name="1190"></a>Version 11.9.0 – 2025‑07‑16

| Feature / Fix | Description |
|--------------|------------|
| **`getRegisteredDiagramsMetadata`** | Added a new API that returns all registered diagram IDs. |
| **TreeMapDB** | Updated to a class‑based approach. |
| **Packet Diagram** | Moved out of beta. |
| **Sequence Diagram** | Adjusted title positioning to avoid overlap in Safari. |
| **MindmapDB** | Updated to a class‑based approach. |
| **Timeline** | Fixed `timeline.leftMargin` config to correctly control margin size. |
| **Dependencies** | Updated `@mermaid-js/parser` to `0.6.2`. |

---

## <a name="1181"></a>Version 11.8.1 – 2025‑07‑07

| Feature / Fix | Description |
|--------------|------------|
| **Parser** | Updated to `@mermaid-js/parser@0.6.1`. |
| **TreeMap** | Switched to Treemap instead of TreemapDoc. |
| **Miscellaneous** | Minor bug fixes and dependency updates. |

---

## <a name="1180"></a>Version 11.8.0 – 2025‑07‑03

| Feature / Fix | Description |
|--------------|------------|
| **Nested Treemap** | Added support for the new diagram type. |
| **GitGraph** | Logged a warning when duplicate commit IDs are encountered. |
| **Parser** | Updated to `@mermaid-js/parser@0.6.0`. |

---

## <a name="1170"></a>Version 11.7.0 – 2025‑06‑20

| Feature / Fix | Description |
|--------------|------------|
| **Gantt Plot** | Added vertical line at a specified time. |
| **Journey Diagram** | Added styling options for title (color, font‑family, font‑size). |
| **StateDiagram** | Added click directive support. |
| **Packet Diagram** | Added shorter `+<count>` label syntax. |
| **Sequence Diagram** | Allowed arrows with trailing colon but no message. |
| **Bar Charts** | Dynamically render data labels. |
| **Timeline** | Ensured consistent vertical line lengths with visible arrowheads. |
| **URL Escaping** | Fixed incomplete string escaping when `arrowMarkerAbsolute: true`. |
| **Parser** | Updated to `@mermaid-js/parser@0.5.0`. |

---

## <a name="1160"></a>Version 11.6.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1150"></a>Version 11.5.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1140"></a>Version 11.4.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1130"></a>Version 11.3.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1120"></a>Version 11.2.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1110"></a>Version 11.1.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

## <a name="1100"></a>Version 11.0.x – 2025‑06‑20

*(No public changes; internal maintenance.)*

---

### How to Use the New API

```js
// Retrieve all registered diagram IDs
const diagramIds = mermaid.getRegisteredDiagramsMetadata();
console.log(diagramIds); // e.g., ['flowchart', 'sequenceDiagram', ...]
```

### Migrating to the New Parser

If you are upgrading from a pre‑11.8.0 version, replace any direct imports of
`@mermaid-js/parser` with the new version:

```bash
npm install @mermaid-js/parser@0.6.2
```

---

**End of Documentation**