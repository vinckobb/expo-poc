import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  PasswordRecovery,
  PasswordRecoveryViewModel,
} from "../screens/Password Recovery";

import * as Flows from "./AppFlows";

export type RootStackParamList = {
  PasswordRecovery: { email: string };
} & Flows.Login.ParamList &
  Flows.Welcome.ParamList &
  Flows.TransportRoutes.ParamList &
  Flows.Shell.ParamList &
  Flows.Profile.ParamList;

export type RootStackNavigator = ReturnType<
  typeof createNativeStackNavigator<RootStackParamList>
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const loginFlowDelegate: Flows.Login.Delegate = {
    openHome: () => {
      console.log("Navigate to home");
      navigation.reset({
        index: 0,
        routes: [{ name: Flows.Shell.ScreenNames.SHELL }],
      });
    },
    openRegistration: () => {
      console.log("Navigate to registration");
    },
    openPasswordRecovery: () => {
      console.log("Navigate to password recovery");
    },
  };

  // GUARD: Possible bad solution [@dmitry.kovalev]
  const shellFlowDelegate: Flows.Shell.Delegate = {
    openHomeTab: () => {
      console.log("Open Home Tab");
    },
    openRoutesTab: () => {
      console.log("Open Routes Tab");
    },
    openProfileTab: () => {
      console.log("Open Profile Tab");
    },
  };

  const profileFlowDelegate: Flows.Profile.Delegate = {
    openHome() {
      console.log("Go to the home");
    },
  };

  const welcomeFlowDelegate: Flows.Welcome.Delegate = {
    openHome: () => {
      console.log("Navigate to home");
      navigation.reset({
        index: 0,
        routes: [{ name: Flows.Shell.ScreenNames.SHELL }],
      });
      // navigation.navigate(Flows.Profile.ScreenNames.PROFILE);
    },
    openLogin: () => {
      console.log("Navigate to login");
      navigation.navigate(Flows.Login.ScreenNames.LOGIN);
    },
    openRoutes: () => {
      console.log("Navigate to routes");
      navigation.navigate(Flows.TransportRoutes.ScreenNames.ROUTES_LIST);
    },
  };

  return (
    <Stack.Navigator
      initialRouteName={Flows.Welcome.ScreenNames.WELCOME}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="PasswordRecovery"
        children={({ route }) => {
          const viewModel = new PasswordRecoveryViewModel(() =>
            navigation.navigate(Flows.Shell.ScreenNames.SHELL)
          );
          return (
            <PasswordRecovery
              viewModel={viewModel}
              email={route.params.email}
            />
          );
        }}
      />

      {Flows.Shell.createFlowScreens<RootStackParamList>(
        Stack,
        shellFlowDelegate
      )}

      {Flows.Login.createFlowScreens<RootStackParamList>(
        Stack,
        loginFlowDelegate
      )}

      {Flows.Welcome.createFlowScreens<RootStackParamList>(
        Stack,
        welcomeFlowDelegate
      )}

      {Flows.TransportRoutes.createFlowScreens<RootStackParamList>(
        Stack,
        welcomeFlowDelegate,
        { queryClient: queryClient }
      )}

      {Flows.Profile.createFlowScreens<RootStackParamList>(
        Stack,
        profileFlowDelegate
      )}
    </Stack.Navigator>
  );
}
