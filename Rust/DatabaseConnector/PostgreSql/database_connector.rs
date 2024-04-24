use dotenv_codegen::dotenv;
use sqlx::{Pool, Postgres};
use sqlx::postgres::{PgPoolOptions, PgRow};

pub struct Database {
    connection: Pool<Postgres>,
}
impl Database {
    pub async fn connect() -> Database {
        let database_address = dotenv!("DATABASE_HOST");
        let database_name = dotenv!("DATABASE_NAME");
        let database_user = dotenv!("DATABASE_APPLICATION_USER");
        let database_password = dotenv!("DATABASE_APPLICATION_USER_PASSWORD");

        let connection_url = format!("postgres://{}:{}@{}/{}", database_user, database_password,database_address,database_name);
        let database_conn = PgPoolOptions::new().max_connections(5).connect(&*connection_url).await.expect("Unable to Connect to Postgres Database");

        return Database {
            connection: database_conn,
        }
    }

    pub async fn query(&self, sql: &str) -> Option<Vec<PgRow>> {
        let result = sqlx::query(sql).fetch_all(&self.connection).await;
        if (result.is_err()) {
            println!("sql: {}", result.err().unwrap());
            return None;
        }
        return Option::from(result.unwrap());
    }

    pub async fn close(&self) {
        self.connection.close().await;
    }

    pub async fn start_transaction(&self) {
        self.query("BEGIN;").await;
    }

    pub async fn end_transaction(&self) {
        self.query("COMMIT;").await;
    }
}
