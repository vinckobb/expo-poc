import { Route } from "../entities/Route";
import { FavoriteRoute } from "../entities/FavoriteRoute";

export interface RouteFilter {
  sortBy?: "number" | "name" | "custom";
  filterByName?: boolean;
  filterByNumber?: boolean;
  searchText?: string;
}

export interface RoutesRepository {
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
