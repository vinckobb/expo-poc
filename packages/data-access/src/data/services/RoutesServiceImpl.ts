import { RoutesService } from "../../domain/services/RoutesService";
import { Route } from "../../domain/entities/Route";
import { FavoriteRoute } from "../../domain/entities/FavoriteRoute";
import { RouteFilter } from "../../domain/repositories/RoutesRepository";
import { RoutesRepositoryMain } from "../repositories/RoutesRepositoryMain";

export class RoutesServiceImpl implements RoutesService {
  constructor(private repository: RoutesRepositoryMain) {}

  async searchRoutes(query: string): Promise<Route[]> {
    return this.repository.getRoutes({
      searchText: query,
      filterByName: true,
      filterByNumber: true,
    });
  }

  async getRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<Route[]> {
    return this.repository.getRoutes(filter, forcedReload);
  }

  async getFavoriteRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<FavoriteRoute[]> {
    return this.repository.getFavoriteRoutes(filter, forcedReload);
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    return this.repository.getRouteDetails(routeId);
  }

  async addToFavorites(routeId: string): Promise<FavoriteRoute> {
    return this.repository.addToFavorites(routeId);
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    return this.repository.removeFromFavorites(favoriteId);
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    return this.repository.updateFavoritePosition(favoriteId, position);
  }
}
