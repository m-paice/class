import { CreateEvent } from "../../../application/use-cases/createEvent";
import { FindAllEvent } from "../../../application/use-cases/findAllEvent";
import { FindByIdEvent } from "../../../application/use-cases/findByIdEvent";
import { MongoEventRepository } from "../../database/mongoEventRepository";

const repo = new MongoEventRepository();
export const createEvent = new CreateEvent(repo);
export const findByIdEvent = new FindByIdEvent(repo);
export const findAllEvents = new FindAllEvent(repo);
