import type { FlowController } from "@monorepo/mobile-core/navigation";
import * as Actions from "../types/screenActions";

export interface RoutesFlowController extends FlowController {
  handleRoutesListActionAction(action: Actions.RoutesListAction): void;
  handleRouteDetailsAction(action: Actions.RouteDetailsAction): void;
  handleFavoriteRoutesAction(action: Actions.FavoriteRoutesAction): void;
}
