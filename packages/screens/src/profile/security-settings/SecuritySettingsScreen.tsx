import { View, Text, Button, SafeAreaView, Switch, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { SecuritySettingsViewModel } from "./SecuritySettingsViewModel";

export function SecuritySettingsScreen({ viewModel }: { viewModel: SecuritySettingsViewModel }) {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 24,
          }}
        >
          {t("security-settings.title")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            marginBottom: 0,
          }}
        >
          <Text style={{ fontSize: 16 }}>{t('security-settings.label.two-factor-authentication')}</Text>
          <Switch
            value={viewModel.twoFactorEnabled}
            onValueChange={viewModel.setTwoFactorEnabled}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 16 }}>{t('security-settings.label.biometric-authentication')}</Text>
          <Switch
            value={viewModel.biometricAuthEnabled}
            onValueChange={viewModel.setBiometricAuthEnabled}
          />
        </View>

        <View
          style={{
            backgroundColor: "#F5F5F5",
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 16,
            }}
          >
            {t('security-settings.label.change-password')}
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "white",
            }}
            placeholder={t('security-settings.placeholder.old-password')}
            secureTextEntry
            value={viewModel.oldPassword}
            onChangeText={viewModel.setOldPassword}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "white",
            }}
            placeholder={t('security-settings.placeholder.new-password')}
            secureTextEntry
            value={viewModel.newPassword}
            onChangeText={viewModel.setNewPassword}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 6,
              padding: 12,
              marginBottom: 16,
              backgroundColor: "white",
            }}
            placeholder={t('security-settings.placeholder.confirm-password')}
            secureTextEntry
            value={viewModel.confirmPassword}
            onChangeText={viewModel.setConfirmPassword}
          />

          <Button
            title={t("security-settings.button.save-password.title")}
            onPress={() => viewModel.onSavePassword()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            marginBottom: 24,
          }}
        >
          <Switch
            value={viewModel.deactivateAfterInactivity}
            onValueChange={viewModel.setDeactivateAfterInactivity}
            style={{ marginRight: 12 }}
          />
          <Text style={{ fontSize: 16, flex: 1 }}>
            {t('security-settings.label.deactivate-after-inactivity')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
