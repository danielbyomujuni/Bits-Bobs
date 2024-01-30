# AbstractDatabase Class Documentation
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

The `AbstractDatabase` class serves as the root class for managing interactions with a PostgreSQL database. It provides essential methods for establishing connections, managing transactions, and executing SQL queries.

## Constructor

### `constructor(username: string, password: string)`

Creates an instance of the `AbstractDatabase` class.

#### Parameters:

- `username`: Application username for database access.
- `password`: Application password for database access.

#### Example:

```typescript
const database = new AbstractDatabase("your_username", "your_password");
```

## Public Methods

### `close(): Promise<void>`

Closes the database connection to prevent memory leaks.

#### Example:

```typescript
await database.close();
```

### `startTransaction(): Promise<void>`

Starts a transaction on the database.

#### Example:

```typescript
await database.startTransaction();
```

### `commitTransaction(): Promise<void>`

Commits the active transaction to the database.

#### Throws:

- `NoActiveTransactionException` if there is no active transaction.

#### Example:

```typescript
await database.commitTransaction();
```

### `rollbackTransaction(): Promise<void>`

Rollbacks the active transaction.

#### Throws:

- `NoActiveTransactionException` if there is no active transaction.

#### Example:

```typescript
await database.rollbackTransaction();
```

### `query(query: string): Promise<any>`

Sends SQL instructions to the database and returns the result of the query.

#### Parameters:

- `query`: SQL string to be queried to the database.

#### Returns:

A promise that resolves with the result of the query.

#### Example:

```typescript
const result = await database.query("SELECT * FROM your_table;");
```

## Protected Methods

### `isTransactionActive(): Promise<void>`

Verifies that there is an active transaction.

#### Throws:

- `NoActiveTransactionException` if there is no active transaction.

#### Example:

```typescript
await database.isTransactionActive();
```

## Properties

### `connection: any`

The PostgreSQL connection pool used by the class.

### `promiseCon: any`

A promise-based connection.

### `activeTransaction: boolean`

Indicates whether there is an active transaction.

## Usage

To use the `AbstractDatabase` class, create an instance by providing the required credentials. Then, you can utilize the provided methods to manage transactions and execute SQL queries against the connected PostgreSQL database.
