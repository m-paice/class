import { Event, EventStatus } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

export interface CreateEventDTO {
  name: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
}

export class CreateEvent {
  constructor(private readonly eventRepo: IEventsRepository) {}

  async execute(data: CreateEventDTO) {
    const event = new Event(
      data.name,
      data.description,
      data.date,
      data.location,
      data.capacity,
      EventStatus.Scheduled,
    );
    await this.eventRepo.save(event);
    return event;
  }
}
