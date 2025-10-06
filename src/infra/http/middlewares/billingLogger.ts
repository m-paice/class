import type { NextFunction, Request, Response } from "express";
import { SQLiteBillingRepository } from "../../database/sqliteBillingRepository";
import { CreateBilling } from "../../../application/use-cases/createBilling";

export const billingLogger = () => {
  const repo = new SQLiteBillingRepository();
  const createBillingLog = new CreateBilling(repo);
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", async () => {
      createBillingLog.execute({
        user: req.headers["userId"]?.toString() || "anonymous",
        ip: req.ip || "",
        route: req.originalUrl,
        method: req.method,
        content: `${res.statusCode}: ${JSON.stringify(req.body, null, 2)}`,
      });
    });
    next();
  };
};
