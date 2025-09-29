import type { Collection, WithId } from "mongodb";
import { Event } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";
import { MongoService } from "./mongo/mongo.service";

export class MongoEventRepository implements IEventsRepository {
  private get collection(): Collection<Event> {
    return MongoService.getDb().collection<Event>("events");
  }

  private transformToEvent(record: WithId<Event>): Event {
    return new Event(
      record.name,
      record.description,
      record.date,
      record.location,
      record.capacity,
      record.status,
      record._id.toString()
    );
  }

  async save(event: Event): Promise<Event> {
    const response = await this.collection.insertOne(event);

    return this.transformToEvent({
      ...event,
      _id: response.insertedId,
    });
  }

  async findAll(data?: Record<string, string | undefined>): Promise<Event[]> {
    const query: any = {};
    if (data?.name) {
      query.$text = { $search: data.name };
    }
    const records = await this.collection.find(query).toArray();
    return records.map((record) => this.transformToEvent(record));
  }

  async findById(id: string): Promise<Event | null> {
    throw new Error("Method not implemented.");
  }

  async updateById(id: string, event: Partial<Event>): Promise<Event> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Event[] | null> {
    const records = await this.collection
      .find({ name: { $regex: name, $options: "i" } })
      .toArray();
    return records.map((record) => this.transformToEvent(record));
  }
}
