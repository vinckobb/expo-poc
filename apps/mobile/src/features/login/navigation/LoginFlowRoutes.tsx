import { NavigationProp } from "@react-navigation/native";
import { useMemo } from "react";
import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { ScreenProvider } from "./types/ScreenProvider";

function createLoginScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  navigation: NavigationProp<T>,
  delegate: FlowType.Delegate
) {
  const screenName = FlowType.Screens.LOGIN;
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
          navigation={navigation}
          routerDelegate={delegate}
          screenName={screenName}
        >
          {(controller) => (
            <Screens.LoginScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

function createSMSVerificationScreen<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  navigation: NavigationProp<T>,
  delegate: FlowType.Delegate
) {
  const screenName = FlowType.Screens.SMS_VERIFICATION;
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
          navigation={navigation}
          routerDelegate={delegate}
          screenName={screenName}
        >
          {(controller) => (
            <Screens.SMSVerificationScreen
              controller={controller}
              params={screenParams}
            />
          )}
        </ScreenProvider>
      )}
    />
  );
}

export function createLoginFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  navigation: NavigationProp<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      {createLoginScreen(Stack, navigation, delegate)}
      {createSMSVerificationScreen(Stack, navigation, delegate)}
    </Stack.Group>
  );
}
