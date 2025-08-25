import { Router } from "express";
import {
  createEventController,
  findAllEventController,
  findByIdEventController,
} from "../controllers/eventController";
import { validate } from "../middlewares/validate";
import { createEventSchema } from "../schemas";

const router = Router();

router.post("/events", validate(createEventSchema), createEventController);
router.get("/events", findAllEventController);
router.get("/events/:id", findByIdEventController);

export { router };
