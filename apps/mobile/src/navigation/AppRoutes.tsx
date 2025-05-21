import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  PasswordRecovery,
  PasswordRecoveryViewModel,
} from "../screens/Password Recovery";
import { Home, HomeViewModel } from "../screens/Home";
import { HomeShellDemo } from "../shellPlayground/HomeShellDemo";

import * as Flows from "./AppFlows";

export type RootStackParamList = {
  PasswordRecovery: { email: string };
  Home: undefined;
  ShellDemo: undefined;
} & Flows.Login.ParamList &
  Flows.Welcome.ParamList &
  Flows.TransportRoutes.ParamList;

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
        routes: [{ name: "Home" }],
      });
    },
    openRegistration: () => {
      console.log("Navigate to registration");
    },
    openPasswordRecovery: () => {
      console.log("Navigate to password recovery");
    },
  };

  const welcomeFlowDelegate: Flows.Welcome.Delegate = {
    openHome: () => {
      console.log("Navigate to home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
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
      initialRouteName="Welcome"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="PasswordRecovery"
        children={({ route }) => {
          const viewModel = new PasswordRecoveryViewModel(() =>
            navigation.navigate("Home")
          );
          return (
            <PasswordRecovery
              viewModel={viewModel}
              email={route.params.email}
            />
          );
        }}
      />
      <Stack.Screen
        name="Home"
        children={() => {
          const viewModel = new HomeViewModel(() =>
            navigation.navigate("Welcome")
          );
          return <Home viewModel={viewModel} />;
        }}
      />

      <Stack.Screen
        name="ShellDemo"
        options={{
          title: "Shell Demo",
          headerShown: false,
        }}
        component={HomeShellDemo}
      />

      {Flows.Login.createFlowScreens<RootStackParamList>(
        Stack,
        navigation,
        loginFlowDelegate
      )}

      {Flows.Welcome.createFlowScreens<RootStackParamList>(
        Stack,
        navigation,
        welcomeFlowDelegate
      )}

      {Flows.TransportRoutes.createFlowScreens<RootStackParamList>(
        Stack,
        navigation,
        welcomeFlowDelegate,
        { queryClient: queryClient }
      )}
    </Stack.Navigator>
  );
}
