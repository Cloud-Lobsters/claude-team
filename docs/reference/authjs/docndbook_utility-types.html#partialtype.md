# TypeScript Utility Types

This page documents the built‑in utility types that TypeScript provides for common type transformations.  
All examples are kept verbatim from the official documentation.

> **Note** – The content below is a cleaned‑up, code‑focused version of the original TypeScript docs.  
> UI elements such as cookie banners, navigation links, and footer text have been removed.

---

## Table of Contents

| Utility | Description |
|---------|-------------|
| [Awaited](#awaitedtype) | Recursively unwraps `Promise` types. |
| [Partial](#partialtype) | Makes all properties optional. |
| [Required](#requiredtype) | Makes all properties required. |
| [Readonly](#readonlytype) | Makes all properties read‑only. |
| [Record](#recordkeys-type) | Maps a set of keys to a value type. |
| [Pick](#picktype-keys) | Picks a subset of properties. |
| [Omit](#omittype-keys) | Removes a subset of properties. |
| [Exclude](#excludetype-uniontype-excludedmembers) | Excludes union members. |
| [Extract](#extracttype-union) | Extracts union members. |
| [NonNullable](#nonnullabletype) | Removes `null` and `undefined`. |
| [Parameters](#parameterstype) | Tuple of function parameters. |
| [ConstructorParameters](#constructorparameterstype) | Tuple of constructor parameters. |
| [ReturnType](#returntypetype) | Return type of a function. |
| [InstanceType](#instancetypetype) | Instance type of a constructor. |
| [NoInfer](#noinfertype) | Blocks inference of a type. |
| [ThisParameterType](#thisparametertypetype) | Extracts the `this` parameter type. |
| [OmitThisParameter](#omitthisparametertype) | Removes the `this` parameter. |
| [ThisType](#thistypetype) | Marker for contextual `this`. |
| [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types) | `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. |

---

## Awaited\<Type\>

Recursively unwraps `Promise` types.

```ts
type A = Awaited<Promise<string>>;          // A = string
type B = Awaited<Promise<Promise<number>>>; // B = number
type C = Awaited<boolean | Promise<number>>; // C = boolean | number
```

---

## Partial\<Type\>

Makes all properties of `Type` optional.

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

---

## Required\<Type\>

Makes all properties of `Type` required (opposite of `Partial`).

```ts
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5 }; // ❌ Property 'b' is missing
```

---

## Readonly\<Type\>

Makes all properties of `Type` read‑only.

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // ❌ Cannot assign to 'title' because it is a read-only property.
```

> Useful for representing frozen objects (`Object.freeze`).

---

## Record\<Keys, Type\>

Creates an object type whose keys are `Keys` and values are `Type`.

```ts
type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris; // { age: 5, breed: "Maine Coon" }
```

---

## Pick\<Type, Keys\>

Constructs a type by picking the set of properties `Keys` from `Type`.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo; // { title: string; completed: boolean }
```

---

## Omit\<Type, Keys\>

Constructs a type by removing the set of properties `Keys` from `Type`.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

todo; // { title: string; completed: boolean; createdAt: number }

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

todoInfo; // { title: string; description: string }
```

---

## Exclude\<UnionType, ExcludedMembers\>

Excludes from `UnionType` all members assignable to `ExcludedMembers`.

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>; // T2 = string | number

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>;
/* T3 =
   | { kind: "square"; x: number }
   | { kind: "triangle"; x: number; y: number } */
```

---

## Extract\<Type, Union\>

Extracts from `Type` all members assignable to `Union`.

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // T0 = "a"
type T1 = Extract<string | number | (() => void), Function>; // T1 = () => void

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T2 = Extract<Shape, { kind: "circle" }>;
/* T2 = { kind: "circle"; radius: number } */
```

---

## NonNullable\<Type\>

Excludes `null` and `undefined` from `Type`.

```ts
type T0 = NonNullable<string | number | undefined>; // T0 = string | number
type T1 = NonNullable<string[] | null | undefined>; // T1 = string[]
```

---

## Parameters\<Type\>

Constructs a tuple type from the parameters of a function type `Type`.

```ts
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>; // T0 = []
type T1 = Parameters<(s: string) => void>; // T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>; // T2 = [arg: unknown]
type T3 = Parameters<typeof f1>; // T3 = [arg: { a: number; b: string }]
type T4 = Parameters<any>; // T4 = unknown[]
type T5 = Parameters<never>; // T5 = never
```

---

## ConstructorParameters\<Type\>

Constructs a tuple type from the parameters of a constructor function type `Type`.

```ts
type T0 = ConstructorParameters<ErrorConstructor>; // T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>; // T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>; // T2 = [pattern: string | RegExp, flags?: string]

class C {
  constructor(a: number, b: string) {}
}
type T3 = ConstructorParameters<typeof C>; // T3 = [a: number, b: string]
type T4 = ConstructorParameters<any>; // T4 = unknown[]
```

---

## ReturnType\<Type\>

Constructs a type consisting of the return type of function `Type`.

```ts
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>; // T0 = string
type T1 = ReturnType<(s: string) => void>; // T1 = void
type T2 = ReturnType<<T>() => T>; // T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // T3 = number[]
type T4 = ReturnType<typeof f1>; // T4 = { a: number; b: string }
type T5 = ReturnType<any>; // T5 = any
type T6 = ReturnType<never>; // T6 = never
```

---

## InstanceType\<Type\>

Constructs a type consisting of the instance type of a constructor function `Type`.

```ts
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<typeof C>; // T0 = C
type T1 = InstanceType<any>; // T1 = any
type T2 = InstanceType<never>; // T2 = never
```

---

## NoInfer\<Type\>

Blocks inference of the contained type. Otherwise identical to `Type`.

```ts
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {
  // ...
}

createStreetLight(["red", "yellow", "green"], "red");   // ✅ OK
createStreetLight(["red", "yellow", "green"], "blue"); // ❌ Error
```

---

## ThisParameterType\<Type\>

Extracts the type of the `this` parameter for a function type, or `unknown` if none.

```ts
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

---

## OmitThisParameter\<Type\>

Removes the `this` parameter from `Type`.

```ts
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex()); // "5"
```

---

## ThisType\<Type\>

Marker interface for contextual `this`. Requires `noImplicitThis` to be enabled.

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // strongly typed this
      this.y += dy;
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

---

## Intrinsic String Manipulation Types

TypeScript provides four string‑literal manipulation types that work on template literal types.

| Type | Description |
|------|-------------|
| `Uppercase<StringType>` | Converts all alphabetic characters to uppercase. |
| `Lowercase<StringType>` | Converts all alphabetic characters to lowercase. |
| `Capitalize<StringType>` | Capitalizes the first character. |
| `Uncapitalize<StringType>` | Uncapitalizes the first character. |

These are useful when working with template literal types, e.g.:

```ts
type Upper = Uppercase<"hello">; // "HELLO"
type Lower = Lowercase<"WORLD">; // "world"
type Capital = Capitalize<"foo">; // "Foo"
type Uncapital = Uncapitalize<"Bar">; // "bar"
```

---

### End of Documentation

All examples above are directly taken from the official TypeScript reference.  
Feel free to copy, adapt, or extend them in your own projects.