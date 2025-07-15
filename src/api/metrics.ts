import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handleMetrics(req: Request, res: Response) {
  res.send(`Hits: ${config.fileserverHits}`);
}

export async function handleMetricsReset(req: Request, res: Response) {
  config.fileserverHits = 0;
  res.write("Hits reset to 0");
  res.end();
}
