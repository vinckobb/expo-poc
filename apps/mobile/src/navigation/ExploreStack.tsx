import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Header} from "@monorepo/components";

import ExploreScreen from "../screens/ExploreScreen";
import ExploreDetailScreen from "../screens/ExploreDetailScreen";

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreMain"
        component={ExploreScreen}
        options={{
          header: () => <Header title="Explore" />,
        }}
      />
      <Stack.Screen
        name="ExploreDetail"
        component={ExploreDetailScreen}
        options={{
          title: "POI Detail",
        }}
      />
    </Stack.Navigator>
  );
}
