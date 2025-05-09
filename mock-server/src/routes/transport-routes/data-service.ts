import path from "path";
import { Route, Favorite, FavoriteRouteResponse } from "./types";
import { readJsonFile, writeJsonFile } from "../../utils/file-utils";
import { v4 as uuidv4 } from "uuid";

const routesFilePath = path.join(__dirname, "./data/routes.json");
const favoriteRoutesFilePath = path.join(
  __dirname,
  "./data/favorite-routes.json"
);

// Read functions
export const readRoutes = (): Route[] => {
  return readJsonFile<Route[]>(routesFilePath, []);
};

export const readFavorites = (): Favorite[] => {
  return readJsonFile<Favorite[]>(favoriteRoutesFilePath, []);
};

// Write functions
export const writeFavorites = (favorites: Favorite[]): boolean => {
  return writeJsonFile<Favorite[]>(favoriteRoutesFilePath, favorites);
};

// Get all routes
export const getAllRoutes = (): Route[] => {
  return readRoutes();
};

// Get route by ID
export const getRouteById = (routeId: string): Route | null => {
  const routes = readRoutes();
  return routes.find((r) => r.id === routeId) || null;
};

// Check if route is favorite
export const isRouteFavorite = (routeId: string): boolean => {
  const favorites = readFavorites();
  return favorites.some((f) => f.routeId === routeId);
};

// Get favorite by routeId
export const getFavoriteByRouteId = (routeId: string): Favorite | null => {
  const favorites = readFavorites();
  return favorites.find((f) => f.routeId === routeId) || null;
};

// Map favorites to FavoriteRouteDTO objects
export const mapFavoritesToDTO = (
  favorites: Favorite[]
): FavoriteRouteResponse[] => {
  const routes = readRoutes();

  return favorites
    .map((favorite) => {
      const route = routes.find((r) => r.id === favorite.routeId);

      if (!route) {
        return null;
      }

      return {
        id: favorite.id,
        routeId: favorite.routeId,
        position: favorite.position,
        route: route,
      };
    })
    .filter((dto): dto is FavoriteRouteResponse => dto !== null);
};

// Get all favorite routes with detailed info
export const getFavoriteRoutesWithInfo = (): FavoriteRouteResponse[] => {
  const favorites = readFavorites();
  return mapFavoritesToDTO(favorites);
};

// Add route to favorites
export const addToFavorites = (
  routeId: string
): FavoriteRouteResponse | null => {
  const routes = readRoutes();
  const favorites = readFavorites();

  // Check if route exists
  const route = routes.find((r) => r.id === routeId);
  if (!route) {
    return null;
  }

  // Check if already favorite
  if (!favorites.some((f) => f.routeId === routeId)) {
    const newFavorite: Favorite = {
      id: uuidv4(),
      routeId: routeId,
      position: favorites.length + 1,
    };

    favorites.push(newFavorite);
    writeFavorites(favorites);

    return {
      id: newFavorite.id,
      routeId: newFavorite.routeId,
      position: newFavorite.position,
      route: route,
    };
  }

  // Route was already a favorite
  const existingFavorite = favorites.find((f) => f.routeId === routeId);

  if (!existingFavorite) {
    return null;
  }

  return {
    id: existingFavorite.id,
    routeId: existingFavorite.routeId,
    position: existingFavorite.position,
    route: route,
  };
};

// Remove favorite by id
export const removeFromFavorites = (favoriteId: string): boolean => {
  const favorites = readFavorites();
  const initialLength = favorites.length;

  // Find the position of the favorite to be removed
  const favoriteToRemove = favorites.find((f) => f.id === favoriteId);
  if (!favoriteToRemove) {
    return false;
  }

  const removedPosition = favoriteToRemove.position;
  const updatedFavorites = favorites.filter((f) => f.id !== favoriteId);

  if (updatedFavorites.length !== initialLength) {
    // Adjust positions to ensure no gaps
    updatedFavorites.forEach((favorite) => {
      if (favorite.position > removedPosition) {
        favorite.position--;
      }
    });

    // Sort by position for consistent ordering
    updatedFavorites.sort((a, b) => a.position - b.position);

    writeFavorites(updatedFavorites);
    return true;
  }

  return false;
};

// Change favorite position
export const changeFavoritePosition = (
  favoriteId: string,
  position: number
): boolean => {
  const favorites = readFavorites();
  const favoriteIndex = favorites.findIndex((f) => f.id === favoriteId);

  if (favoriteIndex === -1) {
    return false;
  }

  // Ensure position is within bounds
  const newPosition = Math.max(1, Math.min(favorites.length, position));

  // Store the current position of the favorite
  const currentPosition = favorites[favoriteIndex].position;

  // Update positions of other favorites based on the direction of movement
  if (currentPosition < newPosition) {
    // Moving down: decrement positions of items between currentPosition and newPosition
    favorites.forEach((favorite) => {
      if (
        favorite.position > currentPosition &&
        favorite.position <= newPosition
      ) {
        favorite.position--;
      }
    });
  } else if (currentPosition > newPosition) {
    // Moving up: increment positions of items between newPosition and currentPosition
    favorites.forEach((favorite) => {
      if (
        favorite.position >= newPosition &&
        favorite.position < currentPosition
      ) {
        favorite.position++;
      }
    });
  }

  // Set the new position for the selected favorite
  favorites[favoriteIndex].position = newPosition;

  // Sort by position for reliable ordering
  favorites.sort((a, b) => a.position - b.position);

  // Normalize positions to ensure sequential numbering (1, 2, 3, ...) without gaps
  favorites.forEach((favorite, index) => {
    favorite.position = index + 1;
  });

  writeFavorites(favorites);
  return true;
};
