import { Request, Response } from "express";
import { removeFromFavorite } from "../../logic";
import { ErrorResponse } from "../../types";

export const method = "DELETE";
export const path = "/routes/favorite/:favoriteId";

export const handler = async (
  req: Request<{ favoriteId: string }>,
  res: Response<{} | ErrorResponse>
) => {
  try {
    const { favoriteId } = req.params;

    if (!favoriteId) {
      return res.status(400).json({
        error: "Parameter 'favoriteId' is required",
      });
    }

    const success = removeFromFavorite(favoriteId);

    if (!success) {
      return res.status(404).json({
        error: "Favorite not found",
      });
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error removing route from favorites:", error);
    res.status(500).json({
      error: "Internal server error while removing route from favorites",
    });
  }
};
