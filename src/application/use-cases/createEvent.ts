import { Event, EventStatus } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

interface CreateEventDTO {
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
    return this.eventRepo.save(event);
  }
}
