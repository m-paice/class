import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

export class FindByName {
  constructor(private readonly eventRepo: IEventsRepository) {}

  async execute(name: string) {
    const records = await this.eventRepo.findByName(name);
    return records;
  }
}
