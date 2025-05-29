import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { RoutesService } from "@monorepo/data-access/";

export type RoutesDependencies = {
  routesService: RoutesService;
};

export function createRoutesFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  dependencies: RoutesDependencies
) {

  return (
    <Stack.Group>
      {Screens.RoutesList.stackScreen(Stack, delegate, dependencies.routesService)}
      {Screens.RouteDetails.stackScreen(Stack, delegate, dependencies.routesService)}
      {Screens.FavoriteRoutes.stackScreen(Stack, delegate, dependencies.routesService)}
    </Stack.Group>
  );
}
