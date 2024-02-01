import { Pool } from "pg";

/**
 * The Root Database Class the Holds Methods
 * Used by every Child Class
 */
export class AbstactDatabase {
  protected connection: any;
  protected promiseCon: any;

  // private isConnected: boolean = false;

  protected activeTransaction: boolean = false;
  /**
   * Establiseds a Connection the The Database
   *
   * WARN: create a seperate user with anpm ccess only to the
   * expressions used
   * @constructor
   * @param server_address IP/ Domain of the Database
   * @param database Name of the Database we are using
   * @param username "Application Username"
   * @param password "Application Password"
   */
  protected constructor(database_address:string, username: string, password: string, database_name: string) {
    this.connection = new Pool({
      host: database_address,
      user: username,
      database: database_name,
      password: password,
    });
  }

  /**
   * Closes the Database Transaction to prevent a memory leak
   */
  public async close() {
    // isConnected = false;
    await this.connection.end();
  }

  /**
   * Starts a Transaction on the Database
   */
  public async startTransaction(): Promise<void> {
    this.activeTransaction = true;
    try {
      await this.query("BEGIN;");
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
      // if (!this.activeTransaction) {
      //  return Promise.reject(new NoActiveTransactionException());
      // }
      await this.query("COMMIT;");
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
      if (!this.activeTransaction) {
        return await Promise.reject(new NoActiveTransactionException());
      }
      await this.query("ROLLBACK;");
      this.activeTransaction = false;
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * Send SQL Instructions the The Database
   * @param query SQL String to be Queried to the Database
   * @returns The Result of the Query
   */
  protected async query(query: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // while (!this.isConnected) {}
      const client = await this.connection.connect();
      try {
        const res = await client.query(query);
        // console.log(res.rows)
        client.release();
        resolve(res.rows);
      } catch (err: any) {
        client.release();
        reject(err);
      }
    });
  }

  /**
   * Verifies that there is an active transaction
   * @throws NoActiveTransactionException
   */
  protected async isTransactionActive() {
    if (!this.activeTransaction) {
      return await Promise.reject(new NoActiveTransactionException());
    }
  }
}

export class NoActiveTransactionException extends Error {
  constructor() {
    super("No Transaction active");
  }
}