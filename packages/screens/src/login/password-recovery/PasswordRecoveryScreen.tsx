import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { PasswordRecoveryViewModel } from "./PasswordRecoveryViewModel";

type PasswordRecoveryProps = {
  viewModel: PasswordRecoveryViewModel;
  email: string;
};

export default function PasswordRecoveryScreen({
  viewModel,
  email,
}: PasswordRecoveryProps) {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View>
        <Text>{t('password-recovery.title')}</Text>
        <Text>{email}</Text>
        <Button title={t('password-recovery.button.continue.title')} onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
