import express from "express";
import { handleReadiness } from "./api/readiness.js";
import { handleMetrics, handleMetricsReset } from "./api/metrics.js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/healthz", handleReadiness);

app.get("/metrics", handleMetrics);

app.get("/reset", handleMetricsReset);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
