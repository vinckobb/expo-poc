import { NavigationProp } from "@react-navigation/native";
import { useMemo } from "react";
import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { ScreenProvider } from "./types/ScreenProvider";

function createWelcomeScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  const screenName = FlowType.Screens.WELCOME;
  const screenParams = useMemo(
    () => ({
      params: undefined,
    }),
    []
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
            <Screens.WelcomeScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

function createAboutScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  const screenName = FlowType.Screens.ABOUT;
  const screenParams = useMemo(
    () => ({
      params: undefined,
    }),
    []
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
            <Screens.AboutScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

export function createWelcomeFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      {createWelcomeScreen(Stack, delegate)}
      {createAboutScreen(Stack, delegate)}
    </Stack.Group>
  );
}
