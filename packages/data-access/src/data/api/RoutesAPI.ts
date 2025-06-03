import { HttpClient } from "@monorepo/infrastructure/networking";
import { RouteFilter } from "../../domain/repositories/RoutesRepository";
import {
  RouteSchema,
  GetRoutesResponseSchema,
  GetFavoriteRoutesResponseSchema,
  FavoriteRouteResponseSchema,
  AddFavoriteRequestSchema,
  ChangePositionRequestSchema,
  type RouteDTO,
  type GetRoutesResponseDTO,
  type GetFavoriteRoutesResponseDTO,
  type FavoriteRouteResponseDTO,
  type AddFavoriteRequestDTO,
  type ChangePositionRequestDTO,
} from "./schemas/RoutesSchemas";

export class RoutesAPI {
  constructor(
    private httpClient: HttpClient,
    private baseUrl: string
  ) {}

  async getRoutes(filter?: RouteFilter): Promise<GetRoutesResponseDTO> {
    const url = this.buildUrl("/routes");
    const params = this.buildRouteParams(filter);

    const response = await this.httpClient.get<unknown>(url, { params });
    return GetRoutesResponseSchema.parse(response);
  }

  async getFavoriteRoutes(
    filter?: RouteFilter
  ): Promise<GetFavoriteRoutesResponseDTO> {
    const url = this.buildUrl("/routes/favorite");
    const params = this.buildRouteParams(filter);

    const response = await this.httpClient.get<unknown>(url, { params });
    return GetFavoriteRoutesResponseSchema.parse(response);
  }

  async addToFavorites(routeId: string): Promise<FavoriteRouteResponseDTO> {
    const body: AddFavoriteRequestDTO = { routeId };
    AddFavoriteRequestSchema.parse(body);
    const url = this.buildUrl("/routes/favorite");

    const response = await this.httpClient.post<unknown>(url, body);
    return FavoriteRouteResponseSchema.parse(response);
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    const url = this.buildUrl(`/routes/favorite/${favoriteId}`);
    await this.httpClient.delete<void>(url, { acceptsEmptyResponse: true });
  }

  async updateFavoritePosition(
    favoriteId: string,
    position: number
  ): Promise<void> {
    const body: ChangePositionRequestDTO = { position };
    ChangePositionRequestSchema.parse(body);
    const url = this.buildUrl(`/routes/favorite/${favoriteId}/position`);

    await this.httpClient.put<void>(url, body);
  }

  async getRouteDetails(routeId: string): Promise<RouteDTO> {
    const url = this.buildUrl(`/routes/${routeId}`);

    const response = await this.httpClient.get<unknown>(url);
    return RouteSchema.parse(response);
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private buildRouteParams(
    filter?: RouteFilter
  ): Record<string, string | number | boolean> | undefined {
    if (!filter) return undefined;

    const params: Record<string, string | number | boolean> = {};

    if (filter.sortBy) {
      params.sortBy = filter.sortBy;
    }
    if (filter.searchText) {
      params.searchText = filter.searchText;
    }
    if (filter.filterByName !== undefined) {
      params.filterByName = filter.filterByName;
    }
    if (filter.filterByNumber !== undefined) {
      params.filterByNumber = filter.filterByNumber;
    }

    return Object.keys(params).length > 0 ? params : undefined;
  }
}
