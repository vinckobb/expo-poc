import {
  Route,
  RouteFilter,
  GetRoutesResponse,
  GetFavoriteRoutesResponse,
  FavoriteRouteResponse,
} from "./types";
import { RouteService } from "./RouteService";
import { HttpClient } from "./HttpClient";

export class RouteServiceImpl implements RouteService {
  constructor(private httpClient: HttpClient) {}

  async getRoutes(filter?: RouteFilter): Promise<Route[]> {
    const params: Record<string, string> = {};

    if (filter) {
      params.sortBy = filter.sortBy;

      if (filter.searchText) {
        params.searchText = filter.searchText;
      }

      if (filter.filterByNumber !== undefined) {
        params.filterByNumber = filter.filterByNumber.toString();
      }

      if (filter.filterByName !== undefined) {
        params.filterByName = filter.filterByName.toString();
      }
    }

    const response = await this.httpClient.get<GetRoutesResponse>("/routes", {
      params,
    });
    return response.routes;
  }

  async getFavoriteRoutes(
    filter?: RouteFilter
  ): Promise<FavoriteRouteResponse[]> {
    const params: Record<string, string> = {};

    params.sortBy = "number";

    if (filter) {
      params.sortBy = filter.sortBy;

      if (filter.searchText) {
        params.searchText = filter.searchText;
      }

      if (filter.filterByNumber !== undefined) {
        params.filterByNumber = filter.filterByNumber.toString();
      }

      if (filter.filterByName !== undefined) {
        params.filterByName = filter.filterByName.toString();
      }
    }

    const response = await this.httpClient.get<GetFavoriteRoutesResponse>(
      "/routes/favorite",
      { params }
    );
    return response.favorites;
  }

  async addToFavorites(routeId: string): Promise<FavoriteRouteResponse> {
    return this.httpClient.post<FavoriteRouteResponse, { routeId: string }>(
      "/routes/favorite",
      { routeId }
    );
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    await this.httpClient.delete<void>(`/routes/favorite/${favoriteId}`, {
      acceptsEmptyResponse: true,
    });
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    await this.httpClient.put<void, { position: number }>(
      `/routes/favorite/${favoriteId}/position`,
      { position },
      { acceptsEmptyResponse: true }
    );
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    try {
      return await this.httpClient.get<Route>(`/routes/${routeId}`);
    } catch (error: unknown) {
      console.error(`Failed to get route details for ${routeId}:`, error);
      if (
        error instanceof Error &&
        error.message.includes("JSON Parse error")
      ) {
        console.error("Response might be invalid or empty");
      }
      throw error;
    }
  }
}
