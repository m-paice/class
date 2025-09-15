import express from "express";
import * as routes from "./infra/http/routes";
import { errorHandler } from "./infra/http/middlewares/errorHandler";
import { env } from "./shared/config/env";
import { MongoService } from "./infra/database/mongo/mongo.service";

await MongoService.connect();

const app = express();
app.use(express.json());
app.use(routes.eventRoute.router);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
