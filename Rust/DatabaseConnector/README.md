# Rust Database Connector Documentation

## Introduction
This is a Rust library for connecting to and interacting with a PostgreSQL database. It provides functionalities for establishing connections, executing queries, managing transactions, and closing connections.

## Installation
To use this library in your Rust project, add the following dependency to your `Cargo.toml` file:
```toml
[dependencies]
dotenv_codegen = "0.15.0"
sqlx = { version = "0.5.8", features = ["postgres"] }
```

## Usage
1. Import the necessary modules:
```rust
use dotenv_codegen::dotenv;
use sqlx::{Pool, Postgres};
use sqlx::postgres::{PgPoolOptions, PgRow};
```

2. Define a `Database` struct with a connection pool:
```rust
pub struct Database {
    connection: Pool<Postgres>,
}
```

3. Implement methods for the `Database` struct:
   - `connect()`: Establishes a connection to the PostgreSQL database.
   - `query(sql: &str) -> Option<Vec<PgRow>>`: Executes a SQL query and returns the result as an option of a vector of PostgreSQL rows.
   - `close()`: Closes the database connection.
   - `start_transaction()`: Begins a new transaction.
   - `end_transaction()`: Commits the current transaction.
```rust
impl Database {
    pub async fn connect() -> Database {
        // Retrieve database connection parameters from environment variables
        let database_address = dotenv!("DATABASE_HOST");
        let database_name = dotenv!("DATABASE_NAME");
        let database_user = dotenv!("DATABASE_APPLICATION_USER");
        let database_password = dotenv!("DATABASE_APPLICATION_USER_PASSWORD");

        // Construct the connection URL
        let connection_url = format!("postgres://{}:{}@{}/{}", database_user, database_password, database_address, database_name);

        // Establish a connection pool with PostgreSQL
        let database_conn = PgPoolOptions::new()
            .max_connections(5)
            .connect(&*connection_url)
            .await
            .expect("Unable to Connect to Postgres Database");

        return Database {
            connection: database_conn,
        };
    }

    pub async fn query(&self, sql: &str) -> Option<Vec<PgRow>> {
        // Execute the SQL query
        let result = sqlx::query(sql)
            .fetch_all(&self.connection)
            .await;

        // Handle query result
        if result.is_err() {
            println!("Error executing SQL query: {}", result.err().unwrap());
            return None;
        }
        return Option::from(result.unwrap());
    }

    pub async fn close(&self) {
        // Close the database connection
        self.connection.close().await;
    }

    pub async fn start_transaction(&self) {
        // Begin a new transaction
        self.query("BEGIN;").await;
    }

    pub async fn end_transaction(&self) {
        // Commit the current transaction
        self.query("COMMIT;").await;
    }
}
```

4. Use the `Database` struct in your Rust code to interact with the PostgreSQL database.

## Example
```rust
#[tokio::main]
async fn main() {
    // Establish a connection to the database
    let db = Database::connect().await;

    // Example query
    let result = db.query("SELECT * FROM users").await;
    match result {
        Some(rows) => {
            for row in rows {
                // Process each row
                println!("{:?}", row);
            }
        }
        None => {
            // Handle error
            println!("Failed to execute query.");
        }
    }

    // Close the database connection
    db.close().await;
}
```

## Notes
- Ensure that you have the required environment variables set up for database connection parameters (`DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_APPLICATION_USER`, `DATABASE_APPLICATION_USER_PASSWORD`).
- This library is designed for PostgreSQL databases.
- Make sure to handle errors appropriately, especially when executing queries.
- Always close the database connection after use to prevent resource leaks.
