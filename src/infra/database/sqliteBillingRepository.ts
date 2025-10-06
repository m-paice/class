import { Billing } from "../../domain/entities/billing";
import type { IBillingRepository } from "../../domain/repositories/IBillingRepository";
import { SQLiteService } from "./sqlite/sqlite.service";

export class SQLiteBillingRepository implements IBillingRepository {
  private get db() {
    return SQLiteService.getDb();
  }

  public async save(data: Billing): Promise<Billing> {
    const stmt = this.db.prepare(
      `INSERT INTO billing_logs (user, ip, route, method, content) 
       VALUES (?, ?, ?, ?, ?)`,
    );

    const result = stmt.run(
      data.user,
      data.ip,
      data.route,
      data.method,
      data.content,
    );

    const response = this.db
      .prepare(`SELECT created_at FROM billing_logs WHERE id = ?`)
      .get(result.lastInsertRowid) as { created_at: string };

    const billing = new Billing(
      data.user,
      data.ip,
      data.route,
      data.method,
      data.content,
      new Date(response.created_at),
      Number(result.lastInsertRowid),
    );

    return billing;
  }
}
