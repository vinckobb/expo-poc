import { Request, Response } from "express";
import { getRouteById } from "../../logic";
import { ErrorResponse, Route } from "../../types";

export const method = "GET";
export const path = "/routes/:routeId";

export const handler = async (
  req: Request<{ routeId: string }>,
  res: Response<Route | ErrorResponse>
) => {
  try {
    const { routeId } = req.params;

    if (!routeId) {
      return res.status(400).json({
        error: "Parameter 'routeId' is required",
      });
    }

    const route = getRouteById(routeId);

    if (!route) {
      return res.status(404).json({
        error: "Route not found",
      });
    }

    res.json(route);
  } catch (error) {
    console.error("Error getting route information:", error);
    res.status(500).json({
      error: "Internal server error while getting route information",
    });
  }
};
