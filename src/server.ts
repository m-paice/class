import express from "express";
import * as routes from "./infra/http/routes";
import { errorHandler } from "./infra/http/middlewares/errorHandler";
import { requestHandler } from "./infra/http/middlewares/requestLogger";
import { env } from "./shared/config/env";
import { MongoService } from "./infra/database/mongo/mongo.service";
import { logger } from "./application/services/logger";
import { SQLiteService } from "./infra/database/sqlite/sqlite.service";
import { billingLogger } from "./infra/http/middlewares/billingLogger";

await MongoService.connect();
await SQLiteService.connect();

const app = express();
app.use(express.json());
app.use(requestHandler);
app.use(billingLogger());
app.use(routes.eventRoute.router);

app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
