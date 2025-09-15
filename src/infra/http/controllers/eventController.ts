import type { Request, Response } from "express";
import { createEvent, findAllEvents, findByIdEvent } from "../factories";
import { httpResponse } from "../../../shared/http/response";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const event = await createEvent.execute(req.body);
    httpResponse(res, 201, "Created successfully", event);
  } catch (error) {
    httpResponse(
      res,
      400,
      "Error to create event",
      undefined,
      (error as Error).message,
    );
  }
};

export const findAllEventController = async (_req: Request, res: Response) => {
  try {
    const events = await findAllEvents.execute();
    httpResponse(res, 200, "Reader successfully", events);
  } catch (error) {
    httpResponse(
      res,
      400,
      "Error to Reader",
      undefined,
      (error as Error).message,
    );
  }
};

export const findByIdEventController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = await findByIdEvent.execute(id!);
    httpResponse(res, 200, "Reader successfully", events);
  } catch (error) {
    httpResponse(
      res,
      400,
      "Error to Reader",
      undefined,
      (error as Error).message,
    );
  }
};
