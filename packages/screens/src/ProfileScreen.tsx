import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Header, Section, Card, Text, Button } from "@monorepo/components";

export function ProfileScreen() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "sk" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={t("profile.title")} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Section title={t("profile.userinfo.title")}>
          <Card>
            <Text variant="subtitle" style={{ marginBottom: 4 }}>
              {t("profile.userinfo.name")}
            </Text>
            <Text variant="body">John Doe</Text>

            <Text variant="subtitle" style={{ marginTop: 12, marginBottom: 4 }}>
              {t("profile.userinfo.email")}
            </Text>
            <Text variant="body">john.doe@example.com</Text>
          </Card>
        </Section>

        <Section title={t("profile.settings.title")}>
          <Card style={{ marginBottom: 12 }}>
            <Text variant="body" style={{ marginBottom: 8 }}>
              {t("profile.settings.theme.title")}
            </Text>
            <Button
              title={t("profile.settings.theme.action.title")}
              variant="secondary"
              onPress={() => alert("Toggle theme")}
            />
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <Text variant="body" style={{ marginBottom: 8 }}>
              {t("profile.settings.language.title")}
            </Text>
            <Button
              title={t("profile.settings.language.action.title")}
              variant="secondary"
              onPress={() => toggleLanguage()}
            />
          </Card>

          <Card>
            <Text variant="body" style={{ marginBottom: 8 }}>
              {t("profile.settings.dangerzone.title")}
            </Text>
            <Button
              title={t("profile.settings.dangerzone.action.title")}
              variant="primary"
              onPress={() => alert("Logging out")}
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
