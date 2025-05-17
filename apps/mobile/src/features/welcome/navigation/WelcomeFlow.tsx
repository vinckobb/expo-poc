import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeParamList } from "./types/paramList";
import { WelcomeFlowRouterDelegate } from "./types/WelcomeFlowRouterDelegate.interface";
import { WelcomeScreen, AboutScreen } from "../screens";
import { WelcomeFlowScreenProvider } from "./WelcomeFlowScreenProvider";

export function createWelcomeFlowScreens<T extends WelcomeParamList>(
  Stack: ReturnType<typeof createNativeStackNavigator<T>>,
  navigation: NavigationProp<T>,
  welcomeFlowRouterDelegate: WelcomeFlowRouterDelegate
) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="Welcome"
        children={() => (
          <WelcomeFlowScreenProvider
            navigation={navigation}
            routerDelegate={welcomeFlowRouterDelegate}
            screenName="Welcome"
          >
            {(controller) => (
              <WelcomeScreen controller={controller} params={undefined} />
            )}
          </WelcomeFlowScreenProvider>
        )}
      />
      <Stack.Screen
        name="About"
        children={() => (
          <WelcomeFlowScreenProvider
            navigation={navigation}
            routerDelegate={welcomeFlowRouterDelegate}
            screenName="About"
          >
            {(controller) => (
              <AboutScreen controller={controller} params={undefined} />
            )}
          </WelcomeFlowScreenProvider>
        )}
      />
    </Stack.Group>
  );
}
