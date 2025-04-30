import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginParamList } from "./paramList";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";
import { SMSVerificationScreen, LoginScreen } from "../screens";
import { LoginFlowScreenProvider } from "./LoginFlowScreenProvider";

export function createLoginFlowScreens<T extends LoginParamList>(
  Stack: ReturnType<typeof createNativeStackNavigator<T>>,
  navigation: NavigationProp<T>,
  loginFlowRouterDelegate: LoginFlowRouterDelegate
) {
  return (
    <Stack.Group>
      <Stack.Screen
        name="Login"
        children={() => (
          <LoginFlowScreenProvider
            navigation={navigation}
            routerDelegate={loginFlowRouterDelegate}
            screenName="Login"
          >
            {(controller) => (
              <LoginScreen controller={controller} params={undefined} />
            )}
          </LoginFlowScreenProvider>
        )}
      />
      <Stack.Screen
        name="SMSVerification"
        children={() => (
          <LoginFlowScreenProvider
            navigation={navigation}
            routerDelegate={loginFlowRouterDelegate}
            screenName="SMSVerification"
          >
            {(controller) => (
              <SMSVerificationScreen
                controller={controller}
                params={undefined}
              />
            )}
          </LoginFlowScreenProvider>
        )}
      />
    </Stack.Group>
  );
}
