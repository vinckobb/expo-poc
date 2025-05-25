import * as FlowType from "./types/flowTypes";

export class RoutesFlowControllerImpl implements FlowType.Controller {
  static readonly displayName: string = "RoutesFlowControllerImpl";

  constructor(private router: FlowType.Router) {}

  handleRoutesListActionAction(action: FlowType.Actions.RoutesListAction) {
    switch (action.type) {
      case "openFavorites":
        this.router.openFavorites();
        break;
      case "routeSelected":
        this.router.openRouteDetails(action.routeId);
        break;
    }
  }

  handleRouteDetailsAction(action: FlowType.Actions.RouteDetailsAction) {
    switch (action.type) {
      case "openFavorites":
        this.router.openFavorites();
        break;
    }
  }

  handleFavoriteRoutesAction(action: FlowType.Actions.FavoriteRoutesAction) {
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
