# Auth.js – TypeORM Adapter Utilities

The **`@auth/typeorm-adapter`** package ships with a couple of helper functions that make it easier to work with TypeORM data sources in Auth.js.  
Below is a clean, self‑contained reference for the two public utilities:

---

## `parseDataSourceConfig`

```ts
/**
 * Normalises a TypeORM data‑source configuration.
 *
 * @param configOrString - Either a connection string or a `DataSourceOptions` object.
 * @returns A fully‑resolved `DataSourceOptions` object that can be passed to `new DataSource(...)`.
 */
export function parseDataSourceConfig(
  configOrString: string | DataSourceOptions
): DataSourceOptions;
```

### Parameters

| Name           | Type                     | Description |
|----------------|--------------------------|-------------|
| `configOrString` | `string \| DataSourceOptions` | A connection string (e.g. `"postgres://user:pass@localhost/db"`) or a plain `DataSourceOptions` object. |

### Returns

| Type | Description |
|------|-------------|
| `DataSourceOptions` | A fully‑resolved configuration object ready for `new DataSource(...)`. |

### Example

```ts
import { parseDataSourceConfig } from '@auth/typeorm-adapter';
import { DataSource } from 'typeorm';

const rawConfig = 'postgres://user:pass@localhost:5432/auth';
const options = parseDataSourceConfig(rawConfig);

const dataSource = new DataSource(options);
await dataSource.initialize();
```

---

## `updateConnectionEntities`

```ts
/**
 * Updates the entities used by an existing TypeORM `DataSource`.
 *
 * @param dataSource - The `DataSource` instance whose entities should be updated.
 * @param entities   - An array of entity classes or schemas to add to the connection.
 * @returns A promise that resolves when the connection has been refreshed.
 */
export async function updateConnectionEntities(
  dataSource: DataSource,
  entities: any[]
): Promise<void>;
```

### Parameters

| Name        | Type      | Description |
|-------------|-----------|-------------|
| `dataSource` | `DataSource` | The TypeORM data source that is already initialized. |
| `entities`   | `any[]`     | An array of entity classes or schemas to register with the data source. |

### Returns

| Type | Description |
|------|-------------|
| `Promise<void>` | Resolves once the data source has re‑loaded its entity metadata. |

### Example

```ts
import { updateConnectionEntities } from '@auth/typeorm-adapter';
import { DataSource } from 'typeorm';
import { User, Session } from './entities';

const dataSource = new DataSource(/* ... */);
await dataSource.initialize();

// Later, add new entities to the running connection
await updateConnectionEntities(dataSource, [User, Session]);
```

---

### Notes

* `parseDataSourceConfig` is especially handy when you want to keep your configuration in a single string (e.g. from an environment variable) but still need a full `DataSourceOptions` object for TypeORM.
* `updateConnectionEntities` is useful in hot‑reload scenarios or when you dynamically add new entity classes after the initial connection has been established.

Feel free to drop a question or feedback in the Auth.js community if you run into any edge cases!