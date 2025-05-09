import { Request, Response } from "express";
import { changePosition } from "../../logic";
import { ChangePositionRequest, ErrorResponse } from "../../types";

export const method = "PUT";
export const path = "/routes/favorite/:favoriteId/position";

export const handler = async (
  req: Request<{ favoriteId: string }, {}, ChangePositionRequest>,
  res: Response<{} | ErrorResponse>
) => {
  try {
    const { favoriteId } = req.params;
    const { position } = req.body;

    if (!favoriteId) {
      return res.status(400).json({
        error: "Parameter 'favoriteId' is required",
      });
    }

    if (typeof position !== "number") {
      return res.status(400).json({
        error: "Valid position is required",
      });
    }

    const success = changePosition(favoriteId, position);

    if (!success) {
      return res.status(404).json({
        error: "Favorite not found",
      });
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error changing route position:", error);
    res.status(500).json({
      error: "Internal server error while changing route position",
    });
  }
};
