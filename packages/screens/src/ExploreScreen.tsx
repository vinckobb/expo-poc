import { View } from "react-native";
import { Header } from "@monorepo/components";
import { Map } from "@monorepo/components/map";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ExploreStackParamList = {
  ExploreMain: undefined;
  ExploreDetail: undefined;
};

export function ExploreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Explore" />
      <Map onMarkerPress={() => navigation.navigate("ExploreDetail")} />
    </View>
  );
}
