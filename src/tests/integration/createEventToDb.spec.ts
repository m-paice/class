import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { CreateEventDTO } from "../../application/use-cases/createEvent";
import { Event, EventStatus } from "../../domain/entities/events";

let mongoServer: MongoMemoryServer;
let client: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  client = new MongoClient(mongoServer.getUri());
  await client.connect();
});

afterAll(async () => {
  await client.close();
  await mongoServer.stop();
});

describe("createEventToDb", async () => {
  it("should save event in database", async () => {
    const db = client.db("testdb");
    const events = db.collection("eventsmock");

    const payload: CreateEventDTO = {
      name: "Tech Conference 2024",
      description: "A conference about the latest in tech.",
      date: new Date("2024-09-15T09:00:00Z"),
      location: "San Francisco, CA",
      capacity: 300,
    };

    const dataDTO = new Event(
      payload.name,
      payload.description,
      payload.date,
      payload.location,
      payload.capacity,
      EventStatus.Scheduled,
    );

    const result = await events.insertOne(dataDTO);
    expect(result.insertedId).toBeDefined();
    const event = await events.findOne({ _id: result.insertedId });
    expect(event).not.toBeNull();
    expect(event?.name).toBe(dataDTO.name);
    expect(event).toMatchObject(dataDTO);
  });
});
