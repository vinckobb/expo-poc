import { View, Text, Button, SafeAreaView, Switch } from "react-native";
import { useTranslation } from "react-i18next";
import { SettingsViewModel } from "./SettingsViewModel";

export function SettingsScreen({ viewModel }: { viewModel: SettingsViewModel }) {
  const { t, i18n } = useTranslation();
  
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
          {t("settings.title")}
        </Text>
        
        <View style={{ marginBottom: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 12 
          }}>
            <Text style={{ fontSize: 16 }}>{t("settings.label.show-tickets-in-my-region")}</Text>
            <Switch 
              value={viewModel.showLocalTicketsOnly}
              onValueChange={viewModel.setShowLocalTicketsOnly}
            />
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 12 
          }}>
            <Text style={{ fontSize: 16 }}>{t("settings.label.marketing-messages")}</Text>
            <Switch 
              value={viewModel.marketingMessages}
              onValueChange={viewModel.setMarketingMessages}
            />
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 12 
          }}>
            <Text style={{ fontSize: 16 }}>{t("settings.label.push-notifications")}</Text>
            <Switch 
              value={viewModel.pushNotifications}
              onValueChange={viewModel.setPushNotifications}
            />
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 12 
          }}>
            <Text style={{ fontSize: 16 }}>{t("settings.label.auto-ticket-download")}</Text>
            <Switch 
              value={viewModel.autoTicketDownload}
              onValueChange={viewModel.setAutoTicketDownload}
            />
          </View>
        </View>
        
        <View style={{ marginTop: 20 }}>
          <Button 
            title={t("settings.button.privacy-and-security.title")} 
            onPress={() => viewModel.onSecuritySettingsButton()} 
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button 
            title={t("settings.button.change-language.title")} 
            onPress={() => i18n.changeLanguage(i18n.language === "en" ? "sk" : "en")} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
