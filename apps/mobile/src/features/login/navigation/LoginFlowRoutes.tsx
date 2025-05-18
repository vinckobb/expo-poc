import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Flow from "./types/flowTypes";
import * as Screens from "../screens";
import { ScreenProvider } from "./types/ScreenProvider";

export function createLoginFlowScreens<T extends Flow.ParamList>(
  Stack: ReturnType<typeof createNativeStackNavigator<T>>,
  navigation: NavigationProp<T>,
  delegate: Flow.Delegate
) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="Login"
        children={() => (
          <ScreenProvider
            navigation={navigation}
            routerDelegate={delegate}
            screenName="Login"
          >
            {(controller) => (
              <Screens.LoginScreen
                controller={controller}
                params={{ params: undefined }}
              />
            )}
          </ScreenProvider>
        )}
      />
      <Stack.Screen
        name="SMSVerification"
        children={() => (
          <ScreenProvider
            navigation={navigation}
            routerDelegate={delegate}
            screenName="SMSVerification"
          >
            {(controller) => (
              <Screens.SMSVerificationScreen
                controller={controller}
                params={{ params: undefined }}
              />
            )}
          </ScreenProvider>
        )}
      />
    </Stack.Group>
  );
}
