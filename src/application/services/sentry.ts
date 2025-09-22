import * as Sentry from "@sentry/node";
import { env } from "../../shared/config/env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  enableLogs: true,
  sendDefaultPii: true,
});

export { Sentry };
