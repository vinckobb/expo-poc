import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";

export function Map({ onMarkerPress }: { onMarkerPress: () => void }) {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🧭 {t("notsupported.web")}</Text>
      <Button title={t("explore.actions.action.title")} onPress={onMarkerPress}></Button>
    </View>
  );
}
