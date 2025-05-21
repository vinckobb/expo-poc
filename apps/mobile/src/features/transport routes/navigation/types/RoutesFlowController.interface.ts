import type { FlowController } from "../../../../navigation/types/FlowController";
import type { Action as RoutesListAction } from "../../../../screens/Transport Routes/RoutesList";
import type { Action as RouteDetailsAction } from "../../../../screens/Transport Routes/RouteDetails";
import type { Action as FavoriteRoutesAction } from "../../../../screens/Transport Routes/FavoriteRoutes";

export interface RoutesFlowController extends FlowController {
  handleRoutesListActionAction(action: RoutesListAction): void;
  handleRouteDetailsAction(action: RouteDetailsAction): void;
  handleFavoriteRoutesAction(action: FavoriteRoutesAction): void;
}
