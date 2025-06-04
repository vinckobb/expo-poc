import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { DemoViewModel } from "./DemoViewModel";

export function DemoScreen({ viewModel }: { viewModel: DemoViewModel }) {
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
          {t('demo.title')}
        </Text>
        <Button title={t('demo.button.home.title')} onPress={() => viewModel.onHomeButton()} />
      </View>
    </SafeAreaView>
  );
}
