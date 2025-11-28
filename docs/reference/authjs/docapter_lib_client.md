# @auth/dgraph-adapter – API Reference

> This document describes the public API of the **@auth/dgraph-adapter** package.  
> All examples are kept verbatim from the original source.

---

## 1. `DgraphClientError`

`DgraphClientError` is a custom error type that extends the native `Error` class.  
It is thrown when the Dgraph client encounters an error response.

```ts
import { DgraphClientError } from '@auth/dgraph-adapter';
```

### 1.1 Constructor

```ts
new DgraphClientError()
new DgraphClientError(errors: any[], query: string, variables: any): DgraphClientError
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `errors`  | `any[]`| Array of error objects returned by Dgraph. |
| `query`   | `string`| The GraphQL query that caused the error. |
| `variables` | `any` | Variables passed to the query. |

### 1.2 Properties

| Property | Type   | Description |
|----------|--------|-------------|
| `message` | `string` | Human‑readable error message. |
| `name`    | `string` | Always `"DgraphClientError"`. |
| `stack?`  | `string` | Optional stack trace. |

### 1.3 Static Members

| Member | Type | Description |
|--------|------|-------------|
| `prepareStackTrace?` | `(err: Error, stackTraces: CallSite[]) => any` | Optional override for formatting stack traces. |
| `stackTraceLimit` | `number` | Static stack trace limit. |
| `captureStackTrace(targetObject, constructorOpt?)` | `void` | Creates a `.stack` property on a target object. |

---

## 2. `DgraphClientParams`

Configuration object used to create a Dgraph client.

```ts
import { DgraphClientParams } from '@auth/dgraph-adapter';
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `authHeader?` | `string` | `"Authorization"` | Header name used for JWT authentication. |
| `authToken` | `string` | – | Value of the `X-Auth-Token` header. |
| `endpoint` | `string` | – | Dgraph GraphQL endpoint URL. |
| `jwtAlgorithm?` | `"HS256" | "RS256"` | `"RS256"` | Algorithm used for JWT signing. |
| `jwtSecret?` | `string` | – | Secret or private key used to sign JWTs. |

> **Note**: For more details on JWT usage, see the [Dgraph documentation](https://dgraph.io/docs/graphql/authorization/authorization-overview#using-jwts-and-authorization-claims).

---

## 3. `client(params)`

Creates a Dgraph client instance.

```ts
import { client } from '@auth/dgraph-adapter';
```

### 3.1 Signature

```ts
function client<T>(params: DgraphClientParams): {
  run: Promise<null | T>;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | `DgraphClientParams` | Configuration object. |

### 3.2 Returned Object

| Method | Type | Description |
|--------|------|-------------|
| `run` | `Promise<null | T>` | Executes a GraphQL query. |

---

## 4. `run(query, variables?)`

Executes a GraphQL query against the configured Dgraph endpoint.

```ts
const { run } = client<T>(params);
const result = await run(query, variables);
```

### 4.1 Signature

```ts
function run<T>(query: string, variables?: Record<string, any>): Promise<null | T>
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | `string` | GraphQL query string. |
| `variables?` | `Record<string, any>` | Optional variables map. |

### 4.2 Example

```ts
import { client } from '@auth/dgraph-adapter';

const params = {
  endpoint: 'https://your-dgraph-instance.com/graphql',
  authToken: 'your-jwt-token',
};

const gqlClient = client(params);

const query = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const variables = { id: '123' };

gqlClient.run(query, variables)
  .then(data => console.log('User data:', data))
  .catch(err => console.error('Dgraph error:', err));
```

---

## 5. Usage Summary

```ts
import { client, DgraphClientParams, DgraphClientError } from '@auth/dgraph-adapter';

const params: DgraphClientParams = {
  endpoint: 'https://example.com/graphql',
  authToken: 'eyJhbGciOi...',
  jwtAlgorithm: 'RS256',
};

const gqlClient = client(params);

async function fetchUser(id: string) {
  const query = `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
      }
    }
  `;

  try {
    const result = await gqlClient.run(query, { id });
    console.log(result);
  } catch (err) {
    if (err instanceof DgraphClientError) {
      console.error('GraphQL errors:', err.errors);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}
```

---

## 6. References

- [Dgraph GraphQL Authorization](https://dgraph.io/docs/graphql/authorization/authorization-overview#using-jwts-and-authorization-claims)
- [V8 Stack Trace API](https://v8.dev/docs/stack-trace-api#customizing-stack-traces)

---