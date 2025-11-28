# @auth/dynamodb-adapter

Official DynamoDB adapter for **Auth.js / NextAuth.js**.  
It provides a fully‑typed adapter that works with the AWS SDK v3 `DynamoDBDocumentClient`.

---

## Installation

```bash
# npm
npm install next-auth @auth/dynamodb-adapter

# pnpm
pnpm add next-auth @auth/dynamodb-adapter

# yarn
yarn add next-auth @auth/dynamodb-adapter

# bun
bun add next-auth @auth/dynamodb-adapter
```

---

## DynamoDBAdapterOptions

| Property            | Type   | Description |
|---------------------|--------|-------------|
| `indexName?`        | string | Optional name of the secondary index. |
| `indexPartitionKey?`| string | Optional partition key for the secondary index. |
| `indexSortKey?`     | string | Optional sort key for the secondary index. |
| `partitionKey?`     | string | Optional partition key for the main table. |
| `sortKey?`          | string | Optional sort key for the main table. |
| `tableName?`        | string | Optional name of the DynamoDB table. |
| `format`            | object | Custom format functions (see below). |

---

## Type Declarations

### `format`

```ts
const format: {
  from: null | T;
  to: Record<string, unknown>;
};
```

### `from<T = Record<string, unknown>>()`

Takes a DynamoDB object and returns a plain JavaScript object.

```ts
function from<T = Record<string, unknown>>(object?: Record<string, any>): null | T
```

### `to()`

Takes a plain JavaScript object and turns it into a DynamoDB object.

```ts
function to(object: Record<string, any>): Record<string, unknown>
```

---

## DynamoDBAdapter

Creates an Auth.js adapter that uses DynamoDB.

```ts
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));
const adapter = DynamoDBAdapter(client, {
  tableName: 'AuthTable',
  // other options...
});
```

**Parameters**

| Name   | Type                     | Description |
|--------|--------------------------|-------------|
| `client` | `DynamoDBDocumentClient` | The DynamoDB document client instance. |
| `options?` | `DynamoDBAdapterOptions` | Optional configuration. |

**Returns**

`Adapter` – the Auth.js adapter instance.

---

## generateUpdateExpression

Utility to create a DynamoDB update expression from a plain object.

```ts
function generateUpdateExpression(object: Record<string, any>): {
  ExpressionAttributeNames: Record<string, string>;
  ExpressionAttributeValues: Record<string, unknown>;
  UpdateExpression: string;
}
```

**Parameters**

| Name   | Type                | Description |
|--------|---------------------|-------------|
| `object` | `Record<string, any>` | The object to convert. |

**Returns**

```ts
{
  ExpressionAttributeNames: Record<string, string>;
  ExpressionAttributeValues: Record<string, unknown>;
  UpdateExpression: string;
}
```

---

## Example Usage

```ts
import NextAuth from 'next-auth';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1' }));

export default NextAuth({
  adapter: DynamoDBAdapter(client, {
    tableName: 'AuthTable',
    // optional: indexName, partitionKey, sortKey, etc.
  }),
  // ...other NextAuth options
});
```

---

## References

- [Auth.js](https://authjs.dev/)
- [AWS SDK v3 DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html)

---