import { ScrollView, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Header, Section, Card, Text, Button } from "@monorepo/components";

export function ProfileScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <View className="dark:bg-secondary-500" style={{flex: 1}}>
      <Header title="Profile" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Section title="User Info">
          <Card>
            <Text variant="subtitle" className="mb-4">
              Name
            </Text>
            <Text variant="body">John Doe</Text>

            <Text variant="subtitle" className="mt-6 mb-4">
              Email
            </Text>
            <Text variant="body">john.doe@example.com</Text>
          </Card>
        </Section>

        <Section title="Settings">
          <Card className="mb-6">
            <Text variant="body" className="mb-4">
              App Theme
            </Text>
            <Button
              title="Switch Theme"
              variant="secondary"
              onPress={() => toggleColorScheme() }
            />
          </Card>

          <Card>
            <Text variant="body" className="mb-4">
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
