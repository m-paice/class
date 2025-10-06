import { Billing } from "../../domain/entities/billing";
import type { IBillingRepository } from "../../domain/repositories/IBillingRepository";

interface CreateBillingDTO {
  user: string;
  ip: string;
  route: string;
  method: string;
  content: string;
}

export class CreateBilling {
  constructor(private readonly billingRepo: IBillingRepository) {}

  async execute(billingDTO: CreateBillingDTO) {
    const billing = new Billing(
      billingDTO.user,
      billingDTO.ip,
      billingDTO.route,
      billingDTO.method,
      billingDTO.content,
    );

    const data = await this.billingRepo.save(billing);
    return data;
  }
}
