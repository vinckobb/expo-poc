import { FavoriteRouteResponse, Route } from "./types";
import {
  getFavoriteRoutesWithInfo,
  addToFavorites,
  removeFromFavorites,
  changeFavoritePosition,
  getRouteById as getRouteByIdService,
  getAllRoutes as getAllRoutesService,
} from "./data-service";

export const getAllRoutes = (
  sortBy: "number" | "name" | "custom" = "name",
  searchText: string = "",
  filterByNumber: boolean = false,
  filterByName: boolean = false
): Route[] => {
  let routes = getAllRoutesService();

  if (searchText) {
    routes = routes.filter((route) => {
      if (filterByNumber && !filterByName) {
        return route.number.toLowerCase().includes(searchText.toLowerCase());
      } else if (!filterByNumber && filterByName) {
        return route.name.toLowerCase().includes(searchText.toLowerCase());
      } else {
        return (
          route.number.toLowerCase().includes(searchText.toLowerCase()) ||
          route.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    });
  }

  switch (sortBy) {
    case "number":
      return routes.sort((a, b) =>
        a.number.localeCompare(b.number, undefined, {
          numeric: true,
        })
      );
    case "name":
      return routes.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return routes;
  }
};

export const getFavoriteRoutes = (
  sortBy: "number" | "name" | "custom",
  searchText?: string,
  filterByNumber?: boolean,
  filterByName?: boolean
): FavoriteRouteResponse[] => {
  let favorites = getFavoriteRoutesWithInfo();

  if (searchText) {
    favorites = favorites.filter((favorite) => {
      const route = favorite.route;
      if (filterByNumber && !filterByName) {
        return route.number.toLowerCase().includes(searchText.toLowerCase());
      } else if (!filterByNumber && filterByName) {
        return route.name.toLowerCase().includes(searchText.toLowerCase());
      } else {
        return (
          route.number.toLowerCase().includes(searchText.toLowerCase()) ||
          route.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    });
  }

  switch (sortBy) {
    case "number":
      return favorites.sort((a, b) =>
        a.route.number.localeCompare(b.route.number, undefined, {
          numeric: true,
        })
      );
    case "name":
      return favorites.sort((a, b) => a.route.name.localeCompare(b.route.name));
    case "custom":
      return favorites.sort((a, b) => a.position - b.position);
    default:
      return favorites;
  }
};

export const addToFavorite = (
  routeId: string
): FavoriteRouteResponse | null => {
  return addToFavorites(routeId);
};

export const removeFromFavorite = (favoriteId: string): boolean => {
  return removeFromFavorites(favoriteId);
};

export const getRouteById = (routeId: string): FavoriteRouteResponse | null => {
  const route = getRouteByIdService(routeId);
  if (!route) {
    return null;
  }

  return {
    id: "",
    routeId: route.id,
    position: 0,
    route: route,
  };
};

export const changePosition = (
  favoriteId: string,
  position: number
): boolean => {
  return changeFavoritePosition(favoriteId, position);
};
