import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    respondWithError(res, 400, "Chirp is too long");
    return;
  }

  const banned = new Set(["kerfuffle", "sharbert", "fornax"]);

  const tokens = params.body.split(" ");
  const cleaned = tokens
    .map((word) => (banned.has(word.toLowerCase()) ? "****" : word))
    .join(" ");

  respondWithJSON(res, 200, { cleanedBody: cleaned });
}
