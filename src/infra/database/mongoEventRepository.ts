import { Event } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

export class MongoEventRepository implements IEventsRepository {
  async save(event: Event): Promise<Event> {
    const record = {
      _id: "123",
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      status: event.status,
    };

    // TODO: save in database

    return new Event(
      record.name,
      record.description,
      record.date,
      record.location,
      record.capacity,
      record.status,
    );
  }
}
