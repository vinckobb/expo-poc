import { useMemo } from "react";
import { createFlowScreen } from "@monorepo/mobile-core/navigation";
import { RoutesService } from "@monorepo/data-access/";
import * as FlowType from "../navigation/types/flowTypes";
import { ParamsAdapter } from "../navigation/types/flowAliases";
import { ScreenProvider } from "../navigation/generated/ScreenProvider";

import {
  RoutesListScreen as View,
  RoutesListViewModel as ViewModel,
  Action,
  Params,
} from "@monorepo/screens/transport-routes/routes-list";

const screenName = FlowType.Screens.ROUTES_LIST;

type Dependencies = {
  routesService: RoutesService;
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

export const ScreenComponent = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  FlowType.Controller
>(
  View,
  ({ params, deps }: ParamsType, onAction) =>
    new ViewModel(params, onAction, deps.routesService),
  (controller, action) => controller.handleRoutesListActionAction(action)
);

function createParams(
  routeParams: FlowType.ParamList[typeof screenName] | undefined,
  routesService: RoutesService
): ParamsType {
  const params = ParamsAdapter[screenName](routeParams);
  return useMemo(
    () => ({ params, deps: { routesService } }),
    [params, routesService]
  );
}

function createScreenProviderBuilder(
  delegate: FlowType.Delegate,
  routesService: RoutesService
) {
  return (routeParams: FlowType.ParamList[typeof screenName] | undefined) => {
    const screenParams = createParams(routeParams, routesService);

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
  routesService: RoutesService
) {
  const screenProviderBuilder = createScreenProviderBuilder(
    delegate,
    routesService
  );

  return (
    <Stack.Screen
      name={screenName}
      children={({ route, navigation }) => {
        try {
          return screenProviderBuilder(undefined);
        } catch (error) {
          // GUARD: Possible bad solution [@dmitry.kovalev]
          navigation.goBack();
          return null;
        }
      }}
    />
  );
}
