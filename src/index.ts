import express from "express";
import { handleReadiness } from "./api/readiness.js";
import { handleMetrics, handleMetricsReset } from "./api/metrics.js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";
import { handleChirpsValidate } from "./api/chirps.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);

app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handleReadiness);
app.get("/admin/metrics", handleMetrics);
app.post("/admin/reset", handleMetricsReset);

app.post("/api/validate_chirp", handleChirpsValidate);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
