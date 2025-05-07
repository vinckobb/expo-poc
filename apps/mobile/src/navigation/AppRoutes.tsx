import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { Welcome, WelcomeViewModel } from "../screens/Welcome";
import {
  PasswordRecovery,
  PasswordRecoveryViewModel,
} from "../screens/Password Recovery";
import { Home, HomeViewModel } from "../screens/Home";

import { LoginFlowRouterDelegate } from "../login";
import { LoginParamList } from "../login/navigation/paramList";

import { createLoginFlowScreens } from "../login/navigation/LoginFlow";

import { FavoriteRoutes } from "../reactQueryPlayground/FavoriteRoutes";
import { createFavoriteRoutesViewModel } from "../reactQueryPlayground/FavoriteRoutesViewModel";
import { createQueryRouteService } from "../reactQueryPlayground/QueryRouteServiceDecorator";
import { Routes } from "../reactQueryPlayground/Routes";
import { RoutesViewModel } from "../reactQueryPlayground/RoutesViewModel";
import { RouteDetails } from "../reactQueryPlayground/RouteDetails";
import { RouteDetailsViewModel } from "../reactQueryPlayground/RouteDetailsViewModel";

export type RootStackParamList = {
  Welcome: undefined;
  LoginFlow: undefined;
  PasswordRecovery: { email: string };
  Home: undefined;
  Routes: undefined;
  FavoriteRoutes: undefined;
  RouteDetails: { routeId: string };
} & LoginParamList;

export type RootStackNavigator = ReturnType<
  typeof createNativeStackNavigator<RootStackParamList>
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

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

  const handleRouteSelected = (routeId: string) => {
    navigation.navigate("RouteDetails", { routeId });
  };

  const handleOpenRoutes = () => {
    navigation.navigate("Routes");
  };

  const handleOpenFavorites = ({ preferPop }: { preferPop?: boolean } = {}) => {
    if (preferPop) {
      navigation.navigate("FavoriteRoutes", undefined, { pop: true });
    } else {
      navigation.navigate("FavoriteRoutes");
    }
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
            navigation.navigate("Routes")
          );
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

      {/* React Query Playground Screens */}
      <Stack.Screen
        name="Routes"
        options={{ title: "Trasy" }}
        children={() => {
          const routeService = createQueryRouteService(queryClient);

          const viewModel = new RoutesViewModel(
            undefined,
            (action) => {
              if (action.type === "routeSelected") {
                handleRouteSelected(action.routeId);
              } else if (action.type === "openFavorites") {
                handleOpenFavorites();
              }
            },
            routeService
          );

          return <Routes viewModel={viewModel} />;
        }}
      />

      <Stack.Screen
        name="FavoriteRoutes"
        options={{ title: "Obľúbené trasy" }}
        children={() => {
          const routeService = createQueryRouteService(queryClient);

          const handleAction = (action: { type: string; routeId?: string }) => {
            if (action.type === "routeSelected" && action.routeId) {
              handleRouteSelected(action.routeId);
            }
          };

          const viewModel = createFavoriteRoutesViewModel(
            routeService,
            handleAction
          );

          return <FavoriteRoutes viewModel={viewModel} />;
        }}
      />

      <Stack.Screen
        name="RouteDetails"
        options={{ title: "Detail trasy" }}
        children={({ route }) => {
          const routeService = createQueryRouteService(queryClient);

          const viewModel = new RouteDetailsViewModel(
            { routeId: route.params.routeId },
            (action: { type: string }) => {
              if (action.type === "openFavorites") {
                handleOpenFavorites({ preferPop: true });
              }
            },
            routeService
          );

          return <RouteDetails viewModel={viewModel} />;
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
