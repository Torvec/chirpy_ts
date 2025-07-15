import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export async function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    if (statusCode < 200 || statusCode >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });
  next();
}

export async function middlewareMetricsInc(
  _: Request,
  __: Response,
  next: NextFunction
) {
  config.fileserverHits++;
  next();
}
