import { View, Text, Button, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import { ProfileViewModel } from "./ProfileViewModel";

export function ProfileScreen({ viewModel }: { viewModel: ProfileViewModel }) {
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
          {t("profile.title")}
        </Text>
        
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#E0E0E0",
            alignSelf: "center",
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: "#999" }}>👤</Text>
        </View>
        
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Ján Novák
        </Text>

        <Button title={t("profile.button.settings.title")} onPress={() => viewModel.onSettingsButton()} />
      </View>
    </SafeAreaView>
  );
}
