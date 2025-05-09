import { Request, Response } from "express";
import { getAllRoutes } from "../../logic";
import { GetRoutesResponse, ErrorResponse } from "../../types";

export const method = "GET";
export const path = "/routes";

export const handler = async (
  req: Request,
  res: Response<GetRoutesResponse | ErrorResponse>
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

    const routes = getAllRoutes(
      sortOption,
      searchQuery,
      filterNumber,
      filterName
    );
    const response: GetRoutesResponse = { routes };
    res.json(response);
  } catch (error) {
    console.error("Error getting routes:", error);
    res.status(500).json({
      error: "Internal server error while getting routes",
    });
  }
};
