import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handleMetrics(_: Request, res: Response) {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
  </body>
</html>`);
}

export async function handleMetricsReset(_: Request, res: Response) {
  config.fileserverHits = 0;
  res.write("Hits reset to 0");
  res.end();
}
