// ====================================
// External interfaces (for client)
// ====================================

// Common data models
export interface Route {
  id: string;
  number: string;
  name: string;
  startPoint: string;
  endPoint: string;
  color: string;
}

export interface FavoriteRouteResponse {
  id: string;
  routeId: string;
  position: number;
  route: Route;
}

// Requests
export interface AddFavoriteRequest {
  routeId: string;
}

export interface ChangePositionRequest {
  position: number;
}

// Responses
export interface GetRoutesResponse {
  routes: Route[];
}

export interface GetFavoriteRoutesResponse {
  favorites: FavoriteRouteResponse[];
}

export interface GetRouteResponse extends FavoriteRouteResponse {}

export interface AddFavoriteResponse extends FavoriteRouteResponse {}

export interface ErrorResponse {
  error: string;
}

// ====================================
// Internal interfaces (for server)
// ====================================

export interface Favorite {
  id: string;
  routeId: string;
  position: number;
}

// Query parameters for routes
export interface RouteQueryParams {
  sortBy?: "number" | "name" | "custom";
  searchText?: string;
  filterByNumber?: string; // "true" | "false" as a string for query params
  filterByName?: string; // "true" | "false" as a string for query params
}
