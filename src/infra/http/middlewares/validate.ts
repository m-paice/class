import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";
import { ValidationError } from "../../../shared/errors";

export const validate =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      throw new ValidationError("Validation failed", { cause: error });
    }
  };
