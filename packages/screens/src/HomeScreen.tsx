import { ScrollView, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import { Header, Section, Card, Text, Button } from "@monorepo/components";

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <Header title={t("home.title")} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 24,
        }}
      >
        <Section title={t("home.welcome.title")}>
          <Card>
            <Text variant="body">
              {t("home.welcome.body")}
            </Text>
          </Card>
        </Section>

        <Section title={t("home.actions.title")}>
          <Card style={{ marginBottom: 12 }}>
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              <Trans i18nKey="home.actions.action.title">Quick Action</Trans>
            </Text>
            <Button title={t("home.actions.action.title")} onPress={() => alert("Action!")} />
          </Card>

          <Card>
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              <Trans i18nKey="home.actions.secondary.action.title">Another Thing</Trans>
            </Text>
            <Button
              title={t("home.actions.secondary.action.title")}
              variant="secondary"
              onPress={() => alert("Secondary action")}
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
