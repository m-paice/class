import z from "zod";

export const createEventSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500).optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  location: z.string().min(5).max(200),
  capacity: z.number().int().positive().optional(),
});
