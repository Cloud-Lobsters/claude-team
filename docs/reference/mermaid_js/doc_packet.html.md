# Packet Diagram – Mermaid Documentation

> **Note**  
> This page contains the official Mermaid syntax for creating *Packet Diagrams* (available from Mermaid v11.0.0+).  
> All examples shown below are fully functional and can be copied directly into a Mermaid editor.

---

## 1. Overview

A **Packet Diagram** is a visual representation of the structure and contents of a network packet.  
It is especially useful for:

- Developers
- Network engineers
- Educators
- Students

The diagram shows each field’s bit range and a short description.

---

## 2. Syntax

```mermaid
packet
title <Diagram Title>
<bit-range>: "<Field Description>"
```

### 2.1 Bit‑Range Formats

| Format | Meaning | Example |
|-------|--------|--------|
| `start-end` | Explicit start and end bits (inclusive) | `0-15: "Source Port"` |
| `+<count>` | Relative to the previous field; automatically starts after the last bit | `+8: "Checksum"` |
| `start` | Single‑bit field | `106: "URG"` |

> **Tip** – Mixing formats is allowed; the parser will resolve the bit positions automatically.

### 2.2 Bits Syntax (v11.7.0+)

When you need to specify a field size without caring about the exact start bit, use the `+<count>` syntax.  
The parser will place the field immediately after the previous one.

```mermaid
packet
+1: "Flag A"
+8: "Data"
```

---

## 3. Examples

### 3.1 TCP Packet

```mermaid
---
title: "TCP Packet"
---
packet
0-15: "Source Port"
16-31: "Destination Port"
32-63: "Sequence Number"
64-95: "Acknowledgment Number"
96-99: "Data Offset"
100-105: "Reserved"
106: "URG"
107: "ACK"
108: "PSH"
109: "RST"
110: "SYN"
111: "FIN"
112-127: "Window"
128-143: "Checksum"
144-159: "Urgent Pointer"
160-191: "(Options and Padding)"
192-255: "Data (variable length)"
```

> **Rendered Diagram**  
> (Copy the code above into a Mermaid editor to view the diagram.)

---

### 3.2 UDP Packet

```mermaid
packet
title UDP Packet
+16: "Source Port"
+16: "Destination Port"
32-47: "Length"
48-63: "Checksum"
64-95: "Data (variable length)"
```

> **Rendered Diagram**  
> (Copy the code above into a Mermaid editor to view the diagram.)

---

## 4. Configuration

Mermaid’s packet diagram can be customized via the global Mermaid configuration.  
Refer to the [Mermaid Configuration Guide](https://mermaid.js.org/config/) for details on themes, colors, and other options.

---

## 5. Further Reading

- [Mermaid Official Docs](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [Mermaid API](https://mermaid.js.org/api/)

---

*End of Packet Diagram Documentation*