import express from "express";
import * as routes from "./infra/http/routes";
import { errorHandler } from "./infra/http/middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(routes.eventRoute.router);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
