// Domain exports
export type { Route } from "./domain/entities/Route";
export type { Stop } from "./domain/entities/Stop";
export type { FavoriteRoute } from "./domain/entities/FavoriteRoute";
export type { RoutesService } from "./domain/services/RoutesService";
export type {
  RoutesRepository,
  RouteFilter,
} from "./domain/repositories/RoutesRepository";

// Infrastructure exports
export type {
  HttpClient,
  RequestConfig,
} from "./infrastructure/networking/HttpClient";
export { FetchHttpClient } from "./infrastructure/networking/HttpClient";
export type { NetworkService } from "./infrastructure/networking/NetworkService";
export { NetworkServiceImpl } from "./infrastructure/networking/NetworkService";
export type { LocalStorage } from "./infrastructure/storage/LocalStorage";
export { AsyncLocalStorage } from "./infrastructure/storage/LocalStorage";

// Factory
export { DataLayerFactory } from "./infrastructure/di/DataLayerFactory";
export type { DataLayerConfig } from "./infrastructure/di/DataLayerFactory";

// Query keys for external usage
export {
  ROUTES_QUERY_KEY,
  FAVORITES_QUERY_KEY,
  ROUTE_DETAILS_QUERY_KEY,
} from "./data/repositories/RoutesQueryKeys";

export { createbaseUrl } from "./CreateBaseUrl";
