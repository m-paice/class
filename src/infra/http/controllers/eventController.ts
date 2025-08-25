import type { Request, Response } from "express";
import { createEvent, findAllEvents, findByIdEvent } from "../factories";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const event = await createEvent.execute(req.body);
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(400).json({ message: "Erro" });
  }
};

export const findAllEventController = async (_req: Request, res: Response) => {
  try {
    const events = await findAllEvents.execute();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(400).json({ message: "Erro" });
  }
};

export const findByIdEventController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = await findByIdEvent.execute(id!);

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(400).json({ message: "Erro" });
  }
};
