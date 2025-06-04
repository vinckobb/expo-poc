import { createStore, createEvent, createEffect, sample, combine } from "effector";
import { ViewModel } from "@monorepo/types";
import {
  RoutesService,
  RouteFilter,
  FavoriteRoute,
} from "@monorepo/data-access";

export type Action = { type: "routeSelected"; routeId: string };

export type Params = undefined;

export class FavoriteRoutesViewModel implements ViewModel {
  events = {
    mounted: createEvent(),
    unmounted: createEvent(),
    focused: createEvent(),
    searchChanged: createEvent<string>(),
    sortChanged: createEvent<"number" | "name" | "custom">(),
    routeSelected: createEvent<string>(),
    removeFavorite: createEvent<string>(),
    updatePosition: createEvent<{ favoriteId: string; position: number }>(),
    retry: createEvent(),
    refreshed: createEvent(),
  };

  private effects = {
    fetchRoutes: createEffect<RouteFilter, FavoriteRoute[], Error>(),
    fetchRoutesForced: createEffect<RouteFilter, FavoriteRoute[], Error>(),
    removeFromFavorites: createEffect<string, void, Error>(),
    updateFavoritePosition: createEffect<
      { favoriteId: string; position: number },
      void,
      Error
    >(),
  };

  $routes = createStore<FavoriteRoute[]>([]);
  $isLoading = createStore(false);
  $showLoader = combine(
    [this.$isLoading, this.$routes],
    ([isLoading, routes]) => isLoading && routes.length === 0
  );
  $error = createStore<string | null>(null);
  $filter = createStore<RouteFilter>({
    sortBy: "custom",
    filterByName: true,
    filterByNumber: true,
    searchText: "",
  });

  constructor(
    private routeService: RoutesService,
    private onAction: ((action: Action) => void) | undefined
  ) {
    this.initializeEffects();
    this.initializeStores();
    this.initializeEvents();
  }

  private initializeEffects() {
    this.effects.fetchRoutes.use((filter) =>
      this.routeService.getFavoriteRoutes(filter)
    );

    this.effects.fetchRoutesForced.use((filter) =>
      this.routeService.getFavoriteRoutes(filter, true)
    );

    this.effects.removeFromFavorites.use((favoriteId) =>
      this.routeService.removeFromFavorites(favoriteId)
    );

    this.effects.updateFavoritePosition.use(({ favoriteId, position }) =>
      this.routeService.updateFavoritePosition(favoriteId, position)
    );
  }

  private initializeStores() {
    this.$routes
      .on(this.effects.fetchRoutes.doneData, (_, routes) => routes)
      .on(this.effects.fetchRoutesForced.doneData, (_, routes) => routes);

    this.$isLoading
      .on(this.effects.fetchRoutes.pending, (_, isPending) => isPending)
      .on(this.effects.fetchRoutesForced.pending, (_, isPending) => isPending);

    this.$error
      .on(this.effects.fetchRoutes.failData, (_, error) => error.message)
      .on(this.effects.fetchRoutesForced.failData, (_, error) => error.message)
      .reset([
        this.effects.fetchRoutes.done,
        this.effects.fetchRoutesForced.done,
      ]);

    this.$filter
      .on(this.events.searchChanged, (state, searchText) => ({
        ...state,
        searchText,
      }))
      .on(this.events.sortChanged, (state, sortBy) => ({
        ...state,
        sortBy,
      }));
  }

  private initializeEvents() {
    sample({
      source: this.$filter,
      clock: this.events.mounted,
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: this.events.focused,
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: this.events.searchChanged,
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: this.events.sortChanged,
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: this.events.refreshed,
      target: this.effects.fetchRoutesForced,
    });

    sample({
      source: this.$filter,
      clock: this.events.retry,
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: [
        this.effects.removeFromFavorites.done,
        this.effects.updateFavoritePosition.done,
      ],
      target: this.effects.fetchRoutes,
    });

    this.events.removeFavorite.watch((favoriteId) => {
      this.effects.removeFromFavorites(favoriteId);
    });

    this.events.updatePosition.watch((params) => {
      this.effects.updateFavoritePosition(params);
    });

    this.events.routeSelected.watch((routeId) => {
      this.onAction?.({ type: "routeSelected", routeId });
    });
  }

  dispose(): void {
    console.log("❌ FavoriteRoutesViewModel dispose");
    this.events.unmounted();
    this.onAction = undefined;
  }
}

export function createFavoriteRoutesViewModel(
  routeService: RoutesService,
  onAction: (action: Action) => void
): FavoriteRoutesViewModel {
  return new FavoriteRoutesViewModel(routeService, onAction);
}
