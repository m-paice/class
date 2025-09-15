import { MongoClient, type Db } from "mongodb";
import { env } from "../../../shared/config/env";

export class MongoService {
  private static client: MongoClient;
  private static db: Db;

  public static async connect(): Promise<void> {
    if (this.client) return;

    this.client = new MongoClient(env.DATABASE_URL);
    await this.client.connect();
    console.log("MongoDB connected");

    this.db = this.client.db(env.DATABASE_NAME);
  }

  public static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log("MongoDB disconnected");
    }
  }

  public static getDb(): Db {
    if (!this.db) {
      throw new Error("MongoDB not connected");
    }
    return this.db;
  }
}
