import { Route, RouteFilter, FavoriteRouteResponse } from "./types";

export interface RouteService {
  getRoutes(filter?: RouteFilter): Promise<Route[]>;
  getFavoriteRoutes(filter?: RouteFilter): Promise<FavoriteRouteResponse[]>;
  addToFavorites(routeId: string): Promise<FavoriteRouteResponse>;
  removeFromFavorites(favoriteId: string): Promise<void>;
  updateFavoritePosition(favoriteId: string, position: number): Promise<void>;
  getRouteDetails(routeId: string): Promise<Route>;
}
