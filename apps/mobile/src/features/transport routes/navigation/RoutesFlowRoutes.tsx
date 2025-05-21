import { QueryClient } from "@tanstack/react-query";
import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { ScreenProvider } from "./types/ScreenProvider";
import { createQueryRouteService } from "../../../service/QueryRouteServiceDecorator";
import { ParamsAdapter } from "./RoutesFlowRouteParamsAdapter";
import { useMemo } from "react";

// GUARD: Possible bad solution [@dmitry.kovalev]
export type RoutesDependencies = {
  queryClient: QueryClient;
};

function createRoutesListScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  routeService: ReturnType<typeof createQueryRouteService>
) {
  const screenName = FlowType.Screens.ROUTES_LIST;
  const screenParams = useMemo(
    () => ({
      params: undefined,
      deps: { routeService },
    }),
    [routeService]
  );

  return (
    <Stack.Screen
      name={screenName}
      children={() => (
        <ScreenProvider
          routerDelegate={delegate}
          screenName={screenName}
        >
          {(controller) => (
            <Screens.RoutesListScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

function createRouteDetailsScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  routeService: ReturnType<typeof createQueryRouteService>
) {
  const screenName = FlowType.Screens.ROUTE_DETAILS;

  return (
    <Stack.Screen
      name={screenName}
      children={(routeProps) => {
        let params;
        try {
          params = ParamsAdapter[screenName](routeProps.route.params);
        } catch (e) {
          // GUARD: Possible bad solution [@dmitry.kovalev]
          routeProps.navigation.goBack();
          return null;
        }
        const screenParams = useMemo(
          () => ({
            params,
            deps: { routeService },
          }),
          [params, routeService]
        );

        return (
          <ScreenProvider
            routerDelegate={delegate}
            screenName={screenName}
          >
            {(controller) => (
              <Screens.RouteDetailScreen
                controller={controller}
                params={screenParams}
              />
            )}
          </ScreenProvider>
        );
      }}
    />
  );
}

function createFavoriteRoutesScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  routeService: ReturnType<typeof createQueryRouteService>
) {
  const screenName = FlowType.Screens.FAVORITE_ROUTES;
  const screenParams = useMemo(
    () => ({
      params: undefined,
      deps: { routeService },
    }),
    [routeService]
  );

  return (
    <Stack.Screen
      name={screenName}
      children={() => (
        <ScreenProvider
          routerDelegate={delegate}
          screenName={screenName}
        >
          {(controller) => (
            <Screens.FavoriteRoutesScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

export function createRoutesFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  dependencies: RoutesDependencies
) {
  // GUARD: Temp code [@dmitry.kovalev]
  const routeService = createQueryRouteService(dependencies.queryClient);

  return (
    <Stack.Group>
      {createRoutesListScreen(Stack, delegate, routeService)}
      {createRouteDetailsScreen(Stack, delegate, routeService)}
      {createFavoriteRoutesScreen(Stack, delegate, routeService)}
    </Stack.Group>
  );
}
