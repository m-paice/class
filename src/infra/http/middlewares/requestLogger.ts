import type { Request, Response, NextFunction } from "express";
import { logger } from "../../../application/services/logger";

export const requestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startReq = Date.now();
  res.on("finish", () => {
    const durationReq = Date.now() - startReq;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    logger.info(`${method} ${originalUrl} ${statusCode} - ${durationReq}ms`);
  });

  next();
};
