import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function getPool(): mysql.Pool {
  if (global._mysqlPool) {
    return global._mysqlPool;
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "fgtintas",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  global._mysqlPool = pool;
  return pool;
}

export const db = {
  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  },

  async queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] ?? null;
  },

  async execute(sql: string, params?: unknown[]): Promise<mysql.ResultSetHeader> {
    const pool = getPool();
    const [result] = await pool.execute(sql, params);
    return result as mysql.ResultSetHeader;
  },
};
