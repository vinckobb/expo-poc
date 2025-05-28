import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { AboutViewModel } from "./AboutViewModel";

export function AboutScreen({ viewModel }: { viewModel: AboutViewModel }) {
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
          {t('about.title')}
        </Text>
        <Button title={t('about.button.home.title')} onPress={() => viewModel.onContactButton()} />
        <Button title={t('about.button.contact.title')} onPress={() => viewModel.onContactButton()} />
      </View>
    </SafeAreaView>
  );
}
