import { useEffect } from "react";
import { Platform, View } from "react-native";
import { Header, Map } from "@monorepo/components";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ExploreStackParamList = {
  ExploreMain: undefined;
  ExploreDetail: undefined;
};

export function ExploreScreen() {
  let navigation = {
    navigate: (screen: any) => {}
  };
  useEffect(() => {
    if (Platform.OS !== "web") {
      navigation = useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Explore" />
      <Map onMarkerPress={() => navigation.navigate("ExploreDetail")} />
    </View>
  );
}
