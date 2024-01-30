import Logger from "../Logger";
import { Pool } from "pg";
import { env } from "$env/dynamic/private";
import NoActiveTransactionException from "$lib/errors/NoActiveTransactionException";

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
  protected constructor(username: string, password: string) {
    this.connection = new Pool({
      user: username,
      database: env.PRIVATE_DATABASE_TABLE,
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
    Logger.info("Started Transaction On The Database");
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
      Logger.info("Transaction Commited to The Database");
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
      Logger.info("Transaction Rolled back");
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

        Logger.sql(query, true);
        client.release();
        resolve(res.rows);
      } catch (err: any) {
        Logger.sql(query, false);
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
