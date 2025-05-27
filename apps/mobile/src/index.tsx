import "../global.css";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@monorepo/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10000,
    },
  },
});

import AppRoutes from "./app-navigation/AppRoutes";

export default function App() {
  const colorScheme = useColorScheme();
  console.log("colorScheme", colorScheme);
  const navTheme =
    colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={navTheme}>
          <AppRoutes />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
