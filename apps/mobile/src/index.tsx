import '../global.css';
import '@monorepo/i18n';
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
  console.log('colorScheme', colorScheme);
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
