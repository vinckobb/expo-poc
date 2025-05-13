import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Header, Text } from "@monorepo/components";
import { Map } from "@monorepo/components/map";

export function ExploreScreen() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <Header title={t("explore.title")} />
      <Map onMarkerPress={() => console.log("ExploreDetail")} />
      <Text>{t("explore.web")}</Text>
    </View>
  );
}
