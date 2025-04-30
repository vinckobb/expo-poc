import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Welcome, WelcomeViewModel } from "../screens/Welcome";
import { Login, LoginViewModel } from "../screens/Login";
import {
  PasswordRecovery,
  PasswordRecoveryViewModel,
} from "../screens/Password Recovery";
import { Home, HomeViewModel } from "../screens/Home";

import { LoginFlow, LoginFlowRouterDelegate } from "../login";
import { LoginParamList } from "../login/navigation/paramList";

import { createLoginFlowScreens } from "../login/navigation/LoginFlow";

export type RootStackParamList = {
  Welcome: undefined;
  LoginFlow: undefined;
  PasswordRecovery: { email: string };
  Home: undefined;
} & LoginParamList;

export type RootStackNavigator = ReturnType<
  typeof createNativeStackNavigator<RootStackParamList>
>;

type LoginStackNavigator = ReturnType<
  typeof createNativeStackNavigator<LoginParamList>
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loginFlowDelegate: LoginFlowRouterDelegate = {
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

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Welcome"
        children={() => {
          const viewModel = new WelcomeViewModel(() =>
            navigation.navigate("Login", {})
          );
          // viewModel.onAction = () => navigation.navigate("Login");
          return <Welcome viewModel={viewModel} />;
        }}
      />
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
            console.log("Final screen reached")
          );
          return <Home viewModel={viewModel} />;
        }}
      />
      {createLoginFlowScreens<RootStackParamList>(
        Stack,
        navigation,
        loginFlowDelegate
      )}
    </Stack.Navigator>
  );
}
