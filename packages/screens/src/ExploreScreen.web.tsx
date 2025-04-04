import { View } from "react-native";
import { Header, Map, Text } from "@monorepo/components";

export function ExploreScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Explore" />
      <Map onMarkerPress={() => console.log("ExploreDetail")} />
      <Text>Tu je text iba pre web</Text>
    </View>
  );
}
