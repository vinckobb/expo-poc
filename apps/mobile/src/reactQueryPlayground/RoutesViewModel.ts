import { createStore, createEvent, createEffect, sample } from "effector";
import { ViewModel } from "../navigation/types/ViewModel";
import { Route, RouteFilter } from "./types";
import { RouteService } from "./RouteService";

export type Action =
  | { type: "routeSelected"; routeId: string }
  | { type: "openFavorites" };

export type Params = undefined;

export class RoutesViewModel implements ViewModel {
  events = {
    mounted: createEvent(),
    unmounted: createEvent(),
    loadRoutes: createEvent(),
    searchChanged: createEvent<string>(),
    sortChanged: createEvent<"number" | "name" | "custom">(),
    selectRoute: createEvent<string>(),
    openFavorites: createEvent(),
    retry: createEvent(),
  };

  private effects = {
    fetchRoutes: createEffect<RouteFilter, Route[], Error>(),
  };

  $routes = createStore<Route[]>([]);
  $isLoading = createStore<boolean>(false);
  $error = createStore<string | null>(null);
  $filter = createStore<RouteFilter>({
    sortBy: "number",
    filterByName: true,
    filterByNumber: true,
    searchText: "",
  });

  private onAction: ((action: Action) => void) | undefined;
  private routeService: RouteService;

  constructor(
    params: Params,
    onAction: (action: Action) => void,
    routeService: RouteService
  ) {
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
  }

  private initializeStores() {
    this.$routes
      .on(this.effects.fetchRoutes.doneData, (_, routes) => routes)
      .reset(this.events.unmounted);

    this.$isLoading
      .on(this.effects.fetchRoutes.pending, (_, isPending) => isPending)
      .reset(this.events.unmounted);

    this.$error
      .on(this.effects.fetchRoutes.failData, (_, error) => error.message)
      .reset([this.effects.fetchRoutes.done, this.events.unmounted]);

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

    this.events.selectRoute.watch((routeId) => {
      this.onAction?.({ type: "routeSelected", routeId });
    });

    this.events.openFavorites.watch(() => {
      this.onAction?.({ type: "openFavorites" });
    });
  }

  dispose(): void {
    this.events.unmounted();
    this.onAction = undefined;
  }
}

export function createRoutesViewModel(
  params: Params,
  onAction: (action: Action) => void,
  routeService: RouteService
): RoutesViewModel {
  return new RoutesViewModel(params, onAction, routeService);
}
