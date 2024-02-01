# AbstractDatabase Class Documentation

The `AbstractDatabase` class is a foundational class for managing interactions with a database, providing methods to establish connections, manage transactions, and execute SQL queries.

## Class Signature:

```typescript
export default class AbstractDatabase {
  // ... Class implementation
}

export class NoActiveTransactionException extends Error {
  constructor() {
    super("No transaction active");
  }
}
```

## Constructor:

### `constructor(databaseAddress: string, username: string, password: string, databaseName: string)`

Creates an instance of the `AbstractDatabase` class and establishes a connection to the Given database.

#### Parameters:

- `databaseAddress`: IP/Domain of the MySQL database.
- `username`: Application username for database access.
- `password`: Application password for database access.
- `databaseName`: Name of the MySQL database.

#### Example:

```typescript
const database = new AbstractDatabase("localhost", "your_username", "your_password", "your_database");
```

## Public Methods:

### `close(): void`

Closes the database connection to prevent a memory leak.

#### Example:

```typescript
database.close();
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

## Protected Methods:

### `isTransactionActive(): Promise<void>`

Verifies that there is an active transaction.

#### Throws:

- `NoActiveTransactionException` if there is no active transaction.

#### Example:

```typescript
await database.isTransactionActive();
```

## Properties:

- `connection`: The MySQL connection pool used by the class.

## Usage:

To use the `AbstractDatabase` class, create an instance by providing the required credentials. Then, you can utilize the provided methods to manage transactions and execute SQL queries against the connected database.

## NoActiveTransactionException Class:

The `NoActiveTransactionException` class is an exception class that extends the standard `Error` class. It is thrown when attempting to commit or rollback a transaction without an active transaction.

### Constructor:

#### `constructor()`

Creates an instance of the `NoActiveTransactionException` class with a default error message.

#### Example:

```typescript
throw new NoActiveTransactionException();
```

---

This documentation provides an overview of the purpose and functionality of the `AbstractDatabase` class, including the constructor, methods, and usage examples. The `NoActiveTransactionException` class is also introduced as an exception that can be thrown when necessary.
