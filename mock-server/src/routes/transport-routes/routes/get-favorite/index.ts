import { Request, Response } from "express";
import { getFavoriteRoutes } from "../../logic";
import {
  GetFavoriteRoutesResponse,
  ErrorResponse,
  RouteQueryParams,
} from "../../types";

export const method = "GET";
export const path = "/routes/favorite";

export const handler = async (
  req: Request<{}, {}, {}, Partial<RouteQueryParams>>,
  res: Response<GetFavoriteRoutesResponse | ErrorResponse>
) => {
  try {
    const {
      sortBy = "name",
      searchText = "",
      filterByNumber,
      filterByName,
    } = req.query;

    const sortOption =
      typeof sortBy === "string"
        ? (sortBy as "number" | "name" | "custom")
        : "name";
    const searchQuery = typeof searchText === "string" ? searchText : "";
    const filterNumber = filterByNumber === "true";
    const filterName = filterByName === "true";
    
    const favorites = getFavoriteRoutes(
      sortOption,
      searchQuery,
      filterNumber,
      filterName
    );

    const response: GetFavoriteRoutesResponse = { favorites };
    res.json(response);
  } catch (error) {
    console.error("Error getting favorite routes:", error);
    res.status(500).json({
      error: "Internal server error while getting favorite routes",
    });
  }
};
