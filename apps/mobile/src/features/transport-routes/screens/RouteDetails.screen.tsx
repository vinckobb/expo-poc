import { useMemo } from "react";
import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import { RouteService } from "../../../service/RouteService";
import { createQueryRouteService } from "../../../service/QueryRouteServiceDecorator";
import * as FlowType from "../navigation/types/flowTypes";
import { ParamsAdapter } from "../navigation/types/flowAliases";
import { ScreenProvider } from "../navigation/types/flowAliases";

import {
  RouteDetailsScreen as View,
  RouteDetailsViewModel as ViewModel,
  Action,
  Params,
} from "../../../screens/transport-routes/RouteDetails";

const screenName = FlowType.Screens.ROUTE_DETAILS;

type Dependencies = {
  routeService: RouteService;
  analytics?: object;
  featureFlags?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Params;
  deps: Dependencies;
  config?: Config;
};

const ScreenComponent = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  FlowType.Controller
>(
  View,
  (params, onAction) =>
    new ViewModel(params.params, onAction, params.deps.routeService),
  (controller, action) => controller.handleRouteDetailsAction(action)
);

function createParams(
  routeParams: FlowType.ParamList[typeof screenName] | undefined,
  routeService: ReturnType<typeof createQueryRouteService>
): ParamsType {
  const params = ParamsAdapter[screenName](routeParams);
  return useMemo(
    () => ({ params, deps: { routeService } }),
    [params, routeService]
  );
}

function createScreenProviderBuilder(
  delegate: FlowType.Delegate,
  routeService: ReturnType<typeof createQueryRouteService>
) {
  return (routeParams: FlowType.ParamList[typeof screenName] | undefined) => {
    const screenParams = createParams(routeParams, routeService);

    return (
      <ScreenProvider routerDelegate={delegate} screenName={screenName}>
        {(controller) => (
          <ScreenComponent controller={controller} params={screenParams} />
        )}
      </ScreenProvider>
    );
  };
}

export function stackScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate,
  routeService: ReturnType<typeof createQueryRouteService>
) {
  const screenProviderBuilder = createScreenProviderBuilder(
    delegate,
    routeService
  );

  return (
    <Stack.Screen
      name={screenName}
      children={({ route, navigation }) => {
        try {
          return screenProviderBuilder(route.params);
        } catch (error) {
          // GUARD: Possible bad solution [@dmitry.kovalev]
          navigation.goBack();
          return null;
        }
      }}
    />
  );
}
