import { NavigationProp } from "@react-navigation/native";

import * as FlowType from "./types/flowTypes";

export class RoutesFlowRouterImpl<T extends FlowType.ParamList>
  implements FlowType.Router
{
  static readonly displayName: string = "RoutesFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: FlowType.Delegate
  ) {}

  openRoutes() {
    console.log("Navigating to Routes List");
    this.nav.navigate(FlowType.Screens.ROUTES_LIST, undefined);
  }

  openFavorites() {
    console.log("Navigating to Favorite Routes");
    this.nav.navigate(FlowType.Screens.FAVORITE_ROUTES, undefined);
  }
  
  openRouteDetails(routeId: string) {
    console.log("Navigating to Route Details");
    const params: FlowType.ParamList[typeof FlowType.Screens.ROUTE_DETAILS] = {
      routeId: routeId,
    };
    this.nav.navigate(FlowType.Screens.ROUTE_DETAILS, params);
  }
}
