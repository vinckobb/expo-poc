import { Route } from "../../../domain/entities/Route";
import { FavoriteRoute } from "../../../domain/entities/FavoriteRoute";
import type {
  RouteDTO,
  FavoriteRouteResponseDTO,
} from "../schemas/RoutesSchemas";

export class RoutesMappers {
  static toDomainRoute(dto: RouteDTO): Route {
    return {
      id: dto.id,
      number: dto.number,
      name: dto.name,
      startPoint: dto.startPoint,
      endPoint: dto.endPoint,
      color: dto.color,
    };
  }

  static toDomainFavoriteRoute(dto: FavoriteRouteResponseDTO): FavoriteRoute {
    return {
      id: dto.id,
      routeId: dto.routeId,
      position: dto.position,
      route: RoutesMappers.toDomainRoute(dto.route),
    };
  }

  static toDomainRoutes(dtos: RouteDTO[]): Route[] {
    return dtos.map(RoutesMappers.toDomainRoute);
  }

  static toDomainFavoriteRoutes(
    dtos: FavoriteRouteResponseDTO[]
  ): FavoriteRoute[] {
    return dtos.map(RoutesMappers.toDomainFavoriteRoute);
  }
}
