import { z } from "zod";

export const envSentrySchema = z.object({
  SENTRY_DSN: z.string().min(1),
});
