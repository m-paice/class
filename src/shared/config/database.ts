import { z } from "zod";

export const envDatabaseSchema = z.object({
  DATABASE_NAME: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});
