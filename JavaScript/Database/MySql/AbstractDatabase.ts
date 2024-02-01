import mysql from "mysql2";
/**
 * The Root Database Class the Holds Methods
 * Used by every Child Class
 */
export default class AbstactDatabase {
  protected connection: any;
  protected promiseCon: any;

  protected activeTransaction: Boolean = false;
  /**
   * Establiseds a Connection the The Database
   *
   * WARN: create a seperate user with access only to the
   * expressions used
   * @constructor
   * @param server_address IP/ Domain of the Database
   * @param database Name of the Database we are using
   * @param username "Application Username"
   * @param password "Application Password"
   */
  protected constructor(database_address:string, username: string, password: string, database_name: string) {
    const conn = mysql.createPool({
      host: database_address,
      user: username,
      password: password,
      database: database_name,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    this.connection = conn.promise();
  }

  /**
   * Send SQL Instructions the The Database
   * @param query SQL String to be Queried to the Database
   * @returns The Result of the Query
   */
  protected async query(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute(query)
        .then(([rows, fields]: any) => {
          resolve(rows);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  /**
   * Verifies that there is an active transaction
   * @throws NoActiveTransactionException
   */
  protected isTransactionActive() {
    if (!this.activeTransaction) {
      return Promise.reject( new NoActiveTransactionException())
    }
  }

  /**
   * Closes the Database Transaction to prevent a memory leak
   */
  public close() {
    this.connection.end();
  }

  /**
   * Starts a Transaction on the Database
   */
  public async startTransaction() {
    this.activeTransaction = true;
    try {
      await this.query(`START TRANSACTION;`);
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * Commit the Transaction to the Database
   * @throws No Transaction Active Error
   */
  public async commitTransaction() {
    try {
      this.isTransactionActive();
      await this.query(`COMMIT;`);
      this.activeTransaction = false;
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * Rollbacks the active Transaction
   * @throws No Transaction Active Error
   */
  public async rollbackTransaction() {
    try {
      this.isTransactionActive();
      await this.query(`ROLLBACK;`);
      this.activeTransaction = false;
    } catch (e: any) {
      throw e;
    }
  }
}

export class NoActiveTransactionException extends Error {
  constructor() {
    super("No Transaction active");
  }
}