import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { HomeViewModel } from "./HomeViewModel";

type HomeProps = {
  viewModel: HomeViewModel;
};

export default function Home({ viewModel }: HomeProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View>
        <Text>{t("home.title")}</Text>
        <Button title={t("home.button.continue.title")} onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
