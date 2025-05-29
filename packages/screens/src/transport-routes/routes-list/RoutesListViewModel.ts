import { createStore, createEvent, createEffect, sample, combine } from "effector";
import { ViewModel } from "@monorepo/types";
import { Route, RouteFilter, RoutesService } from "@monorepo/data-access";

export type Action =
  | { type: "routeSelected"; routeId: string }
  | { type: "openFavorites" };

export type Params = undefined;

export class RoutesListViewModel implements ViewModel {
  events = {
    mounted: createEvent(),
    unmounted: createEvent(),
    focused: createEvent(),
    loadRoutes: createEvent(),
    refreshed: createEvent(),
    searchChanged: createEvent<string>(),
    sortChanged: createEvent<"number" | "name" | "custom">(),
    selectRoute: createEvent<string>(),
    openFavorites: createEvent(),
    retry: createEvent(),
  };

  private effects = {
    fetchRoutes: createEffect<RouteFilter, Route[], Error>(),
    fetchRoutesForced: createEffect<RouteFilter, Route[], Error>(),
  };

  $routes = createStore<Route[]>([]);
  $isLoading = createStore<boolean>(false);
    $showLoader = combine(
      [this.$isLoading, this.$routes],
      ([isLoading, routes]) => isLoading && routes.length === 0
    );
  $error = createStore<string | null>(null);
  $filter = createStore<RouteFilter>({
    sortBy: "number",
    filterByName: true,
    filterByNumber: true,
    searchText: "",
  });

  private onAction: ((action: Action) => void) | undefined;
  private routeService: RoutesService;

  constructor(
    params: Params,
    onAction: (action: Action) => void,
    routeService: RoutesService
  ) {
    console.log("✳️ create RoutesListViewModel");

    this.onAction = onAction;
    this.routeService = routeService;

    this.initializeEffects();
    this.initializeStores();
    this.initializeEvents();
  }

  private initializeEffects() {
    this.effects.fetchRoutes.use((filter) =>
      this.routeService.getRoutes(filter)
    );

    this.effects.fetchRoutesForced.use((filter) =>
      this.routeService.getRoutes(filter, true)
    );
  }

  private initializeStores() {
    this.$routes
      .on(this.effects.fetchRoutes.doneData, (_, routes) => routes)
      .on(this.effects.fetchRoutesForced.doneData, (_, routes) => routes)
      .reset(this.events.unmounted);

    this.$isLoading
      .on(this.effects.fetchRoutes.pending, (_, isPending) => isPending)
      .on(this.effects.fetchRoutesForced.pending, (_, isPending) => isPending)
      .reset(this.events.unmounted);

    this.$error
      .on(this.effects.fetchRoutes.failData, (_, error) => error.message)
      .on(this.effects.fetchRoutesForced.failData, (_, error) => error.message)
      .reset([
        this.effects.fetchRoutes.done,
        this.effects.fetchRoutesForced.done,
        this.events.unmounted,
      ]);

    this.$filter
      .on(this.events.searchChanged, (state, searchText) => ({
        ...state,
        searchText,
      }))
      .on(this.events.sortChanged, (state, sortBy) => ({
        ...state,
        sortBy,
      }))
      .reset(this.events.unmounted);
  }

  private initializeEvents() {
    sample({
      source: this.$filter,
      clock: [
        this.events.mounted,
        this.events.loadRoutes,
        this.events.retry,
        this.events.searchChanged,
        this.events.sortChanged,
      ],
      target: this.effects.fetchRoutes,
    });

    sample({
      source: this.$filter,
      clock: this.events.refreshed,
      target: this.effects.fetchRoutesForced,
    });

    this.events.selectRoute.watch((routeId) => {
      this.onAction?.({ type: "routeSelected", routeId });
    });

    this.events.openFavorites.watch(() => {
      this.onAction?.({ type: "openFavorites" });
    });
  }

  dispose(): void {
    console.log("❌  dispose RoutesListViewModel");
    this.events.unmounted();
    this.onAction = undefined;
  }
}

export function createRoutesViewModel(
  params: Params,
  onAction: (action: Action) => void,
  routeService: RoutesService
): RoutesListViewModel {
  return new RoutesListViewModel(params, onAction, routeService);
}
