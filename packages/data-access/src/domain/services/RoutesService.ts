import { RouteFilter } from "../repositories/RoutesRepository";
import { Route } from "../entities/Route";
import { FavoriteRoute } from "../entities/FavoriteRoute";

export interface RoutesService {
  searchRoutes(query: string): Promise<Route[]>;
  getRoutes(filter?: RouteFilter, forcedReload?: boolean): Promise<Route[]>;
  getFavoriteRoutes(
    filter?: RouteFilter,
    forcedReload?: boolean
  ): Promise<FavoriteRoute[]>;
  addToFavorites(routeId: string): Promise<FavoriteRoute>;
  removeFromFavorites(favoriteId: string): Promise<void>;
  updateFavoritePosition(favoriteId: string, position: number): Promise<void>;
  getRouteDetails(routeId: string): Promise<Route>;
}
