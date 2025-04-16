import { View } from "react-native";
import { Header, Text } from "@monorepo/components";
import { Map } from "@monorepo/components/map";

export function ExploreScreen() {
  return (
    <View className="dark:bg-secondary-500">
      <Header title="Explore" />
      <Map onMarkerPress={() => console.log("ExploreDetail")} />
      <Text>Tu je text iba pre web</Text>
    </View>
  );
}
