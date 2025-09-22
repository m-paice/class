import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { logger } from "../../../application/services/logger";
import { Sentry } from "../../../application/services/sentry";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    logger.error(
      `${error.message} - ${JSON.stringify(error.details, null, 2)}`,
    );
    Sentry.captureException(error.message, {
      level: "error",
      extra: {
        details: JSON.stringify(error.details, null, 2),
        code: error.statusCode,
      },
    });
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  logger.error(error.message);
  Sentry.captureException(error.message, {
    level: "fatal",
    extra: {
      details: JSON.stringify(error.message, null, 2),
    },
  });
  return res.status(500).json({
    message: "Unknown error occurred.",
  });
};
