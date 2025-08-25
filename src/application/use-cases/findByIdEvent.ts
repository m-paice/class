import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";
import { NotFoundError } from "../../shared/errors";

export class FindByIdEvent {
  constructor(private readonly eventRepo: IEventsRepository) {}

  async execute(id: string) {
    const record = await this.eventRepo.findById(id);
    if (!record) {
      throw new NotFoundError("Event not found");
    }
    return record;
  }
}
