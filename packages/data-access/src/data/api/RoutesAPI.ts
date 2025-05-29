import { HttpClient } from "../../infrastructure/networking/HttpClient";
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
    const params = this.buildRouteParams(filter);
    const queryString = params.length > 0 ? `?${params.join("&")}` : "";
    const url = this.buildUrl(`/routes${queryString}`);

    const response = await this.httpClient.get<unknown>(url);
    return GetRoutesResponseSchema.parse(response);
  }

  async getFavoriteRoutes(
    filter?: RouteFilter
  ): Promise<GetFavoriteRoutesResponseDTO> {
    const params = this.buildRouteParams(filter);
    const queryString = params.length > 0 ? `?${params.join("&")}` : "";
    const url = this.buildUrl(`/routes/favorite${queryString}`);

    const response = await this.httpClient.get<unknown>(url);
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

  private buildRouteParams(filter?: RouteFilter): string[] {
    if (!filter) return [];

    const params: string[] = [];

    if (filter.sortBy) {
      params.push(`sortBy=${encodeURIComponent(filter.sortBy)}`);
    }
    if (filter.searchText) {
      params.push(`searchText=${encodeURIComponent(filter.searchText)}`);
    }
    if (filter.filterByName !== undefined) {
      params.push(`filterByName=${filter.filterByName}`);
    }
    if (filter.filterByNumber !== undefined) {
      params.push(`filterByNumber=${filter.filterByNumber}`);
    }

    return params;
  }
}
