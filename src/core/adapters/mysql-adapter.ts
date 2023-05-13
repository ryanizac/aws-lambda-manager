import { Repository } from "../../core";
import mysql from "mysql2/promise";
import { DatabaseError } from "../errors";

export class MySQLAdapter implements Repository {
  private readonly _connection: mysql.Connection | null = null;

  async getConnection() {
    const currentConnection = this._connection;

    if (currentConnection !== null) {
      return currentConnection;
    }

    const options = this.options;
    const newConnection = await mysql.createConnection({
      host: options.host,
      port: options.port,
      user: options.user,
      password: options.password,
    });

    return newConnection;
  }

  constructor(private options: MySQLAdapter.Options) {}

  async query(sql: string, values?: any[] | undefined): Promise<any> {
    try {
      const connection = await this.getConnection();
      await connection.connect();
      const [result] = await connection.query(sql, values);
      await connection.end();

      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}

export namespace MySQLAdapter {
  export type Options = {
    host: string;
    port: number;
    user: string;
    password: string;
  };
}
