import {
  CreateEvent,
  type CreateEventDTO,
} from "../../application/use-cases/createEvent";
import { Event } from "../../domain/entities/events";
import type { IEventsRepository } from "../../domain/repositories/IEventsRepository";

describe("CreateEventUseCase", () => {
  it("should create an event successfully", async () => {
    const fakeRepo: jest.Mocked<IEventsRepository> = {
      save: jest.fn(),
      updateById: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const useCase = new CreateEvent(fakeRepo);

    const dataDTO: CreateEventDTO = {
      name: "Tech Conference 2024",
      description: "A conference about the latest in tech.",
      date: new Date("2024-09-15T09:00:00Z"),
      location: "San Francisco, CA",
      capacity: 300,
    };

    const event = await useCase.execute(dataDTO);
    expect(event).toBeInstanceOf(Event);
    expect(event.name).toBe(dataDTO.name);
    expect(fakeRepo.save).toHaveBeenCalledTimes(1);
    expect(fakeRepo.save).toHaveBeenCalledWith(event);
  });
});
