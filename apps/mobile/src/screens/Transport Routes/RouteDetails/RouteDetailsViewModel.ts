import { createStore, createEvent, createEffect, sample } from "effector";
import { ViewModel } from "../../../navigation/types/ViewModel";
import { Route } from "../../../service/types";
import { RouteService } from "../../../service/RouteService";

export type Action = {
  type: "openFavorites";
};

export type Params = {
  routeId: string;
};

export class RouteDetailsViewModel implements ViewModel {
  events = {
    mounted: createEvent(),
    unmounted: createEvent(),
    loadRoute: createEvent(),
    toggleFavorite: createEvent(),
    openFavorites: createEvent(),
    retry: createEvent(),
  };

  private effects = {
    fetchRouteDetails: createEffect<string, Route, Error>(),
    fetchFavoriteStatus: createEffect<string, string | null, Error>(),
    addToFavorites: createEffect<string, { id: string }, Error>(),
    removeFromFavorites: createEffect<string, void, Error>(),
  };

  $route = createStore<Route | null>(null);
  $isLoading = createStore<boolean>(false);
  $error = createStore<string | null>(null);
  $isFavorite = createStore<boolean>(false);
  $favoriteId = createStore<string | null>(null);
  $isTogglingFavorite = createStore<boolean>(false);

  private routeId: string;
  private onAction: ((action: Action) => void) | undefined;
  private routeService: RouteService;

  constructor(
    params: Params,
    onAction: (action: Action) => void,
    routeService: RouteService
  ) {
    this.routeId = params.routeId;
    this.onAction = onAction;
    this.routeService = routeService;

    this.initializeEffects();
    this.initializeStores();
    this.initializeEvents();
  }

  private initializeEffects() {
    this.effects.fetchRouteDetails.use((routeId) =>
      this.routeService.getRouteDetails(routeId)
    );

    this.effects.fetchFavoriteStatus.use(async (routeId) => {
      try {
        const favorites = await this.routeService.getFavoriteRoutes();
        const favorite = favorites.find((f) => f.routeId === routeId);
        return favorite?.id || null;
      } catch (error) {
        console.error("Error checking favorite status:", error);
        return null;
      }
    });

    this.effects.addToFavorites.use((routeId) =>
      this.routeService.addToFavorites(routeId)
    );

    this.effects.removeFromFavorites.use((favoriteId) =>
      this.routeService.removeFromFavorites(favoriteId)
    );
  }

  private initializeStores() {
    this.$route
      .on(this.effects.fetchRouteDetails.doneData, (_, route) => route)
      .reset(this.events.unmounted);

    this.$isLoading
      .on(this.effects.fetchRouteDetails.pending, (_, isPending) => isPending)
      .reset(this.events.unmounted);

    this.$error
      .on(this.effects.fetchRouteDetails.failData, (_, error) => error.message)
      .reset([this.effects.fetchRouteDetails.done, this.events.unmounted]);

    this.$favoriteId
      .on(
        this.effects.fetchFavoriteStatus.doneData,
        (_, favoriteId) => favoriteId
      )
      .on(this.effects.addToFavorites.doneData, (_, result) => result.id)
      .on(this.effects.removeFromFavorites.done, () => null)
      .reset(this.events.unmounted);

    this.$isFavorite
      .on(
        this.effects.fetchFavoriteStatus.doneData,
        (_, favoriteId) => !!favoriteId
      )
      .on(this.effects.addToFavorites.done, () => true)
      .on(this.effects.removeFromFavorites.done, () => false)
      .reset(this.events.unmounted);

    this.$isTogglingFavorite
      .on(
        [
          this.effects.addToFavorites.pending,
          this.effects.removeFromFavorites.pending,
        ],
        (_, isPending) => isPending
      )
      .reset(this.events.unmounted);
  }

  private initializeEvents() {
    sample({
      clock: this.events.mounted,
      fn: () => this.routeId,
      target: this.effects.fetchRouteDetails,
    });

    sample({
      clock: this.events.loadRoute,
      fn: () => this.routeId,
      target: this.effects.fetchRouteDetails,
    });

    sample({
      clock: [this.events.mounted, this.effects.fetchRouteDetails.done],
      fn: () => this.routeId,
      target: this.effects.fetchFavoriteStatus,
    });

    sample({
      clock: this.events.retry,
      fn: () => this.routeId,
      target: this.effects.fetchRouteDetails,
    });

    sample({
      clock: this.events.retry,
      fn: () => this.routeId,
      target: this.effects.fetchFavoriteStatus,
    });

    sample({
      source: this.$favoriteId,
      clock: this.events.toggleFavorite,
      filter: (favoriteId): favoriteId is string => favoriteId !== null,
      target: this.effects.removeFromFavorites,
    });

    sample({
      source: this.$favoriteId,
      clock: this.events.toggleFavorite,
      filter: (favoriteId) => favoriteId === null,
      fn: () => this.routeId,
      target: this.effects.addToFavorites,
    });

    this.events.openFavorites.watch(() => {
      this.onAction?.({ type: "openFavorites" });
    });
  }

  dispose(): void {
    console.log("❌ RouteDetailsViewModel dispose");
    this.events.unmounted();
    this.onAction = undefined;
  }
}

export function createRouteDetailsViewModel(
  params: Params,
  onAction: (action: Action) => void,
  routeService: RouteService
): RouteDetailsViewModel {
  return new RouteDetailsViewModel(params, onAction, routeService);
}
