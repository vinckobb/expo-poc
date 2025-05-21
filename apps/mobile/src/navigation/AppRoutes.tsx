import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  PasswordRecovery,
  PasswordRecoveryViewModel,
} from "../screens/Password Recovery";
import { Home, HomeViewModel } from "../screens/Home";

import { FavoriteRoutesScreen } from "../screens/Transport Routes/FavoriteRoutes/FavoriteRoutesScreen";
import { createFavoriteRoutesViewModel } from "../screens/Transport Routes/FavoriteRoutes/FavoriteRoutesViewModel";
import { createQueryRouteService } from "../service/QueryRouteServiceDecorator";
import { RoutesListScreen } from "../screens/Transport Routes/RoutesList/RoutesListScreen";
import { RoutesListViewModel } from "../screens/Transport Routes/RoutesList/RoutesListViewModel";
import { RouteDetailsScreen } from "../screens/Transport Routes/RouteDetails/RouteDetailsScreen";
import { RouteDetailsViewModel } from "../screens/Transport Routes/RouteDetails/RouteDetailsViewModel";
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
        routes: [{ name: "RoutesList" }],
      });
    },
    openLogin: () => {
      console.log("Navigate to login");
      navigation.navigate("Login");
    },
  };

  const handleRouteSelected = (routeId: string) => {
    navigation.navigate("RouteDetails", { routeId });
  };

  const handleOpenRoutes = () => {
    navigation.navigate("RoutesList");
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

      {/* React Query Playground Screens */}
      {/* <Stack.Screen
        name="Routes"
        options={{ title: "Trasy" }}
        children={() => {
          const routeService = createQueryRouteService(queryClient);

          const viewModel = new RoutesListViewModel(
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

          return <RoutesListScreen viewModel={viewModel} />;
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

          return <FavoriteRoutesScreen viewModel={viewModel} />;
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

          return <RouteDetailsScreen viewModel={viewModel} />;
        }}
      /> */}

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
