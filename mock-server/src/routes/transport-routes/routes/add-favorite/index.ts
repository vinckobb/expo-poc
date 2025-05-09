import { Request, Response } from "express";
import { addToFavorite } from "../../logic";
import {
  AddFavoriteRequest,
  AddFavoriteResponse,
  ErrorResponse,
} from "../../types";

export const method = "POST";
export const path = "/routes/favorite";

export const handler = async (
  req: Request<{}, {}, AddFavoriteRequest>,
  res: Response<AddFavoriteResponse | ErrorResponse>
) => {
  try {
    const { routeId } = req.body;

    if (!routeId) {
      return res.status(400).json({
        error: "Parameter 'routeId' is required",
      });
    }

    const updatedRoute = addToFavorite(routeId);

    if (!updatedRoute) {
      return res.status(404).json({
        error: "Route not found",
      });
    }

    res.json(updatedRoute);
  } catch (error) {
    console.error("Error adding route to favorites:", error);
    res.status(500).json({
      error: "Internal server error while adding route to favorites",
    });
  }
};
