import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import { WelcomeViewModel } from "../screens/WelcomeViewModel";
import { Login, LoginViewModel } from "../screens/Login";
import {
  SMSVerification,
  SMSVerificationViewModel,
} from "../screens/SMSVerification";
import PasswordRecovery from "../screens/PasswordRecovery";
import { PasswordRecoveryViewModel } from "../screens/PasswordRecoveryViewModel";
import Home from "../screens/Home";
import { HomeViewModel } from "../screens/HomeViewModel";
// import SMSVerificationViewModel } from "../screens/SMSVerification/SMSVerificationViewModel";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SMSValidation: { phoneNumber: string };
  PasswordRecovery: { email: string };
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        children={() => {
          const viewModel = new WelcomeViewModel();
          viewModel.onAction = () => navigation.navigate("Login");
          return <Welcome viewModel={viewModel} />;
        }}
      />
      <Stack.Screen
        name="Login"
        children={() => {
          const viewModel = new LoginViewModel();
          viewModel.onAction = () =>
            navigation.navigate("SMSValidation", { phoneNumber: "123456789" });
          return <Login viewModel={viewModel} />;
        }}
      />
      <Stack.Screen
        name="SMSValidation"
        children={({ route }) => {
          const viewModel = new SMSVerificationViewModel("12345678");
          viewModel.onAction = () =>
            navigation.navigate("PasswordRecovery", {
              email: "example@example.com",
            });
          return <SMSVerification viewModel={viewModel} />;
        }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        children={({ route }) => {
          const viewModel = new PasswordRecoveryViewModel();
          viewModel.onAction = () => navigation.navigate("Home");
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
          const viewModel = new HomeViewModel();
          viewModel.onAction = () => console.log("Final screen reached");
          return <Home viewModel={viewModel} />;
        }}
      />
    </Stack.Navigator>
  );
}
