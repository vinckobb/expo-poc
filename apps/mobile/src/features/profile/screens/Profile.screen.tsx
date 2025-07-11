import { useMemo } from "react";
import { createFlowScreen } from "@monorepo/mobile-core/navigation";
import * as FlowType from "../navigation/types/flowTypes";
import { ParamsAdapter } from "../navigation/types/flowAliases";
import { ScreenProvider } from "../navigation/generated/ScreenProvider";

import {
  ProfileScreen as View,
  ProfileViewModel as ViewModel,
  Action,
  Params,
} from "@monorepo/screens/profile/profile";

const screenName = FlowType.Screens.PROFILE;

type Dependencies = {
  someDependency?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Params;
  dependencies?: Dependencies;
  config?: Config;
};

export const ScreenComponent = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  FlowType.Controller
>(
  View,
  (params, onAction) => new ViewModel(onAction),
  (controller, action) => controller.handleProfileAction(action)
);

function createParams(
  routeParams: FlowType.ParamList[typeof screenName] | undefined
): ParamsType {
  const params = ParamsAdapter[screenName](routeParams);
  return useMemo(() => ({ params }), [params]);
}

function createScreenProviderBuilder(delegate: FlowType.Delegate) {
  return (routeParams: FlowType.ParamList[typeof screenName] | undefined) => {
    const screenParams = createParams(routeParams);

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
  delegate: FlowType.Delegate
) {
  const screenProviderBuilder = createScreenProviderBuilder(delegate);

  return (
    <Stack.Screen
      name={screenName}
      children={({ route, navigation }) => {
        try {
          return screenProviderBuilder(undefined);
        } catch (error) {
          // GUARD: Possible bad solution [code.generator]
          navigation.goBack();
          return null;
        }
      }}
    />
  );
}
