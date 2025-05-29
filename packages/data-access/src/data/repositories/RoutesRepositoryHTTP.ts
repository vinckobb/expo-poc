import { QueryClient } from "@tanstack/react-query";
import {
  RoutesRepository,
  RouteFilter,
} from "../../domain/repositories/RoutesRepository";
import { Route } from "../../domain/entities/Route";
import { FavoriteRoute } from "../../domain/entities/FavoriteRoute";
import { RoutesAPI } from "../api/RoutesAPI";
import { RoutesMappers } from "../api/mappers/RoutesMappers";
import { RoutesQueryKeys } from "./RoutesQueryKeys";

export class RoutesRepositoryHTTP implements RoutesRepository {
  constructor(
    private api: RoutesAPI,
    private queryClient: QueryClient
  ) {}

  async getRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<Route[]> {
    const queryKey = RoutesQueryKeys.routes(filter);

    if (forcedReload) {
      this.queryClient.removeQueries({ queryKey });
    }

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        const response = await this.api.getRoutes(filter);
        return RoutesMappers.toDomainRoutes(response.routes);
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    });
  }

  async getFavoriteRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<FavoriteRoute[]> {
    const queryKey = RoutesQueryKeys.favorites(filter);

    if (forcedReload) {
      this.queryClient.removeQueries({ queryKey });
    }

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        const response = await this.api.getFavoriteRoutes(filter);
        return RoutesMappers.toDomainFavoriteRoutes(response.favorites);
      },
      staleTime: 2 * 60 * 1000, // 2 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
    });
  }

  async addToFavorites(routeId: string): Promise<FavoriteRoute> {
    const favorite = await this.api.addToFavorites(routeId);

    this.queryClient.invalidateQueries({
      queryKey: RoutesQueryKeys.allFavorites(),
    });

    return RoutesMappers.toDomainFavoriteRoute(favorite);
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    await this.api.removeFromFavorites(favoriteId);

    this.queryClient.invalidateQueries({
      queryKey: RoutesQueryKeys.allFavorites(),
    });
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    await this.api.updateFavoritePosition(favoriteId, position);

    this.queryClient.invalidateQueries({
      queryKey: RoutesQueryKeys.allFavorites(),
    });
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    return this.queryClient.fetchQuery({
      queryKey: RoutesQueryKeys.routeDetails(routeId),
      queryFn: async () => {
        const response = await this.api.getRouteDetails(routeId);
        return RoutesMappers.toDomainRoute(response);
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
    });
  }
}
