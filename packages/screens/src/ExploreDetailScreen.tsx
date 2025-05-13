import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Card, Header, Section, Text } from "@monorepo/components";

export function ExploreDetailScreen() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <Header title={t("explore.detail.title")} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Section title={t("explore.detail.placeinfo.title")}>
          <Card>
            <Text variant="title" style={{ marginBottom: 8 }}>
              Central Park
            </Text>
            <Text variant="body" style={{ marginBottom: 4 }}>
              📍 New York City, NY
            </Text>
            <Text variant="body">
              A large public park in the middle of Manhattan. Great for walking,
              relaxing, and taking in some fresh air.
            </Text>
          </Card>
        </Section>

        <Section title={t("explore.detail.actions.title")}>
          <Card>
            <Button
              title={t("explore.detail.actions.action.title")}
              onPress={() => alert("Opening map...")}
              variant="primary"
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
