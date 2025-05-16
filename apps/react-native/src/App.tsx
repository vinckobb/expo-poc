import '../global.css';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@monorepo/hooks";

import BottomTabs from "./navigation/BottomTabs";

export default function App() {
  const colorScheme = useColorScheme();
  const navTheme =
    colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
          <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
