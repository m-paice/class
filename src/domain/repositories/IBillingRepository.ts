import type { Billing } from "../entities/billing";

export interface IBillingRepository {
  save(data: Billing): Promise<Billing>;
}
