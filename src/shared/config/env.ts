import { z } from "zod";
import { envDatabaseSchema } from "./database";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]),
    PORT: z.string().transform((value) => Number(value)),
  })
  .and(envDatabaseSchema);

export const env = envSchema.parse(process.env);
