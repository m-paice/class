import type { Event } from "../entities/events";

export interface IEventsRepository {
  save(event: Event): Promise<Event>;
  updateById(id: string, event: Partial<Event>): Promise<Event>;
  // remove(id: string): Promise<void>;
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
}
