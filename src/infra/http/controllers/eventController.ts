import type { Request, Response } from "express";
import { MongoEventRepository } from "../../database/mongoEventRepository";
import { CreateEvent } from "../../../application/use-cases/createEvent";

const repo = new MongoEventRepository();
const createEvent = new CreateEvent(repo);

export async function createEventController(req: Request, res: Response) {
  try {
    const event = await createEvent.execute(req.body);
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: "Erro" });
  }
}
