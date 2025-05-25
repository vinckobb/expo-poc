import type { FlowController } from "../../../../navigation/types/FlowController";
import * as Actions from "../types/screenActions";

export interface RoutesFlowController extends FlowController {
  handleRoutesListActionAction(action: Actions.RoutesListAction): void;
  handleRouteDetailsAction(action: Actions.RouteDetailsAction): void;
  handleFavoriteRoutesAction(action: Actions.FavoriteRoutesAction): void;
}
