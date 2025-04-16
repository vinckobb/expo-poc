import '../global.css';
import {
  NavigationContainer
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, View } from '@monorepo/components';

import BottomTabs from "./navigation/BottomTabs";

export default function App() {  
  return (
    <GluestackUIProvider>
      <View style={{flex: 1}}>
        <SafeAreaProvider>
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
    </GluestackUIProvider>
  );
}
