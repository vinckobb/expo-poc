import { RouteFilter } from "data-access/src/domain/repositories/RoutesRepository";

export const ROUTES_QUERY_KEY = "routes";
export const FAVORITES_QUERY_KEY = "favorites";
export const ROUTE_DETAILS_QUERY_KEY = "route-details";

export const RoutesQueryKeys = {
  routes: (filter?: RouteFilter) =>
    [
      ROUTES_QUERY_KEY,
      filter?.sortBy,
      filter?.filterByName,
      filter?.filterByNumber,
      filter?.searchText,
    ] as const,
  favorites: (filter?: RouteFilter) =>
    [
      FAVORITES_QUERY_KEY,
      filter?.sortBy,
      filter?.filterByName,
      filter?.filterByNumber,
      filter?.searchText,
    ] as const,
  routeDetails: (routeId: string) =>
    [ROUTE_DETAILS_QUERY_KEY, routeId] as const,

  // Helpers for invalidation
  allFavorites: () => [FAVORITES_QUERY_KEY] as const,
  allRoutes: () => [ROUTES_QUERY_KEY] as const,
} as const;

export type RoutesQueryKey =
  | ReturnType<typeof RoutesQueryKeys.routes>
  | ReturnType<typeof RoutesQueryKeys.favorites>
  | ReturnType<typeof RoutesQueryKeys.routeDetails>;
