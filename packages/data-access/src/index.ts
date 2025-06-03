// Domain exports
export type { Route } from "./domain/entities/Route";
export type { Stop } from "./domain/entities/Stop";
export type { FavoriteRoute } from "./domain/entities/FavoriteRoute";
export type { RoutesService } from "./domain/services/RoutesService";
export type {
  RoutesRepository,
  RouteFilter,
} from "./domain/repositories/RoutesRepository";

// Factory
export { type DataLayerConfig, DataLayerFactory } from "./DataLayerFactory";

// Query keys for external usage
export {
  ROUTES_QUERY_KEY,
  FAVORITES_QUERY_KEY,
  ROUTE_DETAILS_QUERY_KEY,
} from "./data/repositories/RoutesQueryKeys";

export { createbaseUrl } from "./CreateBaseUrl";
