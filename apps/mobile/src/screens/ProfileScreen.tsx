import { ScrollView, View } from "react-native";
import { Header, Section, Card, Text, Button } from "@monorepo/components";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Profile" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Section title="User Info">
          <Card>
            <Text variant="subtitle" style={{ marginBottom: 4 }}>
              Name
            </Text>
            <Text variant="body">John Doe</Text>

            <Text variant="subtitle" style={{ marginTop: 12, marginBottom: 4 }}>
              Email
            </Text>
            <Text variant="body">john.doe@example.com</Text>
          </Card>
        </Section>

        <Section title="Settings">
          <Card style={{ marginBottom: 12 }}>
            <Text variant="body" style={{ marginBottom: 8 }}>
              App Theme
            </Text>
            <Button
              title="Switch Theme"
              variant="secondary"
              onPress={() => alert("Toggle theme")}
            />
          </Card>

          <Card>
            <Text variant="body" style={{ marginBottom: 8 }}>
              Danger zone
            </Text>
            <Button
              title="Logout"
              variant="primary"
              onPress={() => alert("Logging out")}
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
