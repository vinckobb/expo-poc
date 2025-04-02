import { ScrollView, View } from "react-native";
import { Header, Section, Card, Text, Button } from "@monorepo/components";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Home" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 24,
        }}
      >
        <Section title="Welcome">
          <Card>
            <Text variant="body">
              This is a sample home screen. You can build whatever you want
              here.
            </Text>
          </Card>
        </Section>

        <Section title="Actions">
          <Card style={{ marginBottom: 12 }}>
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              Quick Action
            </Text>
            <Button title="Do something" onPress={() => alert("Action!")} />
          </Card>

          <Card>
            <Text variant="subtitle" style={{ marginBottom: 8 }}>
              Another Thing
            </Text>
            <Button
              title="Press me too"
              variant="secondary"
              onPress={() => alert("Secondary action")}
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
