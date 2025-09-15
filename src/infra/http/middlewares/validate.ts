import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";
import { ValidationError } from "../../../shared/errors";

export const validate =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const transformed = error.issues.map((issue) => {
          return { field: issue.path.join("."), message: issue.message };
        });
        throw new ValidationError("Validation failed", { cause: transformed });
      }
      throw new ValidationError("Validation failed", { cause: error });
    }
  };
