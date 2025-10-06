import { Database } from "bun:sqlite";
import { env } from "../../../shared/config/env";
import { logger } from "../../../application/services/logger";

export class SQLiteService {
  private static db: Database;

  public static getDb(): Database {
    if (!this.db) {
      throw new Error("SQLite not connected");
    }
    return this.db;
  }

  public static async connect(): Promise<void> {
    if (this.db) return;

    this.db = new Database(env.DATABASE_PATH);
    logger.info("SQLite connected");

    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS billing_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        ip TEXT,
        route TEXT,
        method TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      )
      .run();
  }

  public static async disconnect(): Promise<void> {
    if (this.db) {
      this.db.close();
    }
  }
}
