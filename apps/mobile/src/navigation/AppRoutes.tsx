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

export type RootStackParamList = {
  Welcome: undefined;
  LoginFlow: undefined;
  SMSValidation: { phoneNumber: string };
  PasswordRecovery: { email: string };
  Home: undefined;
};

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
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        children={() => {
          const viewModel = new WelcomeViewModel(() =>
            navigation.navigate("LoginFlow")
          );
          // viewModel.onAction = () => navigation.navigate("Login");
          return <Welcome viewModel={viewModel} />;
        }}
      />
      <Stack.Screen
        name="LoginFlow"
        children={() => {
          return <LoginFlow delegate={loginFlowDelegate} />;
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
    </Stack.Navigator>
  );
}
