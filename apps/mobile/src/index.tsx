import "../global.css";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@monorepo/hooks";
import { DIContainerImpl } from "@monorepo/di";

import AppRoutes from "./app-navigation/AppRoutes";

export default function App() {
  const colorScheme = useColorScheme();
  console.log("colorScheme", colorScheme);
  const navTheme =
    colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme;
  
  const di = new DIContainerImpl();

  return (
    <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <AppRoutes di={di}/>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
