import { QueryClient } from "@tanstack/react-query";
import { Route, RouteFilter, FavoriteRouteResponse } from "./types";
import { RouteService } from "./RouteService";
import { RouteServiceImpl } from "./RouteServiceImpl";
import { createHttpClient } from "./ApiConfig";

export class QueryRouteServiceDecorator implements RouteService {
  private service: RouteService;
  private queryClient: QueryClient;

  constructor(service: RouteService, queryClient: QueryClient) {
    this.service = service;
    this.queryClient = queryClient;
  }

  async getRoutes(filter?: RouteFilter): Promise<Route[]> {
    return this.queryClient.fetchQuery({
      queryKey: ["routes", filter],
      queryFn: () => this.service.getRoutes(filter),
      staleTime: 10000,
    });
  }

  async getFavoriteRoutes(
    filter?: RouteFilter
  ): Promise<FavoriteRouteResponse[]> {
    return this.queryClient.fetchQuery({
      queryKey: ["favoriteRoutes", filter],
      queryFn: () => this.service.getFavoriteRoutes(filter),
      staleTime: 10000,
    });
  }

  async addToFavorites(routeId: string): Promise<FavoriteRouteResponse> {
    const result = await this.service.addToFavorites(routeId);

    await this.queryClient.invalidateQueries({
      queryKey: ["favoriteRoutes"],
    });

    return result;
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    await this.service.removeFromFavorites(favoriteId);

    await this.queryClient.invalidateQueries({
      queryKey: ["favoriteRoutes"],
    });
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    await this.service.updateFavoritePosition(favoriteId, position);

    await this.queryClient.invalidateQueries({
      queryKey: ["favoriteRoutes"],
    });
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    return this.queryClient.fetchQuery({
      queryKey: ["route", routeId],
      queryFn: () => this.service.getRouteDetails(routeId),
      staleTime: 60000,
    });
  }
}

export function createQueryRouteService(
  queryClient: QueryClient
): RouteService {
  const httpClient = createHttpClient();
  const baseService = new RouteServiceImpl(httpClient);
  return new QueryRouteServiceDecorator(baseService, queryClient);
}
