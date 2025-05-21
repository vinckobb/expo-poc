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

export interface RouteFilter {
  searchText?: string;
  filterByNumber?: boolean;
  filterByName?: boolean;
  sortBy: "number" | "name" | "custom";
}

export interface AddFavoriteRequest {
  routeId: string;
}

export interface ChangePositionRequest {
  position: number;
}

export interface GetRoutesResponse {
  routes: Route[];
}

export interface GetFavoriteRoutesResponse {
  favorites: FavoriteRouteResponse[];
}

export interface GetFavoriteRoutesQueryParams {
  sortBy?: "number" | "name" | "custom";
  searchText?: string;
  filterByNumber?: string;
  filterByName?: string;
}
