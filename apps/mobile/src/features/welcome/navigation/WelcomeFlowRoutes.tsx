import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";
import { ScreenProvider } from "./types/ScreenProvider";

export function createWelcomeFlowScreens<T extends FlowType.ParamList>(
  Stack: ReturnType<typeof createNativeStackNavigator<T>>,
  navigation: NavigationProp<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="Welcome"
        children={() => (
          <ScreenProvider
            navigation={navigation}
            routerDelegate={delegate}
            screenName="Welcome"
          >
            {(controller) => (
              <Screens.WelcomeScreen
                controller={controller}
                params={{ params: undefined }}
              />
            )}
          </ScreenProvider>
        )}
      />
      <Stack.Screen
        name="About"
        children={() => (
          <ScreenProvider
            navigation={navigation}
            routerDelegate={delegate}
            screenName="About"
          >
            {(controller) => (
              <Screens.AboutScreen
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
