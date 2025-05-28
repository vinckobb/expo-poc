import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { SMSVerificationViewModel } from "./SMSVerificationViewModel";

export function SMSVerificationScreen({
  viewModel,
}: {
  viewModel: SMSVerificationViewModel;
}) {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View>
        <Text>{t('sms-validation.title')}</Text>
        <Button title={t('sms-validation.button.continue.title')} onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
