import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GluestackDemoScreen, HomeScreen, ProfileScreen } from "@monorepo/screens";

import ExploreStack from "./ExploreStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "add";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Explore") iconName = "search";
          else if (route.name === "Profile") iconName = "person";
          else if (route.name === "Gluestack") iconName = "color-wand-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0a7ea4",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Gluestack" component={GluestackDemoScreen} />
    </Tab.Navigator>
  );
}
