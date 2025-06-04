import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { WelcomeViewModel } from "./WelcomeViewModel";

export function WelcomeScreen({ viewModel }: { viewModel: WelcomeViewModel }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 24,
          }}
        >
          {t("welcome.title")}
        </Text>
        <Button title={t('welcome.link.about.title')} onPress={() => viewModel.onAboutButton()} />
        <Button title={t('welcome.link.login.title')} onPress={() => viewModel.onLoginButton()} />
        <Button title={t('welcome.link.routes.title')} onPress={() => viewModel.onRoutesButton()} />
        <Button title={t('welcome.link.home.title')} onPress={() => viewModel.onHomeButton()} />
      </View>
    </SafeAreaView>
  );
}
