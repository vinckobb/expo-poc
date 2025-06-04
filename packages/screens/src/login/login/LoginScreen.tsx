import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { LoginViewModel } from "./LoginViewModel";

export function LoginScreen({ viewModel }: { viewModel: LoginViewModel }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View>
        <Text>{t('login.title')}</Text>
        <Button title={t('login.button.login.title')} onPress={() => viewModel.onActionButton()} />
        <Button
          title={t('login.button.password-recovery.title')}
          onPress={() => viewModel.onPasswordRecovery()}
        />
        <Button
          title={t('login.button.registration.title')}
          onPress={() => viewModel.onRegistration()}
        />
      </View>
    </SafeAreaView>
  );
}
