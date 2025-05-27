import { QueryClient } from "@tanstack/react-query";
import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { createQueryRouteService } from "@monorepo/data-access";

// GUARD: Possible bad solution [@dmitry.kovalev]
export type RoutesDependencies = {
  queryClient: QueryClient;
};

export function createRoutesFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  dependencies: RoutesDependencies
) {
  // GUARD: Temp code [@dmitry.kovalev]
  const routeService = createQueryRouteService(dependencies.queryClient);

  return (
    <Stack.Group>
      {Screens.RoutesList.stackScreen(Stack, delegate, routeService)}
      {Screens.RouteDetails.stackScreen(Stack, delegate, routeService)}
      {Screens.FavoriteRoutes.stackScreen(Stack, delegate, routeService)}
    </Stack.Group>
  );
}
