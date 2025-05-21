import * as Flow from "./types/flowTypes";
import {
  RoutesListAction,
  RouteDetailsAction,
  FavoriteRoutesAction,
} from "../screens";

export class RoutesFlowControllerImpl implements Flow.Controller {
  static readonly displayName: string = "RoutesFlowControllerImpl";

  constructor(private router: Flow.Router) {}

  handleRoutesListActionAction(action: RoutesListAction) {
    switch (action.type) {
      case "openFavorites":
        this.router.openFavorites();
        break;
      case "routeSelected":
        this.router.openRouteDetails(action.routeId);
        break;
    }
  }

  handleRouteDetailsAction(action: RouteDetailsAction) {
    switch (action.type) {
      case "openFavorites":
        this.router.openFavorites();
        break;
    }
  }

  handleFavoriteRoutesAction(action: FavoriteRoutesAction) {
    switch (action.type) {
      case "routeSelected":
        this.router.openRouteDetails(action.routeId);
        break;
    }
  }

  // Lifecycle methods
  dispose() {
    console.log(`❌ ${RoutesFlowControllerImpl.displayName} flow disposed`);

  }
}
