import { RoutesRepository, RouteFilter } from '../../domain/repositories/RoutesRepository';
import { Route } from '../../domain/entities/Route';
import { FavoriteRoute } from '../../domain/entities/FavoriteRoute';
import { LocalStorage } from '../../infrastructure/storage/LocalStorage';

export class RoutesRepositoryLocal implements RoutesRepository {
  private static readonly ROUTES_KEY = 'routes';
  private static readonly FAVORITES_KEY = 'favorites';
  private static readonly ROUTE_DETAILS_KEY = 'route_details';

  constructor(private localStorage: LocalStorage) {}

  async getRoutes(filter?: RouteFilter): Promise<Route[]> {
    const routes = await this.localStorage.getItem<Route[]>(RoutesRepositoryLocal.ROUTES_KEY) || [];
    return this.applyFilter(routes, filter);
  }

  async getFavoriteRoutes(filter?: RouteFilter): Promise<FavoriteRoute[]> {
    const favorites = await this.localStorage.getItem<FavoriteRoute[]>(RoutesRepositoryLocal.FAVORITES_KEY) || [];
    return this.applyFavoriteFilter(favorites, filter);
  }

  async getRouteDetails(routeId: string): Promise<Route> {
    const details = await this.localStorage.getItem<Record<string, Route>>(RoutesRepositoryLocal.ROUTE_DETAILS_KEY) || {};
    const route = details[routeId];
    
    if (!route) {
      throw new Error(`Route details not found: ${routeId}`);
    }
    
    return route;
  }

  async addToFavorites(routeId: string): Promise<FavoriteRoute> {
    const favorites = await this.getFavoriteRoutes();
    const newFavorite: FavoriteRoute = {
      id: `fav_${Date.now()}_${routeId}`,
      routeId,
      position: favorites.length,
      addedAt: new Date(),
    };
    
    await this.localStorage.setItem(RoutesRepositoryLocal.FAVORITES_KEY, [...favorites, newFavorite]);
    return newFavorite;
  }

  async removeFromFavorites(favoriteId: string): Promise<void> {
    const favorites = await this.getFavoriteRoutes();
    const updated = favorites.filter(fav => fav.id !== favoriteId);
    await this.localStorage.setItem(RoutesRepositoryLocal.FAVORITES_KEY, updated);
  }

  async updateFavoritePosition(favoriteId: string, position: number): Promise<void> {
    const favorites = await this.getFavoriteRoutes();
    const updated = favorites.map(fav => fav.id === favoriteId ? { ...fav, position } : fav);
    await this.localStorage.setItem(RoutesRepositoryLocal.FAVORITES_KEY, updated);
  }

  async saveRoutes(routes: Route[]): Promise<void> {
    await this.localStorage.setItem(RoutesRepositoryLocal.ROUTES_KEY, routes);
  }

  async saveRouteDetails(routeId: string, route: Route): Promise<void> {
    const existing = await this.localStorage.getItem<Record<string, Route>>(RoutesRepositoryLocal.ROUTE_DETAILS_KEY) || {};
    existing[routeId] = route;
    await this.localStorage.setItem(RoutesRepositoryLocal.ROUTE_DETAILS_KEY, existing);
  }

  async clearCache(): Promise<void> {
    await Promise.all([
      this.localStorage.removeItem(RoutesRepositoryLocal.ROUTES_KEY),
      this.localStorage.removeItem(RoutesRepositoryLocal.FAVORITES_KEY),
      this.localStorage.removeItem(RoutesRepositoryLocal.ROUTE_DETAILS_KEY),
    ]);
  }

  private applyFilter(routes: Route[], filter?: RouteFilter): Route[] {
    if (!filter) return routes;

    let result = routes;

    if (filter.searchText) {
      const search = filter.searchText.toLowerCase();
      result = result.filter(route => {
        const matchName = filter.filterByName && route.name.toLowerCase().includes(search);
        const matchNumber = filter.filterByNumber && route.number.toLowerCase().includes(search);
        return matchName || matchNumber;
      });
    }

    if (filter.sortBy) {
      result = result.sort((a, b) => {
        switch (filter.sortBy) {
          case 'name': return a.name.localeCompare(b.name);
          case 'number': return a.number.localeCompare(b.number);
          default: return 0;
        }
      });
    }

    return result;
  }

  private applyFavoriteFilter(favorites: FavoriteRoute[], filter?: RouteFilter): FavoriteRoute[] {
    if (filter?.sortBy === 'custom') {
      return favorites.sort((a, b) => a.position - b.position);
    }
    return favorites;
  }
}