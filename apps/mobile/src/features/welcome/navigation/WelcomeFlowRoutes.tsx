import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Flow from "./Flow";
import * as Screens from "../screens";

export function createWelcomeFlowScreens<T extends Flow.ParamList>(
  Stack: ReturnType<typeof createNativeStackNavigator<T>>,
  navigation: NavigationProp<T>,
  delegate: Flow.Delegate
) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="Welcome"
        children={() => (
          <Flow.ScreenProvider
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
          </Flow.ScreenProvider>
        )}
      />
      <Stack.Screen
        name="About"
        children={() => (
          <Flow.ScreenProvider
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
          </Flow.ScreenProvider>
        )}
      />
    </Stack.Group>
  );
}
