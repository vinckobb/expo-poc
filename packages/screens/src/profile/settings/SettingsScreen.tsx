import { View, Text, Button, SafeAreaView, Switch } from "react-native";
import { SettingsViewModel } from "./SettingsViewModel";

export function SettingsScreen({ viewModel }: { viewModel: SettingsViewModel }) {
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
          Nastavenia
        </Text>
        
        <View style={{ marginBottom: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 12 
          }}>
            <Text style={{ fontSize: 16 }}>Zobraziť len lístky v mojom regióne</Text>
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
            <Text style={{ fontSize: 16 }}>Marketingové správy</Text>
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
            <Text style={{ fontSize: 16 }}>Push notifikácie</Text>
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
            <Text style={{ fontSize: 16 }}>Automatické získavanie lístkov</Text>
            <Switch 
              value={viewModel.autoTicketDownload}
              onValueChange={viewModel.setAutoTicketDownload}
            />
          </View>
        </View>
        
        <View style={{ marginTop: 20 }}>
          <Button 
            title="Súkromie a bezpečnosť" 
            onPress={() => viewModel.onSecuritySettingsButton()} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
