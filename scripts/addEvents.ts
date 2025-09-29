import { faker } from "@faker-js/faker";
import type { Event } from "../src/domain/entities/events";
import { MongoService } from "../src/infra/database/mongo/mongo.service";

await MongoService.connect();

const collection = MongoService.getDb().collection("events");

await collection.deleteMany({});

const BatchSize = 10_000;
const total = 1_000_000;

for (let i = 0; i < total / BatchSize; i++) {
  const events = Array.from({ length: BatchSize }).map(() => {
    return {
      name: faker.lorem.words({ min: 2, max: 5 }),
      description: faker.lorem.sentence(),
      date: faker.date.between({
        from: "2023-01-01",
        to: "2026-12-31",
      }),
      location: faker.location.city(),
      capacity: faker.number.int({ min: 50, max: 5000 }),
      status: faker.number.int({ min: 0, max: 3 }),
    };
  });
  await collection.insertMany(events);
  console.log(`Inserted ${(i + 1) * BatchSize} / ${total} events`);
}

await MongoService.disconnect();
