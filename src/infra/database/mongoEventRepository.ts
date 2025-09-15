import type { Collection } from "mongodb";
import { Event } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";
import { MongoService } from "./mongo/mongo.service";

export class MongoEventRepository implements IEventsRepository {
  private get collection(): Collection {
    return MongoService.getDb().collection("events");
  }

  async save(event: Event): Promise<Event> {
    const response = await this.collection.insertOne(event);

    return new Event(
      event.name,
      event.description,
      event.date,
      event.location,
      event.capacity,
      event.status,
      response.insertedId.toString(),
    );
  }

  async findAll(): Promise<Event[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Event | null> {
    throw new Error("Method not implemented.");
  }

  async updateById(id: string, event: Partial<Event>): Promise<Event> {
    throw new Error("Method not implemented.");
  }
}
