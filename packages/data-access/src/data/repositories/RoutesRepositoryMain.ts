import {
  RoutesRepository,
  RouteFilter,
} from "../../domain/repositories/RoutesRepository";
import { Route } from "../../domain/entities/Route";
import { FavoriteRoute } from "../../domain/entities/FavoriteRoute";
import { RoutesRepositoryHTTP } from "./RoutesRepositoryHTTP";
import { RoutesRepositoryLocal } from "./RoutesRepositoryLocal";
import { NetworkService } from "../../infrastructure/networking/NetworkService";
import { log } from "console";

export class RoutesRepositoryMain implements RoutesRepository {
  constructor(
    private httpRepo: RoutesRepositoryHTTP,
    private localRepo: RoutesRepositoryLocal,
    private networkService: NetworkService
  ) {}

  async getRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<Route[]> {
    if (await this.networkService.isConnected()) {
      try {
        const routes = await this.httpRepo.getRoutes(filter, forcedReload);

        await this.localRepo.saveRoutes(routes);
        return routes;
      } catch (error) {
        console.warn(
          "Failed to fetch routes from HTTP, falling back to local:",
          error
        );
        return this.localRepo.getRoutes(filter);
      }
    }

    return this.localRepo.getRoutes(filter);
  }

  async getFavoriteRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<FavoriteRoute[]> {
    if (await this.networkService.isConnected()) {
      try {
        return await this.httpRepo.getFavoriteRoutes(filter, forcedReload);
      } catch (error) {
        console.warn(
          "Failed to fetch favorites from HTTP, falling back to local:",
          error
        );
        return this.localRepo.getFavoriteRoutes(filter);
      }
    }

    return this.localRepo.getFavoriteRoutes(filter);
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    if (await this.networkService.isConnected()) {
      try {
        const route = await this.httpRepo.getRouteDetails(routeId);
        await this.localRepo.saveRouteDetails(routeId, route);
        return route;
      } catch (error) {
        console.warn(
          `Failed to fetch route details ${routeId} from HTTP, falling back to local:`,
          error
        );
        return this.localRepo.getRouteDetails(routeId);
      }
    }

    return this.localRepo.getRouteDetails(routeId);
  }

  async addToFavorites(routeId: string): Promise<FavoriteRoute> {
    if (await this.networkService.isConnected()) {
      try {
        const favorite = await this.httpRepo.addToFavorites(routeId);
        await this.localRepo.addToFavorites(routeId);
        return favorite;
      } catch (error) {
        console.warn(
          "Failed to add to favorites via HTTP, trying local only:",
          error
        );
        return this.localRepo.addToFavorites(routeId);
      }
    }

    return this.localRepo.addToFavorites(routeId);
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    if (await this.networkService.isConnected()) {
      try {
        await this.httpRepo.removeFromFavorites(favoriteId);
        await this.localRepo.removeFromFavorites(favoriteId);
      } catch (error) {
        console.warn(
          "Failed to remove from favorites via HTTP, trying local only:",
          error
        );
        await this.localRepo.removeFromFavorites(favoriteId);
      }
    } else {
      await this.localRepo.removeFromFavorites(favoriteId);
    }
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    if (await this.networkService.isConnected()) {
      try {
        await this.httpRepo.updateFavoritePosition(favoriteId, position);
        await this.localRepo.updateFavoritePosition(favoriteId, position);
      } catch (error) {
        console.warn(
          "Failed to update favorite position via HTTP, trying local only:",
          error
        );
        await this.localRepo.updateFavoritePosition(favoriteId, position);
      }
    } else {
      await this.localRepo.updateFavoritePosition(favoriteId, position);
    }
  }
}
