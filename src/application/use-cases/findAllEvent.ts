import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

export class FindAllEvent {
  constructor(private readonly eventRepo: IEventsRepository) {}

  async execute() {
    return this.eventRepo.findAll();
  }
}
