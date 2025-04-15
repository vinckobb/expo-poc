import { View } from "react-native";
import { Header, Map } from "@monorepo/components";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ExploreStackParamList = {
  ExploreMain: undefined;
  ExploreDetail: undefined;
};

export function ExploreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();

  return (
    <View className="dark:bg-secondary-500">
      <Header title="Explore" />
      <Map onMarkerPress={() => navigation.navigate("ExploreDetail")} />
    </View>
  );
}
